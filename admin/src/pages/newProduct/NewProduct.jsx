import { useState } from 'react';
import './newProduct.css';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { addProduct } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { FaSpinner } from 'react-icons/fa';

export default function NewProduct() {
	const [inputs, setInputs] = useState({
		type: 'simple',
		title: '',
		desc: '',
		title_ar: '',
		desc_ar: '',
		categories: [{ name: '', name_ar: '' }],
		width: '',
		height: '',
		length: '',
		weight: '',
		discount: {
			startDate: '',
			endDate: '',
			discount: '',
		},
		promo: {
			code: '',
			startDate: '',
			endDate: '',
		},
		enablePromo: false,
		enableDiscount: false,
	});
	const handleTogglePromo = () => {
		setInputs((prev) => ({
			...prev,
			enablePromo: !prev.enablePromo,
		}));
	};

	const handleToggleDiscount = () => {
		setInputs((prev) => ({
			...prev,
			enableDiscount: !prev.enableDiscount,
		}));
	};
	const [loading, setLoading] = useState(false);
	const [draggedFile, setDraggedFile] = useState(null);
	const [variants, setVariants] = useState([{ key: '', values: [] }]);
	const [generatedVariants, setGeneratedVariants] = useState([]);
	const [expandedVariants, setExpandedVariants] = useState([]);
	const dispatch = useDispatch();
	const supplierInfo = useSelector((state) => state.user.currentUser);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name.startsWith('categories.')) {
			const [field, index, key] = name.split('.');
			setInputs((prev) => ({
				...prev,
				[field]: prev[field].map((category, i) =>
					i === parseInt(index) ? { ...category, [key]: value } : category,
				),
			}));
		} else if (name.startsWith('discount.') || name.startsWith('promo.')) {
			const [field, key] = name.split('.');
			setInputs((prev) => ({
				...prev,
				[field]: {
					...prev[field],
					[key]: value,
				},
			}));
		} else {
			setInputs((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDraggedFile(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const file = e.dataTransfer.files[0];
			setInputs((prev) => ({
				...prev,
				file,
			}));
			e.dataTransfer.clearData();
		}
	};

	const isObjectComplete = (obj) => Object.values(obj).every((value) => value);
	const isObjectPartiallyFilled = (obj) =>
		Object.values(obj).some((value) => value);

	const showError = (title, text) => {
		swal({ title, text, icon: 'error' });
	};

	const handleAddProduct = async (e) => {
		e.preventDefault();
		const requiredInputs = [
			'title',
			'desc',
			'title_ar',
			'desc_ar',
			'categories',
			'width',
			'height',
			'length',
			'weight',
		];

		const promoComplete = isObjectComplete(inputs.promo);
		const promoPartiallyFilled = isObjectPartiallyFilled(inputs.promo);
		if (promoPartiallyFilled && !promoComplete) {
			showError(
				'Incomplete Promo Details',
				'Please complete all fields for the promo code or remove the partial information.',
			);
			return;
		}
		const discountComplete = isObjectComplete(inputs.discount);
		const discountPartiallyFilled = isObjectPartiallyFilled(inputs.discount);
		if (discountPartiallyFilled && !discountComplete) {
			showError(
				'Incomplete Discount Details',
				'Please complete all fields for the discount or remove the partial information.',
			);
			return;
		}
		setLoading(true);
		const minimumLoadingPromise = new Promise((resolve) =>
			setTimeout(resolve, 1000),
		);
		try {
			const storage = getStorage(app);
			const uploadPromises =
				inputs.type === 'variable'
					? variants.flatMap((variant, index) => {
							const variantImages = generatedVariants[index].images;
							return variantImages.map((image) => {
								const fileName = `${new Date().getTime()}_${
									variant.key
								}_${variant.value}_${image.name}`;
								const storageRef = ref(storage, fileName);
								return uploadBytesResumable(storageRef, image);
							});
					  })
					: [];
			const [uploadedVariants] = await Promise.all([
				Promise.all(uploadPromises),
				minimumLoadingPromise,
			]);

			const variantsData = await Promise.all(
				uploadedVariants.map((uploadTask, index) => {
					const variantKey = uploadTask.metadata.name.split('_')[1];
					const variantValue = uploadTask.metadata.name.split('_')[2];
					return getDownloadURL(uploadTask.ref).then((url) => ({
						key: variantKey,
						value: variantValue,
						image: url,
					}));
				}),
			);

			const updatedGeneratedVariants = generatedVariants.map(
				(variant, index) => {
					const variantImages = variantsData
						.filter(
							(data) =>
								data.key === variant.key &&
								data.value === variant.value,
						)
						.map((data) => data.image);

					return {
						...variant,
						images: variantImages,
					};
				},
			);

			const product = constructProduct(
				inputs,
				updatedGeneratedVariants,
				supplierInfo,
			);
			swal({
				title: 'Success',
				text: 'Product added successfully',
				icon: 'success',
				closeOnClickOutside: false,
				closeOnEsc: false,
			}).then(setLoading(false), resetAllForms);
			await addProduct(product, dispatch);
		} catch (error) {
			showError('Error', error.message);
		} finally {
			setLoading(false);
		}
	};

	const constructProduct = (inputs, variants, supplierInfo) => {
		let productData = {
			type: inputs.type,
			...inputs,
			categories: inputs.categories.map(({ name, name_ar }) => ({
				name,
				name_ar,
			})),
			...(inputs.type === 'variable' && {
				variants: variants.map((variant) => ({
					key: variant.key,
					value: variant.value,
					images: variant.images || [],
					price: variant.price,
					originalPrice: variant.originalPrice,
				})),
			}),
			...(isObjectComplete(inputs.discount) && {
				discount: inputs.discount,
			}),
			...(isObjectComplete(inputs.promo) && { promo: inputs.promo }),
			supplierId: supplierInfo._id,
		};
		return productData;
	};

	const resetAllForms = () => {
		resetInputs();
		resetVariants();
		resetCategories();
	};

	const resetInputs = () => {
		setInputs({
			type: 'simple',
			title: '',
			desc: '',
			title_ar: '',
			desc_ar: '',
			categories: [],
			width: '',
			height: '',
			length: '',
			weight: '',
			discount: { startDate: '', endDate: '', discount: '' },
			promo: { code: '', startDate: '', endDate: '' },
			file: null,
		});
	};

	const resetVariants = () => {
		setVariants([{ key: '', value: '' }]);
	};

	const resetCategories = () => {
		setInputs((prev) => ({
			...prev,
			categories: [{ name: '', name_ar: '' }],
		}));
	};

	const handleVariantChange = (index, field, value) => {
		const newVariants = [...variants];
		if (field === 'key') {
			newVariants[index][field] = value;
		} else if (field === 'values') {
			newVariants[index][field] = value.split('|');
		}
		setVariants(newVariants);
	};

	const addVariant = () => {
		setVariants([...variants, { key: '', values: [] }]);
	};

	const removeVariant = (index) => {
		const newVariants = [...variants];
		newVariants.splice(index, 1);
		setVariants(newVariants);
	};

	const generateVariants = () => {
		const keys = variants.map((variant) => variant.key);
		const values = variants.map((variant) => variant.values);
		const combinations = cartesianProduct(...values);
		const newGeneratedVariants = combinations.map((combination) => {
			const variantObj = {
				quantity: 0,
				images: [],
				price: '',
				originalPrice: '',
			};
			keys.forEach((key, index) => {
				variantObj[key] = combination[index];
			});
			return variantObj;
		});
		setGeneratedVariants(newGeneratedVariants);
	};

	const removeGeneratedVariant = (index) => {
		const newGeneratedVariants = [...generatedVariants];
		newGeneratedVariants.splice(index, 1);
		setGeneratedVariants(newGeneratedVariants);
	};

	const toggleVariant = (index) => {
		setExpandedVariants((prevExpandedVariants) => {
			const newExpandedVariants = [...prevExpandedVariants];
			newExpandedVariants[index] = !newExpandedVariants[index];
			return newExpandedVariants;
		});
	};

	const cartesianProduct = (...arrays) => {
		return arrays.reduce(
			(a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())),
			[[]],
		);
	};

	const addCategory = () => {
		setInputs((prev) => ({
			...prev,
			categories: [...prev.categories, { name: '', name_ar: '' }],
		}));
	};

	const removeCategory = (index) => {
		setInputs((prev) => ({
			...prev,
			categories: prev.categories.filter((_, i) => i !== index),
		}));
	};

	return (
		<div
			className='newProduct'
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}>
			{loading ? (
				<div className='progress-icon'>
					<FaSpinner className='spinner' />
				</div>
			) : (
				<div className='newProduct'>
					<h1 className='addProductTitle'>New Product</h1>
					<div className='product-form'>
						<div className='form-column'>
							<div className='form-section'>
								<h2>Basic Information</h2>
								<div className='form-group'>
									<label>Product Type*</label>
									<div className='radio-group'>
										<label>
											<input
												className='radio-input-type'
												type='radio'
												name='type'
												value='simple'
												checked={inputs.type === 'simple'}
												onChange={handleChange}
											/>
											Simple
										</label>
										<label>
											<input
												className='radio-input-type'
												type='radio'
												name='type'
												value='variable'
												checked={inputs.type === 'variable'}
												onChange={handleChange}
											/>
											Variable
										</label>
									</div>
								</div>
								<div className='form-group'>
									<label>Title*</label>
									<input
										name='title'
										type='text'
										placeholder='Apple Airpods'
										onChange={handleChange}
									/>
								</div>
								<div className='form-group'>
									<label>Description*</label>
									<textarea
										name='desc'
										placeholder='Product description...'
										onChange={handleChange}
									/>
								</div>
								<div className='form-group'>
									<label>Title (Arabic)</label>
									<input
										name='title_ar'
										type='text'
										placeholder='Title in Arabic'
										onChange={handleChange}
									/>
								</div>
								<div className='form-group'>
									<label>Description (Arabic)</label>
									<textarea
										name='desc_ar'
										placeholder='Product description in Arabic...'
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className='form-section'>
								<h2>Categories</h2>
								{inputs.categories.map((category, index) => (
									<div
										key={index}
										className='category-item'>
										<div className='form-group'>
											<label>Category Name</label>
											<input
												type='text'
												name={`categories.${index}.name`}
												placeholder='Category Name'
												value={category.name}
												onChange={handleChange}
											/>
										</div>
										<div className='form-group'>
											<label>Category Name (Arabic)</label>
											<input
												type='text'
												name={`categories.${index}.name_ar`}
												placeholder='Category Name (Arabic)'
												value={category.name_ar}
												onChange={handleChange}
											/>
										</div>
										<button
											type='button'
											onClick={() => removeCategory(index)}>
											Remove
										</button>
									</div>
								))}
								<button
									type='button'
									onClick={addCategory}>
									Add Category
								</button>
							</div>
						</div>
						<div className='form-column'>
							<div className='form-section'>
								<h2>Product Dimensions</h2>
								<div className='form-group'>
									<label>Width*</label>
									<input
										name='width'
										type='number'
										placeholder='200'
										onChange={handleChange}
									/>
								</div>
								<div className='form-group'>
									<label>Height*</label>
									<input
										name='height'
										type='number'
										placeholder='200'
										onChange={handleChange}
									/>
								</div>
								<div className='form-group'>
									<label>Length*</label>
									<input
										name='length'
										type='number'
										placeholder='200'
										onChange={handleChange}
									/>
								</div>
								<div className='form-group'>
									<label>Weight*</label>
									<input
										name='weight'
										type='number'
										placeholder='200'
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className='form-section'>
								<h2>Discount</h2>
								<div className='form-group'>
									<label>Enable Discount</label>
									<input
										type='checkbox'
										className='radio-input-type'
										checked={inputs.enableDiscount}
										onChange={handleToggleDiscount}
									/>
								</div>
								{inputs.enableDiscount && (
									<>
										<div className='form-group'>
											<label>Discount Start Date</label>
											<input
												name='discount.startDate'
												type='date'
												onChange={handleChange}
											/>
										</div>
										<div className='form-group'>
											<label>Discount End Date</label>
											<input
												name='discount.endDate'
												type='date'
												onChange={handleChange}
											/>
										</div>
										<div className='form-group'>
											<label>Discount Amount</label>
											<input
												name='discount.discount'
												type='number'
												onChange={handleChange}
											/>
										</div>
									</>
								)}
							</div>
							<div className='form-section'>
								<h2>Promo Code</h2>
								<div className='form-group'>
									<label>Enable Promo Code</label>
									<input
										className='radio-input-type'
										type='checkbox'
										checked={inputs.enablePromo}
										onChange={handleTogglePromo}
									/>
								</div>
								{inputs.enablePromo && (
									<>
										<div className='form-group'>
											<label>Promo Code</label>
											<input
												name='promo.code'
												type='text'
												onChange={handleChange}
											/>
										</div>
										<div className='form-group'>
											<label>Promo Start Date</label>
											<input
												name='promo.startDate'
												type='date'
												onChange={handleChange}
											/>
										</div>
										<div className='form-group'>
											<label>Promo End Date</label>
											<input
												name='promo.endDate'
												type='date'
												onChange={handleChange}
											/>
										</div>
									</>
								)}
							</div>
						</div>
						<div className='form-column'>
							<div className='form-section'>
								<h2>Product Images</h2>
								<div className='form-group'>
									<label>Images</label>
									<input
										type='file'
										onChange={(e) =>
											setInputs((prev) => ({
												...prev,
												file: e.target.files[0],
											}))
										}
										multiple
									/>
									<div
										className='file-dragndrop'
										onDragEnter={() => setDraggedFile(true)}
										onDragLeave={() => setDraggedFile(false)}
										onDragOver={(e) => e.preventDefault()}
										onDrop={handleDrop}>
										{draggedFile ? (
											<p>Drop your files here</p>
										) : (
											<>
												<p>Drag and drop your files here or</p>
												<label className='browse-button'>
													Browse
												</label>
											</>
										)}
									</div>
								</div>
							</div>
							{inputs.type === 'variable' && (
								<div className='form-section'>
									<h2>Variants</h2>
									{variants.map((variant, index) => (
										<div
											key={index}
											className='variant-item'>
											<div className='form-group'>
												<label>Key</label>
												<input
													type='text'
													placeholder='Key'
													value={variant.key}
													onChange={(e) =>
														handleVariantChange(
															index,
															'key',
															e.target.value,
														)
													}
												/>
											</div>
											<div className='form-group'>
												<label>Values</label>
												<input
													type='text'
													placeholder="Values (separated by '|')"
													value={variant.values.join('|')}
													onChange={(e) =>
														handleVariantChange(
															index,
															'values',
															e.target.value,
														)
													}
												/>
											</div>
											<button
												type='button'
												onClick={() => removeVariant(index)}>
												Remove
											</button>
										</div>
									))}
									<button
										type='button'
										onClick={addVariant}>
										Add Variant
									</button>
									<button
										type='button'
										onClick={generateVariants}>
										Generate Variants
									</button>
									<div className='generated-variants'>
										<h3>Generated Variants</h3>
										{generatedVariants.map((variant, index) => (
											<div
												key={index}
												className='generated-variant-item'>
												<div onClick={() => toggleVariant(index)}>
													{Object.entries(variant).map(
														([key, value]) => (
															<div key={key}>
																<span>
																	{key}:{' '}
																	{key === 'images'
																		? value
																				.map(
																					(file) =>
																						file.name,
																				)
																				.join(', ')
																		: value}
																</span>
															</div>
														),
													)}
												</div>
												{expandedVariants[index] && (
													<div>
														<div className='form-group'>
															<label>Quantity</label>
															<input
																type='number'
																placeholder='Quantity'
																value={variant.quantity}
																onChange={(e) => {
																	const newGeneratedVariants =
																		[...generatedVariants];
																	newGeneratedVariants[
																		index
																	].quantity = e.target.value;
																	setGeneratedVariants(
																		newGeneratedVariants,
																	);
																}}
															/>
														</div>
														<div className='form-group'>
															<label>Images</label>
															<input
																type='file'
																multiple
																onChange={(e) => {
																	const newGeneratedVariants =
																		[...generatedVariants];
																	newGeneratedVariants[
																		index
																	].images = Array.from(
																		e.target.files,
																	);
																	setGeneratedVariants(
																		newGeneratedVariants,
																	);
																}}
															/>
														</div>
														<div className='form-group'>
															<label>Price</label>
															<input
																type='number'
																placeholder='Price'
																value={variant.price}
																onChange={(e) => {
																	const newGeneratedVariants =
																		[...generatedVariants];
																	newGeneratedVariants[
																		index
																	].price = e.target.value;
																	setGeneratedVariants(
																		newGeneratedVariants,
																	);
																}}
															/>
														</div>
														<div className='form-group'>
															<label>Original Price</label>
															<input
																type='number'
																placeholder='Original Price'
																value={variant.originalPrice}
																onChange={(e) => {
																	const newGeneratedVariants =
																		[...generatedVariants];
																	newGeneratedVariants[
																		index
																	].originalPrice =
																		e.target.value;
																	setGeneratedVariants(
																		newGeneratedVariants,
																	);
																}}
															/>
														</div>
													</div>
												)}
												<button
													type='button'
													onClick={() =>
														removeGeneratedVariant(index)
													}>
													Remove
												</button>
											</div>
										))}
									</div>
								</div>
							)}
							<button
								type='submit'
								className='submit-button'
								onClick={handleAddProduct}>
								Create Product
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
