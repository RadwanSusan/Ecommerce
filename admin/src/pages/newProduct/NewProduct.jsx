// import { useEffect, useState, useRef } from 'react';
// import './newProduct.css';
// import {
// 	getStorage,
// 	ref,
// 	uploadBytesResumable,
// 	getDownloadURL,
// } from 'firebase/storage';
// import app from '../../firebase';
// import { addProduct } from '../../redux/apiCalls';
// import { useDispatch, useSelector } from 'react-redux';
// import swal from 'sweetalert';
// import Resizer from 'react-image-file-resizer';
// import { FaSpinner } from 'react-icons/fa';
// export default function NewProduct() {
// 	const [inputs, setInputs] = useState({
// 		type: 'simple',
// 		title: '',
// 		desc: '',
// 		title_ar: '',
// 		desc_ar: '',
// 		price: '',
// 		originalPrice: '',
// 		categories: [],
// 		width: '',
// 		height: '',
// 		length: '',
// 		weight: '',
// 		discount: {
// 			startDate: '',
// 			endDate: '',
// 			discount: '',
// 		},
// 		promo: {
// 			code: '',
// 			startDate: '',
// 			endDate: '',
// 		},
// 	});
// 	const [color1, setColor1] = useState([]);
// 	const [color2, setColor2] = useState([]);
// 	const [color3, setColor3] = useState([]);
// 	const [color4, setColor4] = useState([]);
// 	const [color5, setColor5] = useState([]);
// 	const [color6, setColor6] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [draggedFile, setDraggedFile] = useState(null);
// 	const [forms, setForms] = useState([
// 		{ file: null, color: '', size: '', quantity: '' },
// 	]);
// 	const colorPickerRef = useRef(null);
// 	const DEFAULT_IMAGE_URL = 'https://img.icons8.com/ios/100/no-image.png';
// 	const dispatch = useDispatch();
// 	const supplierInfo = useSelector((state) => state.user.currentUser);

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		if (name.startsWith('discount.') || name.startsWith('promo.')) {
// 			const [field, key] = name.split('.');
// 			setInputs((prev) => ({
// 				...prev,
// 				[field]: {
// 					...prev[field],
// 					[key]: value,
// 				},
// 			}));
// 		} else {
// 			setInputs((prev) => ({
// 				...prev,
// 				[name]: value,
// 			}));
// 		}
// 	};
// 	const handleDragEnter = (e) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 	};
// 	const handleDragLeave = (e) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 	};
// 	const handleDragOver = (e) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 	};
// 	const handleDrop = (e, index) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		setDraggedFile(false);
// 		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
// 			const file = e.dataTransfer.files[0];
// 			handleFormChange(index, 'file', {
// 				target: {
// 					files: e.dataTransfer.files,
// 				},
// 			});
// 			e.dataTransfer.clearData();
// 		}
// 	};
// 	const defaultColor = '#FFFFFF';
// 	useEffect(() => {
// 		function startup() {
// 			colorPickerRef.current = document.querySelectorAll('#color-picker');
// 			colorPickerRef.current.forEach((picker, index) => {
// 				picker.addEventListener('input', () => updateColor(index));
// 				picker.value = defaultColor;
// 			});
// 		}
// 		startup();
// 	}, [defaultColor]);
// 	function updateColor(index) {
// 		const color = colorPickerRef.current[index].value;
// 		const setColor = eval(`setColor${index + 1}`);
// 		setColor(() => [color]);
// 	}
// 	const colorPickerClear = document.querySelectorAll('#color-picker');
// 	const clearColor = (e, colorIndex) => {
// 		e.preventDefault();
// 		const colorSetters = [
// 			setColor1,
// 			setColor2,
// 			setColor3,
// 			setColor4,
// 			setColor5,
// 			setColor6,
// 		];
// 		colorSetters[colorIndex]([]);
// 		colorPickerClear[colorIndex].value = defaultColor;
// 	};
// 	const isObjectComplete = (obj) => Object.values(obj).every((value) => value);
// 	const isObjectPartiallyFilled = (obj) =>
// 		Object.values(obj).some((value) => value);
// 	const showError = (title, text) => {
// 		swal({ title, text, icon: 'error' });
// 	};
// 	const handleAddProduct = async (e) => {
// 		e.preventDefault();
// 		const requiredInputs = [
// 			'title',
// 			'desc',
// 			'title_ar',
// 			'desc_ar',
// 			'price',
// 			'categories',
// 			'width',
// 			'height',
// 			'length',
// 			'weight',
// 		];
// 		const hasAllRequiredInputs = requiredInputs.every(
// 			(field) => inputs[field],
// 		);
// 		if (!hasAllRequiredInputs) {
// 			showError('Error!', 'Please fill all the required fields');
// 			return;
// 		}
// 		const promoComplete = isObjectComplete(inputs.promo);
// 		const promoPartiallyFilled = isObjectPartiallyFilled(inputs.promo);
// 		if (promoPartiallyFilled && !promoComplete) {
// 			showError(
// 				'Incomplete Promo Details',
// 				'Please complete all fields for the promo code or remove the partial information.',
// 			);
// 			return;
// 		}
// 		const discountComplete = isObjectComplete(inputs.discount);
// 		const discountPartiallyFilled = isObjectPartiallyFilled(inputs.discount);
// 		if (discountPartiallyFilled && !discountComplete) {
// 			showError(
// 				'Incomplete Discount Details',
// 				'Please complete all fields for the discount or remove the partial information.',
// 			);
// 			return;
// 		}
// 		setLoading(true);
// 		const minimumLoadingPromise = new Promise((resolve) =>
// 			setTimeout(resolve, 1000),
// 		);
// 		try {
// 			const storage = getStorage(app);
// 			const uploadPromises = forms.map((form) =>
// 				uploadVariantImage(storage, form),
// 			);
// 			const [variants] = await Promise.all([
// 				Promise.all(uploadPromises),
// 				minimumLoadingPromise,
// 			]);
// 			const product = constructProduct(inputs, variants, supplierInfo);
// 			swal({
// 				title: 'Success',
// 				text: 'Product added successfully',
// 				icon: 'success',
// 				closeOnClickOutside: false,
// 				closeOnEsc: false,
// 			}).then(setLoading(false), resetAllForms);
// 			await addProduct(product, dispatch);
// 		} catch (error) {
// 			showError('Error', error.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};
// 	const uploadVariantImage = async (storage, form) => {
// 		const fileSingle = form.file || null;
// 		const fileName =
// 			new Date().getTime() +
// 			(fileSingle ? fileSingle.name : 'default_image');
// 		const storageRef = ref(storage, fileName);

// 		if (fileSingle) {
// 			try {
// 				const resizedImage = await new Promise((resolve, reject) => {
// 					Resizer.imageFileResizer(
// 						fileSingle,
// 						900,
// 						650,
// 						'WEBP',
// 						100,
// 						0,
// 						(uri) => {
// 							resolve(uri);
// 						},
// 						'blob',
// 					);
// 				});
// 				const uploadTask = uploadBytesResumable(storageRef, resizedImage);
// 				await uploadTask;
// 				const url = await getDownloadURL(uploadTask.snapshot.ref);
// 				return createVariant(form, [url]);
// 			} catch (error) {
// 				console.error('Error uploading file: ', error);
// 				throw error;
// 			}
// 		}
// 		return createVariant(form, [DEFAULT_IMAGE_URL]);
// 	};
// 	const createVariant = (form, images) => ({
// 		img: images[0],
// 		img_large: images[1],
// 		color: [form.color],
// 		size: [form.size],
// 		quantity: form.quantity,
// 	});
// 	const constructProduct = (inputs, variants, supplierInfo) => {
// 		let productData = {
// 			...inputs,
// 			variants,
// 			...(isObjectComplete(inputs.discount) && {
// 				discount: inputs.discount,
// 			}),
// 			...(isObjectComplete(inputs.promo) && { promo: inputs.promo }),
// 			supplierId: supplierInfo._id,
// 		};
// 		return productData;
// 	};
// 	const resetAllForms = () => {
// 		resetInputs();
// 		resetColors();
// 		resetColorPickers();
// 		resetFormFields();
// 		resetCheckboxes();
// 	};
// 	const resetInputs = () => {
// 		setInputs({
// 			title: '',
// 			desc: '',
// 			title_ar: '',
// 			desc_ar: '',
// 			price: '',
// 			originalPrice: '',
// 			categories: [],
// 			width: '',
// 			height: '',
// 			length: '',
// 			weight: '',
// 			discount: { startDate: '', endDate: '', discount: '' },
// 			promo: { code: '', startDate: '', endDate: '' },
// 		});
// 	};
// 	const resetColors = () => {
// 		const colors = [color1, color2, color3, color4, color5, color6];
// 		colors.forEach((color) => {
// 			color.length = 0;
// 		});
// 	};
// 	const resetColorPickers = () => {
// 		colorPickerClear.forEach((picker) => {
// 			picker.value = defaultColor;
// 		});
// 	};
// 	const resetFormFields = () => {
// 		const formFields = document.querySelectorAll(
// 			'.Title, .Description, .Price, .OriginalPrice, .Categories, .Quantity, .Width, .Height, .Length, .Weight, .expirationDate1, .expirationDate2, .price',
// 		);
// 		formFields.forEach((field) => {
// 			field.value = '';
// 		});
// 	};
// 	const resetCheckboxes = () => {
// 		const checkboxes = document.querySelectorAll('.Size');
// 		checkboxes.forEach((checkbox) => {
// 			checkbox.checked = false;
// 		});
// 	};
// 	const addNewForm = () => {
// 		setForms((prevForms) => [
// 			...prevForms,
// 			{ file: null, color: '', size: '', quantity: '' },
// 		]);
// 	};
// 	const removeForm = (indexToRemove) => {
// 		setForms((prevForms) =>
// 			prevForms.filter((form, index) => index !== indexToRemove),
// 		);
// 	};
// 	const handleFormChange = (index, field, event) => {
// 		let value = field === 'file' ? event.target.files[0] : event;
// 		setForms((prevForms) => {
// 			const newForms = [...prevForms];
// 			newForms[index][field] = value;
// 			return newForms;
// 		});
// 	};
// 	return (
// 		<div
// 			className='newProduct'
// 			onDragEnter={handleDragEnter}
// 			onDragLeave={handleDragLeave}
// 			onDragOver={handleDragOver}
// 			onDrop={handleDrop}>
// 			{loading ? (
// 				<div className='progress-icon'>
// 					<FaSpinner className='spinner' />
// 				</div>
// 			) : (
// 				<div className='newProduct'>
// 					<h1 className='addProductTitle'>New Product</h1>
// 					{forms.map((form, index) => (
// 						<form
// 							key={index}
// 							className='addProductForm addProductForm147 '
// 							encType='multipart/form-data'>
// 							<div className='divition1'>
// 								<div className='addProductItem'>
// 									<label>Image</label>
// 									<input
// 										type='file'
// 										id={`file-${index}`}
// 										onChange={(event) =>
// 											handleFormChange(index, 'file', event)
// 										}
// 										multiple
// 										style={{ display: 'none' }}
// 									/>

// 									<div
// 										className='file-dragndrop'
// 										onDragEnter={() => setDraggedFile(true)}
// 										onDragLeave={() => setDraggedFile(false)}
// 										onDragOver={(e) => e.preventDefault()}
// 										onDrop={(e) => handleDrop(e, index)}>
// 										{draggedFile ? (
// 											<p>Drop your file here</p>
// 										) : (
// 											<>
// 												<p>Drag and drop your files here or</p>
// 												<label
// 													className='browse'
// 													htmlFor={`file-${index}`}>
// 													browse
// 												</label>
// 											</>
// 										)}
// 									</div>
// 								</div>

// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Title*</label>
// 										<input
// 											name='title'
// 											className='Title'
// 											type='text'
// 											placeholder='Apple Airpods'
// 											onChange={handleChange}
// 										/>
// 									</div>
// 								)}

// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Description*</label>
// 										<input
// 											name='desc'
// 											className='Description'
// 											type='text'
// 											placeholder='description...'
// 											onChange={handleChange}
// 										/>
// 									</div>
// 								)}

// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Title (Arabic)*</label>
// 										<input
// 											name='title_ar'
// 											type='text'
// 											placeholder='Title in Arabic'
// 											onChange={handleChange}
// 										/>
// 									</div>
// 								)}
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Description (Arabic)*</label>
// 										<input
// 											name='desc_ar'
// 											type='text'
// 											placeholder='Description in Arabic'
// 											onChange={handleChange}
// 										/>
// 									</div>
// 								)}
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<fieldset>
// 											<legend>Size*</legend>

// 											{supplierInfo.role !== 'supplierType1' &&
// 											supplierInfo.role !== 'supplierType2' ? (
// 												<>
// 													<input
// 														type='radio'
// 														className='Size'
// 														name='size'
// 														onChange={(event) =>
// 															handleFormChange(
// 																index,
// 																'size',
// 																event.target.value,
// 															)
// 														}
// 														value='S'
// 													/>
// 													<label> S</label>
// 													<br />
// 													<input
// 														type='radio'
// 														className='Size'
// 														name='size'
// 														onChange={(event) =>
// 															handleFormChange(
// 																index,
// 																'size',
// 																event.target.value,
// 															)
// 														}
// 														value='M'
// 													/>
// 													<label> M</label>
// 													<br />
// 													<input
// 														type='radio'
// 														className='Size'
// 														name='size'
// 														onChange={(event) =>
// 															handleFormChange(
// 																index,
// 																'size',
// 																event.target.value,
// 															)
// 														}
// 														value='L'
// 													/>
// 													<label> L</label>
// 													<br />
// 													<input
// 														type='radio'
// 														className='Size'
// 														name='size'
// 														onChange={(event) =>
// 															handleFormChange(
// 																index,
// 																'size',
// 																event.target.value,
// 															)
// 														}
// 														value='XL'
// 													/>
// 													<label> XL</label>
// 													<br />
// 													<input
// 														type='radio'
// 														name='size'
// 														onChange={(event) =>
// 															handleFormChange(
// 																index,
// 																'size',
// 																event.target.value,
// 															)
// 														}
// 														value='XXL'
// 														className='Size'
// 													/>
// 													<label> XXL</label>
// 													<br />
// 												</>
// 											) : (
// 												<>
// 													<input
// 														type='radio'
// 														className='Size'
// 														name='size'
// 														onChange={(event) =>
// 															handleFormChange(
// 																index,
// 																'size',
// 																event.target.value,
// 															)
// 														}
// 														value='200ml'
// 													/>
// 													<label>200 ml</label>
// 													<br />
// 													<input
// 														type='radio'
// 														className='Size'
// 														name='size'
// 														onChange={(event) =>
// 															handleFormChange(
// 																index,
// 																'size',
// 																event.target.value,
// 															)
// 														}
// 														value='500ml'
// 													/>
// 													<label>500 ml</label>
// 													<br />
// 												</>
// 											)}
// 										</fieldset>
// 									</div>
// 								)}
// 								{index < 1 && supplierInfo.role === 'superAdmin' && (
// 									<div className='addProductItem color'>
// 										<label>Color*</label>
// 										<br />
// 										<input
// 											id='color-picker'
// 											name='color1'
// 											type='color'
// 											onChange={(event) =>
// 												handleFormChange(
// 													index,
// 													'color',
// 													event.target.value,
// 												)
// 											}
// 										/>
// 									</div>
// 								)}
// 								{index < 1 && supplierInfo.role === 'superAdmin' && (
// 									<div className='addProductItem'>
// 										<button onClick={(e) => clearColor(e, index)}>
// 											Clear The Color
// 										</button>
// 									</div>
// 								)}
// 							</div>
// 							<div className='divition2'>
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Discount Start Date</label>
// 										<input
// 											name='discount.startDate'
// 											type='date'
// 											onChange={handleChange}
// 										/>
// 									</div>
// 								)}
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Discount End Date</label>
// 										<input
// 											name='discount.endDate'
// 											type='date'
// 											onChange={handleChange}
// 										/>
// 									</div>
// 								)}
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Discount</label>
// 										<input
// 											name='discount.discount'
// 											type='number'
// 											onChange={handleChange}
// 										/>
// 									</div>
// 								)}
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Price*</label>
// 										<input
// 											name='price'
// 											type='number'
// 											placeholder='100'
// 											onChange={handleChange}
// 											className='Price'
// 										/>
// 									</div>
// 								)}
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Original Price</label>
// 										<input
// 											name='originalPrice'
// 											type='number'
// 											placeholder='100'
// 											onChange={handleChange}
// 											className='OriginalPrice'
// 										/>
// 									</div>
// 								)}
// 							</div>
// 							<div className='divition2'>
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Promo Code</label>
// 										<input
// 											name='promo.code'
// 											type='text'
// 											onChange={handleChange}
// 										/>
// 									</div>
// 								)}
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Promo Start Date</label>
// 										<input
// 											name='promo.startDate'
// 											type='date'
// 											onChange={handleChange}
// 										/>
// 									</div>
// 								)}
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Promo End Date</label>
// 										<input
// 											name='promo.endDate'
// 											type='date'
// 											onChange={handleChange}
// 										/>
// 									</div>
// 								)}
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Categories*</label>
// 										<select
// 											name='categories'
// 											onChange={handleChange}
// 											className='Categories'>
// 											<option value=''>Select Categories</option>
// 											<option value='coat'>Coat</option>
// 											<option value='women'>Women</option>
// 											<option value='jeans'>Jeans</option>
// 										</select>
// 									</div>
// 								)}
// 								{index < 1 && (
// 									<div className='addProductItem'>
// 										<label>Quantity*</label>
// 										<input
// 											name='quantity'
// 											type='number'
// 											placeholder='1'
// 											onChange={(event) =>
// 												handleFormChange(
// 													index,
// 													'quantity',
// 													event.target.value,
// 												)
// 											}
// 											className='Quantity'
// 										/>
// 									</div>
// 								)}
// 							</div>
// 							{
// 								<div className='divition2 divition221'>
// 									{index !== 0 && (
// 										<button
// 											onClick={() => removeForm(index)}
// 											className='closeFormButton'>
// 											<span className='close-icon'>&times;</span>
// 										</button>
// 									)}
// 									{index < 1 && (
// 										<div className='addProductItem'>
// 											<label>Product Width*</label>
// 											<input
// 												name='width'
// 												type='number'
// 												placeholder='200'
// 												onChange={handleChange}
// 												className='Width'
// 											/>
// 										</div>
// 									)}
// 									{index < 1 && (
// 										<div className='addProductItem'>
// 											<label>Product Height*</label>
// 											<input
// 												name='height'
// 												type='number'
// 												placeholder='200'
// 												onChange={handleChange}
// 												className='Height'
// 											/>
// 										</div>
// 									)}
// 									{index < 1 && (
// 										<div className='addProductItem'>
// 											<label>Product Length*</label>
// 											<input
// 												name='length'
// 												type='number'
// 												placeholder='200'
// 												onChange={handleChange}
// 												className='Length'
// 											/>
// 										</div>
// 									)}
// 									{index < 1 && (
// 										<div className='addProductItem'>
// 											<label>Product Weight*</label>
// 											<input
// 												name='weight'
// 												type='number'
// 												placeholder='200'
// 												onChange={handleChange}
// 												className='Weight'
// 											/>
// 										</div>
// 									)}
// 									{index === forms.length - 1 && (
// 										<div
// 											className='addNewForm'
// 											onClick={addNewForm}>
// 											+
// 										</div>
// 									)}
// 									{index === forms.length - 1 && (
// 										<button
// 											onClick={handleAddProduct}
// 											className='addProductButton'>
// 											Create
// 										</button>
// 									)}
// 								</div>
// 							}
// 						</form>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// }
import { useEffect, useState, useRef } from 'react';
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
import Resizer from 'react-image-file-resizer';
import { FaSpinner } from 'react-icons/fa';

export default function NewProduct() {
	const [inputs, setInputs] = useState({
		type: 'simple',
		title: '',
		desc: '',
		title_ar: '',
		desc_ar: '',
		price: '',
		originalPrice: '',
		categories: [],
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
	const [variants, setVariants] = useState([{ key: '', value: '' }]);
	const [categoryInput, setCategoryInput] = useState('');
	const DEFAULT_IMAGE_URL = 'https://img.icons8.com/ios/100/no-image.png';
	const dispatch = useDispatch();
	const supplierInfo = useSelector((state) => state.user.currentUser);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name.startsWith('discount.') || name.startsWith('promo.')) {
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
			'price',
			'categories',
			'width',
			'height',
			'length',
			'weight',
		];
		const hasAllRequiredInputs = requiredInputs.every(
			(field) => inputs[field],
		);

		if (!hasAllRequiredInputs) {
			showError('Error!', 'Please fill all the required fields');
			return;
		}

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
					? variants.map((variant) => {
							const fileName = `${new Date().getTime()}_${variant.key}_${
								variant.value
							}`;
							const storageRef = ref(storage, fileName);
							return uploadBytesResumable(storageRef, inputs.file);
					  })
					: [];

			const [uploadedVariants] = await Promise.all([
				Promise.all(uploadPromises),
				minimumLoadingPromise,
			]);

			const variantsData =
				inputs.type === 'variable'
					? await Promise.all(
							uploadedVariants.map((uploadTask) =>
								getDownloadURL(uploadTask.ref).then((url) => ({
									key: uploadTask.metadata.name.split('_')[1],
									value: uploadTask.metadata.name.split('_')[2],
									image: url,
								})),
							),
					  )
					: [];

			const product = constructProduct(inputs, variantsData, supplierInfo);

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
			...(inputs.type === 'variable' && {
				variants: variants.map((variant) => ({
					key: variant.key,
					value: variant.value,
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
			price: '',
			originalPrice: '',
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
		newVariants[index][field] = value;
		setVariants(newVariants);
	};

	const addVariant = () => {
		setVariants([...variants, { key: '', value: '' }]);
	};

	const removeVariant = (index) => {
		const newVariants = [...variants];
		newVariants.splice(index, 1);
		setVariants(newVariants);
	};

	const handleCategoryChange = (e) => {
		setCategoryInput(e.target.value);
	};

	const addCategory = () => {
		if (categoryInput.trim() !== '') {
			setInputs((prev) => ({
				...prev,
				categories: [...prev.categories, categoryInput.trim()],
			}));
			setCategoryInput('');
		}
	};

	const removeCategory = (category) => {
		setInputs((prev) => ({
			...prev,
			categories: prev.categories.filter((cat) => cat !== category),
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
										placeholder='Value'
										value={variant.value}
										onChange={(e) =>
											handleVariantChange(
												index,
												'value',
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
						</div>
					)}
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
							<label>Title (Arabic)*</label>
							<input
								name='title_ar'
								type='text'
								placeholder='Title in Arabic'
								onChange={handleChange}
							/>
						</div>
						<div className='addProductItem'>
							<label>Description (Arabic)*</label>
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
						<div className='addProductItem'>
							<label>Price*</label>
							<input
								name='price'
								type='number'
								placeholder='100'
								onChange={handleChange}
								className='Price'
							/>
						</div>
						<div className='addProductItem'>
							<label>Original Price</label>
							<input
								name='originalPrice'
								type='number'
								placeholder='100'
								onChange={handleChange}
								className='OriginalPrice'
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
								{inputs.categories.map((category) => (
									<div
										key={category}
										className='categoryItem'>
										<span>{category}</span>
										<button onClick={() => removeCategory(category)}>
											Remove
										</button>
									</div>
								))}
								<div className='addCategoryItem'>
									<input
										type='text'
										placeholder='Add Category'
										value={categoryInput}
										onChange={handleCategoryChange}
									/>
									<button onClick={addCategory}>Add</button>
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
