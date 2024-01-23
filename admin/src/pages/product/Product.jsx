import { Link, useLocation } from 'react-router-dom';
import './product.css';
import Chart from '../../components/chart/Chart';
import { Publish } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../requestMethods';
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
	const [file, setFile] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(null);
	const [size, setSize] = useState([]);
	const product = useSelector((state) =>
		state.product.products.find((product) => product._id === productId),
	);
	const [colorArrayUpdate, setColorArrayUpdate] = useState(
		product.variants.map((variant) => variant.color),
	);
	const [quantityArray, setQuantityArray] = useState(
		product.variants.map((variant) => variant.quantity),
	);
	const [fileArray, setFileArray] = useState([]);
	const [imageArray, setImageArray] = useState(
		product.variants.map((variant) => variant.img),
	);
	const sizeArrayUpdate = [];
	const MONTHS = useMemo(
		() => [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Agu',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
		[],
	);
	const [productUpdateData, setProductUpdateData] = useState({
		title: product.title,
		title_ar: product.title_ar,
		desc: product.desc,
		desc_ar: product.desc_ar,
		price: product.price,
		inStock: product.inStock,
		categories: product.categories,
		height: product.height,
		width: product.width,
		variants: [
			{
				color: [],
				size: [],
				quantity: [],
				img: [],
			},
		],
		weight: product.weight,
		length: product.length,
		discount: {
			startDate: product.discount.startDate,
			endDate: product.discount.endDate,
			discount: product.discount.discount,
		},
		promo: {
			code: product.promo.code,
			startDate: product.promo.startDate,
			endDate: product.promo.endDate,
		},
	});
	const handleUpdate = (e) => {
		const { name, value } = e.target;
		if (name.startsWith('discount.')) {
			const key = name.split('.')[1];
			setProductUpdateData((prev) => ({
				...prev,
				discount: {
					...prev.discount,
					[key]: value,
				},
			}));
		} else if (name.startsWith('promo.')) {
			const key = name.split('.')[1];
			setProductUpdateData((prev) => ({
				...prev,
				promo: {
					...prev.promo,
					[key]: value,
				},
			}));
		} else {
			setProductUpdateData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};
	const handleSubmit = async (e, index) => {
		e.preventDefault();
		const sizeInputs = document.querySelectorAll('.sizeall');
		sizeInputs.forEach((sizeInput) => {
			if (sizeInput.checked) {
				sizeArrayUpdate.push(sizeInput.value);
			}
		});
		const sizeInputsS = document.querySelector('.SizeS').checked;
		const colorInputs = document.querySelectorAll('.color-picker1');
		if (colorInputs) {
			setColorArrayUpdate((prevColors) => {
				let updatedColors = [...prevColors];
				colorInputs.forEach((colorInput, index) => {
					const colorValue = colorInput.value;
					updatedColors[index] = colorValue;
				});
				return updatedColors;
			});
		}
		const storage = getStorage(app);
		const flatImageArray = imageArray.flat();
		const newProduct = {
			...productUpdateData,
			variants: await Promise.all(
				productUpdateData.variants.map(async (variant, i) => {
					let img = flatImageArray[i];
					if (img instanceof File) {
						const imagePath = `images/${Date.now()}-${img.name}`;
						const storageRef = ref(storage, imagePath);
						const snapshot = await uploadBytesResumable(storageRef, img);
						const imageUrl = await getDownloadURL(snapshot.ref);
						return {
							...variant,
							color: colorArrayUpdate[i],
							size: sizeArrayUpdate[i],
							img: imageUrl,
							quantity: quantityArray[i],
						};
					} else if (typeof img === 'string') {
						return {
							...variant,
							color: colorArrayUpdate[i],
							size: sizeArrayUpdate[i],
							img: img,
							quantity: quantityArray[i],
						};
					} else {
						throw new Error('img must be a File object or a URL string');
					}
				}),
			),
		};
		updateProduct(productId, newProduct, dispatch);
		swal('Product Updated', '', 'success');
	};
	useEffect(() => {
		product.variants.forEach((variant, index) => {
			if (Array.isArray(variant.color)) {
				variant.color.forEach((item, colorIndex) => {
					document.querySelector(
						`.color-picker${colorIndex + 1}${index}`,
					).value = item;
					document
						.querySelector(`.color-picker${colorIndex + 1}${index}`)
						.classList.add('haveColor');
				});
			}
		});
	}, [product.variants]);
	const handleImageChange = (event, index) => {
		let newImageArray = [...imageArray];
		newImageArray[index] = event.target.value;
		setImageArray(newImageArray);
	};
	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await userRequest.get('orders/income?pid=' + productId);
				const list = res.data.sort((a, b) => {
					return a._id - b._id;
				});
				list.map((item) =>
					setPStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], Sales: item.total },
					]),
				);
			} catch (err) {
				swal('Error', err.message, 'error');
			}
		};
		getStats();
	}, [productId, MONTHS]);
	useEffect(() => {
		product.variants.forEach((variant, index) => {
			if (Array.isArray(variant.size)) {
				variant.size.forEach((item) => {
					if (item === 'S') {
						document
							.querySelector(`.SizeS${index}`)
							.setAttribute('checked', true);
						document
							.querySelector(`.SizeS${index}`)
							.classList.add('haveSize');
						sizeArrayUpdate.push('S');
					}
					if (item === 'M') {
						document
							.querySelector(`.SizeM${index}`)
							.setAttribute('checked', true);
						document
							.querySelector(`.SizeM${index}`)
							.classList.add('haveSize');
						sizeArrayUpdate.push('M');
					}
					if (item === 'L') {
						document
							.querySelector(`.SizeL${index}`)
							.setAttribute('checked', true);
						document
							.querySelector(`.SizeL${index}`)
							.classList.add('haveSize');
						sizeArrayUpdate.push('L');
					}
					if (item === 'XL') {
						document
							.querySelector(`.SizeXL${index}`)
							.setAttribute('checked', true);
						document
							.querySelector(`.SizeXL${index}`)
							.classList.add('haveSize');
						sizeArrayUpdate.push('XL');
					}
					if (item === 'XXL') {
						document
							.querySelector(`.SizeXXL${index}`)
							.setAttribute('checked', true);
						document
							.querySelector(`.SizeXXL${index}`)
							.classList.add('haveSize');
						sizeArrayUpdate.push('XXL');
					}
				});
			}
		});
	}, [product.variants]);
	const addSize = (e) => {
		const form = e.target.closest('form');
		form
			.querySelectorAll('.SizeS, .SizeM, .SizeL, .SizeXL, .SizeXXL')
			.forEach((size) => {
				size.classList.remove('haveSize');
				size.removeAttribute('checked');
				e.target.classList.add('haveSize');
				e.target.setAttribute('checked', '');
				const index = sizeArrayUpdate.indexOf(size.value);
				if (index > -1) {
					setSize((prev) => {
						const newSizeArray = [...prev];
						newSizeArray.splice(index, 1);
						return newSizeArray;
					});
				}
			});
		e.target.classList.add('haveSize');
		e.target.setAttribute('checked', '');
		setSize((prev) => {
			return [...prev, e.target.value];
		});
	};
	const haveColor = (e) => {
		document.querySelector(`.${e}`).classList.add('haveColor');
	};
	if (productUpdateData.quantity > 0) {
		productUpdateData.inStock = true;
	} else {
		productUpdateData.inStock = false;
	}
	useEffect(() => {
		const tempVariant = {
			variants: product.variants.map((variant, index) => ({
				...variant,
				quantity: quantityArray[index],
				img: imageArray[index],
			})),
		};
		setProductUpdateData((prev) => ({
			...prev,
			variants: tempVariant.variants,
		}));
	}, [quantityArray, setProductUpdateData]);
	const [selectedClassName, setSelectedClassName] = useState(null);
	const handleFileChange = (e, item, index2) => {
		setSelectedClassName(e.target.className);
		setCurrentIndex(index2);
		const file = e.target.files[0];
		const selectItem = item.img[0];
		const newFileArray = [...fileArray];
		newFileArray[index2] = selectItem;
		setFileArray(newFileArray);
		const previewImage = URL.createObjectURL(file);
		const newImageArray = [...imageArray];
		newImageArray[index2] = previewImage;
		setImageArray(newImageArray);
	};
	const handleColorChange = (event, index) => {
		const updatedColors = colorArrayUpdate.map((color, i) =>
			i === index ? event.target.value : color,
		);
		setColorArrayUpdate(updatedColors);
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
							src={product.img}
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
						<div className='diviti2'>
							<div className='productInfoItem2'>
								<span className='productInfoKey'>size:</span>
								<ul className='productInfoValue productInfoValue3'>
									{product.variants.map((item) => {
										return <li key={item}>{item.size}</li>;
									})}
								</ul>
							</div>
							<div className='productInfoItem2'>
								<span className='productInfoKey'>color:</span>
								<ul className='productInfoValue productInfoValue3'>
									{product.variants.map((item) => {
										return <li key={item}>{item.color}</li>;
									})}
								</ul>
							</div>
							<div className='productInfoItem2'>
								<span className='productInfoKey'>Quantity:</span>
								<div className='productInfoValue productInfoValue3'>
									{product.variants.map((item) => {
										return <div key={item}>{item.quantity}</div>;
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{product.variants.map((item, indexzaid) => {
				return (
					<div
						id={`productBottom ${indexzaid}`}
						className={`productBottom ${indexzaid}`}>
						<form
							key={item.id}
							className='productForm'>
							<div className='productFormLeft'>
								{indexzaid === 0 && (
									<>
										<label>Product Name</label>
										<input
											type='text'
											className='PTitle'
											name='title'
											placeholder={product.title}
											onChange={handleUpdate}
										/>
										<label>Product Description</label>
										<textarea
											type='text'
											name='desc'
											className='PDesc'
											placeholder={product.desc}
											onChange={handleUpdate}
										/>
										<label>Product Name (Arabic)</label>
										<input
											type='text'
											name='title_ar'
											placeholder={product.title_ar}
											onChange={handleUpdate}
										/>
										<label>Product Description (Arabic)</label>
										<textarea
											name='desc_ar'
											placeholder={product.desc_ar}
											onChange={handleUpdate}
										/>
										<label>Price</label>
										<input
											type='number'
											name='price'
											className='PPrice'
											placeholder={product.price}
											onChange={handleUpdate}
										/>
										<label>In Stock</label>
										<select
											name='inStock'
											className='PStock'
											id='idStock'
											onChange={handleUpdate}>
											<option value='true'>Yes</option>
											<option value='false'>No</option>
										</select>
									</>
								)}
								<label>Quantity</label>
								<input
									type='number'
									className='PQuantity'
									name='quantity'
									value={quantityArray[indexzaid]}
									onChange={(e) => {
										const newQuantityArray = [...quantityArray];
										newQuantityArray[indexzaid] = e.target.value;
										setQuantityArray(newQuantityArray);
									}}
								/>
							</div>
							<div className='productFormLeft'>
								{indexzaid === 0 && (
									<>
										<label>Width</label>
										<input
											type='number'
											className='PWidth'
											name='width'
											placeholder={product.width}
											onChange={handleUpdate}
										/>
										<label>Height</label>
										<input
											type='number'
											className='PHeight'
											name='height'
											placeholder={product.height}
											onChange={handleUpdate}
										/>
										<label>Length</label>
										<input
											type='number'
											className='PLength'
											name='length'
											placeholder={product.length}
											onChange={handleUpdate}
										/>
										<label>Weight</label>
										<input
											type='number'
											className='PWeight'
											name='weight'
											placeholder={product.weight}
											onChange={handleUpdate}
										/>
									</>
								)}
								<fieldset>
									<legend>Size</legend>
									<input
										type='radio'
										className={`SizeS sizeall SizeS${indexzaid}`}
										name='size'
										value='S'
										onChange={addSize}
									/>
									<label> S</label>
									<br />
									<input
										type='radio'
										className={`SizeM sizeall SizeM${indexzaid}`}
										name='size'
										value='M'
										onChange={addSize}
									/>
									<label> M</label>
									<br />
									<input
										type='radio'
										className={`SizeL sizeall SizeL${indexzaid}`}
										name='size'
										value='L'
										onChange={addSize}
									/>
									<label> L</label>
									<br />
									<input
										type='radio'
										className={`SizeXL sizeall SizeXL${indexzaid}`}
										name='size'
										value='XL'
										onChange={addSize}
									/>
									<label> XL</label>
									<br />
									<input
										type='radio'
										className={`SizeXXL sizeall SizeXXL${indexzaid}`}
										name='size'
										value='XXL'
										onChange={addSize}
									/>
									<label> XXL</label>
									<br />
								</fieldset>
								<br />
								<div className='addProductItem color'>
									<label>Color</label>
									<br />
									<input
										id={`color-picker1${indexzaid}`}
										class={`color-picker1 color-picker1${indexzaid}`}
										name='color1'
										type='color'
										onChange={(event) =>
											handleColorChange(event, indexzaid)
										}
										onInput={() => {
											haveColor(`color-picker1${indexzaid}`);
										}}
									/>
								</div>
							</div>
							{indexzaid === 0 && (
								<div className='productFormLeft'>
									<label>Discount Start Date</label>
									<input
										type='date'
										className='PDiscountStartDate'
										name='discount.startDate'
										placeholder={product.discount.startDate}
										onChange={handleUpdate}
									/>
									<label>Discount End Date</label>
									<input
										type='date'
										className='PDiscountEndDate'
										name='discount.endDate'
										placeholder={product.discount.endDate}
										onChange={handleUpdate}
									/>
									<label>Discount</label>
									<input
										type='number'
										className='PDiscount'
										name='discount.discount'
										placeholder={product.discount.discount}
										onChange={handleUpdate}
									/>
									<label>Promo Code</label>
									<input
										type='text'
										className='PPromoCode'
										name='promo.code'
										placeholder={product.promo.code}
										onChange={handleUpdate}
									/>
									<label>Promo Start Date</label>
									<input
										type='date'
										className='PPromoStartDate'
										name='promo.startDate'
										placeholder={product.promo.startDate}
										onChange={handleUpdate}
									/>
									<label>Promo End Date</label>
									<input
										type='date'
										className='PPromoEndDate'
										name='promo.endDate'
										placeholder={product.promo.endDate}
										onChange={handleUpdate}
									/>
								</div>
							)}
							<div className='productFormRight'>
								<div
									className='productUpload'
									style={{ display: 'contents' }}>
									<img
										style={{
											width: '100px',
											height: '100px',
											borderRadius: '10px',
											objectFit: 'cover',
											marginRight: '20px',
										}}
										src={imageArray[indexzaid]}
										alt=''
									/>
									<label
										htmlFor={`file${indexzaid}`}
										style={{
											cursor: 'pointer',
											marginTop: '-130px',
											marginLeft: '29px',
										}}>
										<RiArrowDownCircleLine size={40} />
									</label>
									<input
										className={`${indexzaid}`}
										type='file'
										id={`file${indexzaid}`}
										name='file'
										style={{ display: 'none' }}
										onChange={(event) => {
											handleFileChange(event, item, indexzaid);
										}}
									/>
								</div>
								<button
									className='productButton'
									onClick={(e) => handleSubmit(e, indexzaid)}>
									Update
								</button>
							</div>
						</form>
					</div>
				);
			})}
		</div>
	);
}
