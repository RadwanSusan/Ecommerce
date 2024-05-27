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
	});
	const [loading, setLoading] = useState(false);
	const [draggedFile, setDraggedFile] = useState(null);
	const [variants, setVariants] = useState([{ key: '', values: [] }]);
	const [generatedVariants, setGeneratedVariants] = useState([]);
	const [expandedVariants, setExpandedVariants] = useState([]);
	const [categoryInput, setCategoryInput] = useState('');
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
		// const hasAllRequiredInputs = requiredInputs.every(
		// 	(field) => inputs[field],
		// );
		// if (!hasAllRequiredInputs) {
		// 	showError('Error!', 'Please fill all the required fields');
		// 	return;
		// }
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
			// const variantsData =
			// 	inputs.type === 'variable'
			// 		? await Promise.all(
			// 				uploadedVariants.map((uploadTask) =>
			// 					getDownloadURL(uploadTask.ref).then((url) => ({
			// 						key: uploadTask.metadata.name.split('_')[1],
			// 						value: uploadTask.metadata.name.split('_')[2],
			// 						image: url,
			// 					})),
			// 				),
			// 		  )
			// 		: [];
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
			// const product = constructProduct(
			// 	inputs,
			// 	generatedVariants.map((variant, index) => ({
			// 		...variant,
			// 		images: variantsData
			// 			.filter(
			// 				(data) =>
			// 					data.key === variant.key &&
			// 					data.value === variant.value,
			// 			)
			// 			.map((data) => data.image),
			// 	})),
			// 	supplierInfo,
			// );
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
	// const constructProduct = (inputs, variants, supplierInfo) => {
	// 	let productData = {
	// 		type: inputs.type,
	// 		...inputs,
	// 		categories: inputs.categories.map(({ name, name_ar }) => ({
	// 			name,
	// 			name_ar,
	// 		})),
	// 		...(inputs.type === 'variable' && {
	// 			variants: generatedVariants.map((variant) => ({
	// 				key: variant.key,
	// 				value: variant.value,
	// 				images: variant.images || [],
	// 				price: variant.price,
	// 				originalPrice: variant.originalPrice,
	// 			})),
	// 		}),
	// 		...(isObjectComplete(inputs.discount) && {
	// 			discount: inputs.discount,
	// 		}),
	// 		...(isObjectComplete(inputs.promo) && { promo: inputs.promo }),
	// 		supplierId: supplierInfo._id,
	// 	};
	// 	return productData;
	// };
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
		setCategoryInput('');
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
	const handleCategoryChange = (e) => {
		setCategoryInput(e.target.value);
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
					<div className='addProductItem'>
						<label>Product Type*</label>
						<div>
							<label>
								<input
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
					{inputs.type === 'variable' && (
						<div className='variantsContainer'>
							<h3>Variants</h3>
							{variants.map((variant, index) => (
								<div
									key={index}
									className='variantItem'>
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
									<button onClick={() => removeVariant(index)}>
										Remove
									</button>
								</div>
							))}
							<button onClick={addVariant}>Add Variant</button>
							<button onClick={generateVariants}>
								Generate Variants
							</button>
						</div>
					)}
					<div className='generatedVariantsContainer'>
						<h3>Generated Variants</h3>
						{generatedVariants.map((variant, index) => (
							<div
								key={index}
								className='generatedVariantItem'>
								<div onClick={() => toggleVariant(index)}>
									{Object.entries(variant).map(([key, value]) => (
										<div key={key}>
											<span>
												{key}:{' '}
												{key === 'images'
													? value
															.map((file) => file.name)
															.join(', ')
													: value}
											</span>
										</div>
									))}
								</div>
								{expandedVariants[index] && (
									<div>
										<input
											type='number'
											placeholder='Quantity'
											value={variant.quantity}
											onChange={(e) => {
												const newGeneratedVariants = [
													...generatedVariants,
												];
												newGeneratedVariants[index].quantity =
													e.target.value;
												setGeneratedVariants(newGeneratedVariants);
											}}
										/>
										<input
											type='file'
											multiple
											onChange={(e) => {
												const newGeneratedVariants = [
													...generatedVariants,
												];
												newGeneratedVariants[index].images =
													Array.from(e.target.files);
												setGeneratedVariants(newGeneratedVariants);
											}}
										/>
										<input
											type='number'
											placeholder='Price'
											value={variant.price}
											onChange={(e) => {
												const newGeneratedVariants = [
													...generatedVariants,
												];
												newGeneratedVariants[index].price =
													e.target.value;
												setGeneratedVariants(newGeneratedVariants);
											}}
										/>
										<input
											type='number'
											placeholder='Original Price'
											value={variant.originalPrice}
											onChange={(e) => {
												const newGeneratedVariants = [
													...generatedVariants,
												];
												newGeneratedVariants[index].originalPrice =
													e.target.value;
												setGeneratedVariants(newGeneratedVariants);
											}}
										/>
									</div>
								)}
								<button onClick={() => removeGeneratedVariant(index)}>
									Remove
								</button>
							</div>
						))}
					</div>
					<div className='addProductItem'>
						<label>Image</label>
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
								<p>Drop your file here</p>
							) : (
								<>
									<p>Drag and drop your files here or</p>
									<label className='browse'>browse</label>
								</>
							)}
						</div>
					</div>
					<div className='divition1'>
						<div className='addProductItem'>
							<label>Title*</label>
							<input
								name='title'
								className='Title'
								type='text'
								placeholder='Apple Airpods'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Description*</label>
							<input
								name='desc'
								className='Description'
								type='text'
								placeholder='description...'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Title (Arabic)</label>
							<input
								name='title_ar'
								type='text'
								placeholder='Title in Arabic'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Description (Arabic)</label>
							<input
								name='desc_ar'
								type='text'
								placeholder='Description in Arabic'
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='divition2'>
						<div className='addProductItem'>
							<label>Discount Start Date</label>
							<input
								name='discount.startDate'
								type='date'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Discount End Date</label>
							<input
								name='discount.endDate'
								type='date'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Discount</label>
							<input
								name='discount.discount'
								type='number'
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='divition2'>
						<div className='addProductItem'>
							<label>Promo Code</label>
							<input
								name='promo.code'
								type='text'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Promo Start Date</label>
							<input
								name='promo.startDate'
								type='date'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Promo End Date</label>
							<input
								name='promo.endDate'
								type='date'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Categories*</label>
							<div className='categoriesContainer'>
								{inputs.categories.map((category, index) => (
									<div
										key={index}
										className='categoryItem'>
										<input
											type='text'
											name={`categories.${index}.name`}
											placeholder='Category Name'
											value={category.name}
											onChange={handleChange}
										/>
										<input
											type='text'
											name={`categories.${index}.name_ar`}
											placeholder='Category Name (Arabic)'
											value={category.name_ar}
											onChange={handleChange}
										/>
										<button onClick={() => removeCategory(index)}>
											Remove
										</button>
									</div>
								))}
								<div className='addCategoryItem'>
									<button onClick={addCategory}>Add Category</button>
								</div>
							</div>
						</div>
					</div>
					<div className='divition2 divition221'>
						<div className='addProductItem'>
							<label>Product Width*</label>
							<input
								name='width'
								type='number'
								placeholder='200'
								onChange={handleChange}
								className='Width'
							/>
						</div>
						<div className='addProductItem'>
							<label>Product Height*</label>
							<input
								name='height'
								type='number'
								placeholder='200'
								onChange={handleChange}
								className='Height'
							/>
						</div>
						<div className='addProductItem'>
							<label>Product Length*</label>
							<input
								name='length'
								type='number'
								placeholder='200'
								onChange={handleChange}
								className='Length'
							/>
						</div>
						<div className='addProductItem'>
							<label>Product Weight*</label>
							<input
								name='weight'
								type='number'
								placeholder='200'
								onChange={handleChange}
								className='Weight'
							/>
						</div>
						<button
							onClick={handleAddProduct}
							className='addProductButton'>
							Create
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
