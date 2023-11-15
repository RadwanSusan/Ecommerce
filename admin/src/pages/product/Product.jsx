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
	// const [colorArrayUpdate, setColorArrayUpdate] = useState([]);
	const [selectedSize, setSelectedSize] = useState('');
	const [size, setSize] = useState([]);
	const product = useSelector((state) =>
		state.product.products.find((product) => product._id === productId),
	);
	const [colorArrayUpdate, setColorArrayUpdate] = useState(
		product.variants.map((variant) => variant.color),
	);
	console.log(`🚀  file: Product.jsx:31  product =>`, product);

	const [quantityArray, setQuantityArray] = useState(
		product.variants.map((variant) => variant.quantity),
	);
	const [fileArray, setFileArray] = useState([]);
	const [imageArray, setImageArray] = useState(
		product.variants.map((variant) => variant.img),
	);

	// const colorArrayUpdate = [];
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
	console.log(product);
	const [productUpdateData, setProductUpdateData] = useState({
		title: product.title,
		desc: product.desc,
		price: product.price,
		inStock: product.inStock,
		// img: product.img,
		categories: product.categories,
		// size: product.size,
		// color: product.color,
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
		// quantity: product.quantity,
		weight: product.weight,
		length: product.length,
	});
	const handleUpdate = (e) => {
		setProductUpdateData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	// const handleSubmit = async (e, index) => {
	// 	e.preventDefault();
	// 	let fileName;
	// 	if (file !== null || file !== []) {
	// 		fileName = file.name;
	// 	}
	// 	if (file === null || file === []) {
	// 		if (
	// 			document.querySelector('.PTitle').value == '' &&
	// 			document.querySelector('.PWeight').value == '' &&
	// 			document.querySelector('.PHeight').value == '' &&
	// 			document.querySelector('.PWidth').value == '' &&
	// 			document.querySelector('.PQuantity').value == '' &&
	// 			document.querySelector('.PLength').value == '' &&
	// 			document.querySelector('.PDesc').value == '' &&
	// 			document.querySelector('.PPrice').value == ''
	// 		) {
	// 			swal('Info', 'Please update atleast one feild!', 'info');
	// 			return;
	// 		}
	// 		if (
	// 			productUpdateData.title === '' ||
	// 			productUpdateData.desc === '' ||
	// 			productUpdateData.price === '' ||
	// 			productUpdateData.inStock === ''
	// 		) {
	// 			swal('Info', 'Please make an update in one of the feilds!', 'info');
	// 			return;
	// 		}

	// 		try {
	// 			if (document.querySelector('.color-picker1.haveColor')) {
	// 				colorArrayUpdate.push(
	// 					document.querySelector('.color-picker1').value,
	// 				);
	// 			}
	// 			if (document.querySelector('.color-picker2.haveColor')) {
	// 				colorArrayUpdate.push(
	// 					document.querySelector('.color-picker2').value,
	// 				);
	// 			}
	// 			if (document.querySelector('.color-picker3.haveColor')) {
	// 				colorArrayUpdate.push(
	// 					document.querySelector('.color-picker3').value,
	// 				);
	// 			}
	// 			if (document.querySelector('.color-picker4.haveColor')) {
	// 				colorArrayUpdate.push(
	// 					document.querySelector('.color-picker4').value,
	// 				);
	// 			}
	// 			if (document.querySelector('.color-picker5.haveColor')) {
	// 				colorArrayUpdate.push(
	// 					document.querySelector('.color-picker5').value,
	// 				);
	// 			}
	// 			if (document.querySelector('.color-picker6.haveColor')) {
	// 				colorArrayUpdate.push(
	// 					document.querySelector('.color-picker6').value,
	// 				);
	// 			}
	// 			if (document.querySelector('.SizeS.haveSize')) {
	// 				sizeArrayUpdate.push('S');
	// 			}
	// 			if (document.querySelector('.SizeM.haveSize')) {
	// 				sizeArrayUpdate.push('M');
	// 			}
	// 			if (document.querySelector('.SizeL.haveSize')) {
	// 				sizeArrayUpdate.push('L');
	// 			}
	// 			if (document.querySelector('.SizeXL.haveSize')) {
	// 				sizeArrayUpdate.push('XL');
	// 			}
	// 			if (document.querySelector('.SizeXXL.haveSize')) {
	// 				sizeArrayUpdate.push('XXL');
	// 			}
	// 			const color = colorArrayUpdate;
	// 			const size = sizeArrayUpdate;
	// 			const updatedVariant = {
	// 				...variant,
	// 				size: sizeArrayUpdate[index],
	// 				color: colorArrayUpdate[index],
	// 				img: imageArray[index],
	// 				quantity: quantityArray[index],
	// 			};

	// 			// Create product object with updated variant
	// 			const product = {
	// 				...productUpdateData,
	// 				variants: productUpdateData.variants.map((variant, i) =>
	// 					i === index ? updatedVariant : variant,
	// 				),
	// 			};

	// 			updateProduct(productId, product, dispatch);
	// 			setFile(null);
	// 			setCurrentIndex(null);
	// 			swal('Product Updated', '', 'success');
	// 		} catch (err) {
	// 			swal('Error', err.message, 'error');
	// 		}
	// 	} else {
	// 		fileName = new Date().getTime() + file.name;
	// 		const storage = getStorage(app);
	// 		const storageRef = ref(storage, fileName);
	// 		const uploadTask = uploadBytesResumable(storageRef, file);
	// 		uploadTask.on(
	// 			'state_changed',
	// 			(snapshot) => {
	// 				const progress =
	// 					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 				console.log('Upload is ' + progress + '% done');
	// 				switch (snapshot.state) {
	// 					case 'paused':
	// 						console.log('Upload is paused');
	// 						break;
	// 					case 'running':
	// 						console.log('Upload is running');
	// 						break;
	// 					default:
	// 				}
	// 			},
	// 			(error) => {
	// 				swal('Error', error.message, 'error');
	// 			},
	// 			() => {
	// 				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
	// 					try {
	// 						if (document.querySelector('.color-picker1.haveColor')) {
	// 							colorArrayUpdate.push(
	// 								document.querySelector('.color-picker1').value,
	// 							);
	// 						}
	// 						if (document.querySelector('.color-picker2.haveColor')) {
	// 							colorArrayUpdate.push(
	// 								document.querySelector('.color-picker2').value,
	// 							);
	// 						}
	// 						if (document.querySelector('.color-picker3.haveColor')) {
	// 							colorArrayUpdate.push(
	// 								document.querySelector('.color-picker3').value,
	// 							);
	// 						}
	// 						if (document.querySelector('.color-picker4.haveColor')) {
	// 							colorArrayUpdate.push(
	// 								document.querySelector('.color-picker4').value,
	// 							);
	// 						}
	// 						if (document.querySelector('.color-picker5.haveColor')) {
	// 							colorArrayUpdate.push(
	// 								document.querySelector('.color-picker5').value,
	// 							);
	// 						}
	// 						if (document.querySelector('.color-picker6.haveColor')) {
	// 							colorArrayUpdate.push(
	// 								document.querySelector('.color-picker6').value,
	// 							);
	// 						}
	// 						if (document.querySelector('.SizeS.haveSize')) {
	// 							sizeArrayUpdate.push('S');
	// 						}
	// 						if (document.querySelector('.SizeM.haveSize')) {
	// 							sizeArrayUpdate.push('M');
	// 						}
	// 						if (document.querySelector('.SizeL.haveSize')) {
	// 							sizeArrayUpdate.push('L');
	// 						}
	// 						if (document.querySelector('.SizeXL.haveSize')) {
	// 							sizeArrayUpdate.push('XL');
	// 						}
	// 						if (document.querySelector('.SizeXXL.haveSize')) {
	// 							sizeArrayUpdate.push('XXL');
	// 						}
	// 						const color = colorArrayUpdate;
	// 						const size = sizeArrayUpdate;

	// 						const product = {
	// 							...productUpdateData,
	// 							// img: downloadURL,

	// 							img: productUpdateData.img.map((imgUrl, i) =>
	// 								i === currentIndex ? downloadURL : imgUrl,
	// 							),
	// 							size,
	// 							color,
	// 						};
	// 						updateProduct(productId, product, dispatch);
	// 						swal('Product Updated', '', 'success');
	// 					} catch (err) {
	// 						swal('Error', err.message, 'error');
	// 					}
	// 				});
	// 			},
	// 		);
	// 	}
	// };

	console.log(productUpdateData, 'zaidoooooooooooo');

	const handleSubmit = async (e, index) => {
		e.preventDefault();
		// get value the image and loop over it and add it to imageArray
		console.log(imageArray, 'imageArray');

		// Rest of the code...

		const sizeInputs = document.querySelectorAll('.sizeall');

		sizeInputs.forEach((sizeInput) => {
			if (sizeInput.checked) {
				sizeArrayUpdate.push(sizeInput.value);
			}
		});

		const sizeInputsS = document.querySelector('.SizeS').checked;
		console.log(sizeInputsS, 'sizeInputs');

		const colorInputs = document.querySelectorAll('.color-picker1');

		if (colorInputs) {
			setColorArrayUpdate((prevColors) => {
				let updatedColors = [...prevColors]; // Make a copy of the previous state

				colorInputs.forEach((colorInput, index) => {
					const colorValue = colorInput.value;
					updatedColors[index] = colorValue; // Update the copied array
				});

				return updatedColors; // Return the updated array as the new state
			});
		}

		const newProduct = {
			...productUpdateData,

			variants: productUpdateData.variants.map((variant, i) => ({
				...variant,
				color: colorArrayUpdate[i],
				size: sizeArrayUpdate[i],
				img: imageArray[i],
				quantity: quantityArray[i],
			})),
		};
		console.log(newProduct);
		updateProduct(productId, newProduct, dispatch);
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
		// Remove the haveSize class and remove the size from sizeArrayUpdate from all sizes
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

		// Add the haveSize class and add the size to sizeArrayUpdate for the selected size
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

	// useEffect(() => {
	//   if (product.img) {
	//     setFile(product.img);
	//   }

	// }, [product.img]);
	useEffect(() => {
		const tempVariant = {
			variants: product.variants.map((variant, index) => ({
				...variant,
				quantity: quantityArray[index],
				img: imageArray[index],
			})),
		};

		console.log(`🚀  file: Product.jsx:472  tempVariant =>`, tempVariant);

		setProductUpdateData((prev) => ({
			...prev,
			variants: tempVariant.variants,
		}));
	}, [quantityArray, setProductUpdateData]);
	console.log(productUpdateData, 'zzzzzzzzzzzzzzzzzzzzz');

	const [selectedClassName, setSelectedClassName] = useState(null);

	const handleFileChange = (e, item, index2) => {
		console.log(e.target, 'zaid');
		setSelectedClassName(e.target.className);

		setCurrentIndex(index2);
		const file = e.target.files[0];
		console.log(`file: ${file}`);
		// const className = e.target.className;
		console.log(`selectedClassName: ${selectedClassName}`);

		const selectItem = item.img[0];
		console.log(`selectItem: ${selectItem}`);
		console.log(`index: ${index2}`);

		const newFileArray = [...fileArray]; // clone the current file array
		console.log(`newFileArray: ${newFileArray}`);
		newFileArray[index2] = selectItem; // replace the file at the given index
		setFileArray(newFileArray); // update the state with the new file array

		// Create a URL representing the selected file
		const previewImage = URL.createObjectURL(file);
		console.log(`previewImage: ${previewImage}`);

		// Update the imageArray state to reflect the selected image
		const newImageArray = [...imageArray];
		newImageArray[index2] = previewImage;
		setImageArray(newImageArray);
	};
	const handleColorChange = (event, index) => {
		// Create a new color array with the updated color
		const updatedColors = colorArrayUpdate.map((color, i) =>
			i === index ? event.target.value : color,
		);

		// Update the state with the new color array
		setColorArrayUpdate(updatedColors);
	};
	console.log(product.variants, 'zaaaaaaaaaaaaaid');
	return (
		<div className='product'>
			<div className='productTitleContainer'>
				<h1 className='productTitle'>Product</h1>
			</div>
			<div className='productTop'>
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
							<div className='productInfoItem'>
								<span className='productInfoKey'>Product name:</span>
								<span className='productInfoValue'>{product._id}</span>
							</div>
							<div className='productInfoItem'>
								<span className='productInfoKey'>
									Product description:
								</span>
								<span className='productInfoValue productInfoValue2'>
									{product.desc}
								</span>
							</div>
							<div className='productInfoItem'>
								<span className='productInfoKey'>sales:</span>
								<span className='productInfoValue'>0</span>
							</div>
							<div className='productInfoItem'>
								<span className='productInfoKey'>in stock:</span>
								<span className='productInfoValue'>
									{product.inStock.toString()}
								</span>
							</div>
							<div className='productInfoItem'>
								<span className='productInfoKey'>price:</span>
								<span className='productInfoValue'>
									{product.price}
								</span>
							</div>
							<div className='productInfoItem'>
								<span className='productInfoKey'>color:</span>
								<ul className='productInfoValue'>
									{/* {product.color.map((item) => {
										return <li key={item}>{item}</li>;
									})} */}
								</ul>
							</div>
						</div>
						<div className='diviti2'>
							<div className='productInfoItem'>
								<span className='productInfoKey'>size:</span>
								<ul className='productInfoValue'>
									{/* {product.size.map((item) => {
										return <li key={item}>{item}</li>;
									})} */}
								</ul>
							</div>
							<div className='productInfoItem'>
								<span className='productInfoKey'>Quantity:</span>
								<div className='productInfoValue'>
									{product.quantity}
								</div>
							</div>
							<div className='productInfoItem'>
								<span className='productInfoKey'>Width:</span>
								<div className='productInfoValue'>{product.width}</div>
							</div>
							<div className='productInfoItem'>
								<span className='productInfoKey'>Height:</span>
								<div className='productInfoValue'>{product.height}</div>
							</div>
							<div className='productInfoItem'>
								<span className='productInfoKey'>Length:</span>
								<div className='productInfoValue'>{product.length}</div>
							</div>
							<div className='productInfoItem'>
								<span className='productInfoKey'>Weight:</span>
								<div className='productInfoValue'>{product.weight}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{product.variants.map((item, indexzaid) => {
				console.log(`Outside onChange: ${indexzaid}`);
				return (
					<div
						id={`productBottom ${indexzaid}`}
						className={`productBottom ${indexzaid}`}
					>
						<form
							key={item.id}
							className='productForm'
							// onClick={(e) => handleSubmit(e, indexzaid)}
						>
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
											onChange={handleUpdate}
										>
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

							<div className='productFormRight'>
								<div
									className='productUpload'
									style={{ display: 'contents' }}
								>
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
										}}
									>
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
											console.log(`Inside onChange: ${indexzaid}`);
										}}
									/>
								</div>

								<button
									className='productButton'
									// onChange={handleSubmit}
									onClick={(e) => handleSubmit(e, indexzaid)}
									// type='submit'
								>
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
