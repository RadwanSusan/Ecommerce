import { useLocation } from 'react-router-dom';
import './product.css';
import Chart from '../../components/chart/Chart';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/apiCalls';
import { RiArrowDownCircleLine } from 'react-icons/ri';
import swal from 'sweetalert';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
export default function Product() {
	const location = useLocation();
	const productId = location.pathname.split('/')[2];
	const [pStats, setPStats] = useState([]);
	const dispatch = useDispatch();
	const product = useSelector((state) =>
		state.product.products.find((product) => product._id === productId),
	);
	const [productUpdateData, setProductUpdateData] = useState({
		type: product.type,
		title: product.title,
		title_ar: product.title_ar,
		desc: product.desc,
		desc_ar: product.desc_ar,
		categories: product.categories,
		inStock: product.inStock,
		width: product.width,
		height: product.height,
		length: product.length,
		weight: product.weight,
		price: product.price,
		originalPrice: product.originalPrice,
		images: product.images,
		variants: product.variants,
	});
	const handleUpdate = (e) => {
		const { name, value } = e.target;
		if (name.startsWith('categories.')) {
			const [field, index, key] = name.split('.');
			setProductUpdateData((prev) => ({
				...prev,
				[field]: prev[field].map((category, i) =>
					i === parseInt(index) ? { ...category, [key]: value } : category,
				),
			}));
		} else if (name.startsWith('variants.')) {
			const [field, index, key] = name.split('.');
			setProductUpdateData((prev) => ({
				...prev,
				[field]: prev[field].map((variant, i) =>
					i === parseInt(index) ? { ...variant, [key]: value } : variant,
				),
			}));
		} else {
			setProductUpdateData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const storage = getStorage(app);
		const uploadPromises = productUpdateData.images.map((image, index) => {
			if (image instanceof File) {
				const fileName = `images/${Date.now()}_${index}_${image.name}`;
				const storageRef = ref(storage, fileName);
				return uploadBytesResumable(storageRef, image);
			}
			return Promise.resolve(image);
		});
		const uploadedImages = await Promise.all(uploadPromises);
		const newProduct = {
			...productUpdateData,
			images: uploadedImages.map((uploadTask, index) => {
				if (uploadTask instanceof File) {
					return getDownloadURL(uploadTask.ref);
				}
				return uploadTask;
			}),
		};
		updateProduct(productId, newProduct, dispatch);
		swal('Product Updated', '', 'success');
	};
	const handleFileChange = (e, index) => {
		const file = e.target.files[0];
		setProductUpdateData((prev) => {
			const updatedImages = [...prev.images];
			updatedImages[index] = file;
			return {
				...prev,
				images: updatedImages,
			};
		});
	};
	return (
		<div className='product'>
			<div className='productTitleContainer'>
				<h1 className='productTitle'>Product</h1>
			</div>
			<div className='productTop2'>
				<div className='productTopLeft'>
					<Chart
						data={pStats}
						dataKey='Sales'
						title='Sales Performance'
					/>
				</div>
				<div className='productTopRight'>
					<div className='productInfoTop'>
						<img
							src={product.images[0]}
							alt=''
							className='productInfoImg'
						/>
						<span className='productName'>{product.title}</span>
					</div>
					<div className='productInfoBottom productInfoBottom2 '>
						<div className='diviti'>
							<div className='productInfoItem2'>
								<span className='productInfoKey'>Product name:</span>
								<span className='productInfoValue'>
									{product.title}
								</span>
							</div>
							<div className='productInfoItem2'>
								<span className='productInfoKey'>Height:</span>
								<div className='productInfoValue'>{product.height}</div>
							</div>
							<div className='productInfoItem2'>
								<span className='productInfoKey'>Length:</span>
								<div className='productInfoValue'>{product.length}</div>
							</div>
							<div className='productInfoItem2'>
								<span className='productInfoKey'>Weight:</span>
								<div className='productInfoValue'>{product.weight}</div>
							</div>
							<div className='productInfoItem2'>
								<span className='productInfoKey'>in stock:</span>
								<span className='productInfoValue'>
									{product.inStock.toString()}
								</span>
							</div>
							<div className='productInfoItem2'>
								<span className='productInfoKey'>Width:</span>
								<div className='productInfoValue'>{product.width}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='productBottom'>
				<form className='productForm'>
					<div className='productFormLeft'>
						<div className='form-group'>
							<label>Product Type</label>
							<div className='radio-group'>
								<label>
									<input
										type='radio'
										name='type'
										value='simple'
										checked={productUpdateData.type === 'simple'}
										onChange={handleUpdate}
									/>
									Simple
								</label>
								<label>
									<input
										type='radio'
										name='type'
										value='variable'
										checked={productUpdateData.type === 'variable'}
										onChange={handleUpdate}
									/>
									Variable
								</label>
							</div>
						</div>
						<div className='form-group'>
							<label>Title</label>
							<input
								name='title'
								type='text'
								value={productUpdateData.title}
								onChange={handleUpdate}
							/>
						</div>
						<div className='form-group'>
							<label>Description</label>
							<textarea
								name='desc'
								value={productUpdateData.desc}
								onChange={handleUpdate}
							/>
						</div>
						<div className='form-group'>
							<label>Title (Arabic)</label>
							<input
								name='title_ar'
								type='text'
								value={productUpdateData.title_ar}
								onChange={handleUpdate}
							/>
						</div>
						<div className='form-group'>
							<label>Description (Arabic)</label>
							<textarea
								name='desc_ar'
								value={productUpdateData.desc_ar}
								onChange={handleUpdate}
							/>
						</div>
					</div>
					<div className='productFormLeft'>
						<div className='form-group'>
							<label>Categories</label>
							{productUpdateData.categories.map((category, index) => (
								<div
									key={index}
									className='category-item'>
									<div className='form-group'>
										<label>Category Name</label>
										<input
											type='text'
											name={`categories.${index}.name`}
											value={category.name}
											onChange={handleUpdate}
										/>
									</div>
									<div className='form-group'>
										<label>Category Name (Arabic)</label>
										<input
											type='text'
											name={`categories.${index}.name_ar`}
											value={category.name_ar}
											onChange={handleUpdate}
										/>
									</div>
								</div>
							))}
						</div>
						<div className='form-group'>
							<label>In Stock</label>
							<select
								name='inStock'
								className='PStock'
								id='idStock'
								value={productUpdateData.inStock}
								onChange={handleUpdate}>
								<option value='true'>Yes</option>
								<option value='false'>No</option>
							</select>
						</div>
						<div className='form-group'>
							<label>Width</label>
							<input
								type='number'
								className='PWidth'
								name='width'
								value={productUpdateData.width}
								onChange={handleUpdate}
							/>
						</div>
						<div className='form-group'>
							<label>Height</label>
							<input
								type='number'
								className='PHeight'
								name='height'
								value={productUpdateData.height}
								onChange={handleUpdate}
							/>
						</div>
						<div className='form-group'>
							<label>Length</label>
							<input
								type='number'
								className='PLength'
								name='length'
								value={productUpdateData.length}
								onChange={handleUpdate}
							/>
						</div>
						<div className='form-group'>
							<label>Weight</label>
							<input
								type='number'
								className='PWeight'
								name='weight'
								value={productUpdateData.weight}
								onChange={handleUpdate}
							/>
						</div>
						{productUpdateData.type === 'simple' && (
							<>
								<div className='form-group'>
									<label>Price</label>
									<input
										type='number'
										name='price'
										className='PPrice'
										value={productUpdateData.price}
										onChange={handleUpdate}
									/>
								</div>
								<div className='form-group'>
									<label>Original Price</label>
									<input
										type='number'
										name='originalPrice'
										value={productUpdateData.originalPrice}
										onChange={handleUpdate}
									/>
								</div>
							</>
						)}
					</div>
					<div className='productFormLeft'>
						<div className='form-group'>
							<label>Images</label>
							<div className='image-preview-grid'>
								{productUpdateData.images.map((image, index) => (
									<div
										key={index}
										className='image-preview-item'>
										<img
											src={
												typeof image === 'string'
													? image
													: URL.createObjectURL(image)
											}
											alt={`Preview ${index}`}
										/>
										<label htmlFor={`file-${index}`}>
											<RiArrowDownCircleLine size={40} />
										</label>
										<input
											className={`${index}`}
											type='file'
											id={`file-${index}`}
											name='file'
											style={{ display: 'none' }}
											onChange={(event) =>
												handleFileChange(event, index)
											}
										/>
									</div>
								))}
							</div>
						</div>
						{productUpdateData.type === 'variable' && (
							<div className='form-group'>
								<h2>Variants</h2>
								{productUpdateData.variants.map((variant, index) => (
									<div
										key={index}
										className='variant-item'>
										<div className='form-group'>
											<label>Key</label>
											<input
												type='text'
												name={`variants.${index}.key`}
												value={variant.key}
												onChange={handleUpdate}
											/>
										</div>
										<div className='form-group'>
											<label>Value</label>
											<input
												type='text'
												name={`variants.${index}.value`}
												value={variant.value}
												onChange={handleUpdate}
											/>
										</div>
										<div className='form-group'>
											<label>Price</label>
											<input
												type='number'
												name={`variants.${index}.price`}
												value={variant.price}
												onChange={handleUpdate}
											/>
										</div>
										<div className='form-group'>
											<label>Original Price</label>
											<input
												type='number'
												name={`variants.${index}.originalPrice`}
												value={variant.originalPrice}
												onChange={handleUpdate}
											/>
										</div>
										<div className='form-group'>
											<label>Images</label>
											{variant.images.map((image, imageIndex) => (
												<div
													key={imageIndex}
													className='image-preview-item'>
													<img
														src={
															typeof image === 'string'
																? image
																: URL.createObjectURL(image)
														}
														alt={`Preview ${imageIndex}`}
													/>
													<label
														htmlFor={`variant-file-${index}-${imageIndex}`}>
														<RiArrowDownCircleLine size={40} />
													</label>
													<input
														type='file'
														id={`variant-file-${index}-${imageIndex}`}
														style={{ display: 'none' }}
														onChange={(event) =>
															handleVariantFileChange(
																event,
																index,
																imageIndex,
															)
														}
													/>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
					<button
						className='productButton'
						onClick={handleSubmit}>
						Update
					</button>
				</form>
			</div>
		</div>
	);
}
