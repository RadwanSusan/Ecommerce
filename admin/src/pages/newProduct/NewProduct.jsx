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
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { FaSpinner } from 'react-icons/fa';
import { original } from '@reduxjs/toolkit';

export default function NewProduct() {
	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState([]);
	const [cat, setCat] = useState([]);
	const [size, setSize] = useState([]);
	const [color1, setColor1] = useState([]);
	const [color2, setColor2] = useState([]);
	const [color3, setColor3] = useState([]);
	const [color4, setColor4] = useState([]);
	const [color5, setColor5] = useState([]);
	const [color6, setColor6] = useState([]);
	const [loading, setLoading] = useState(false);
	const [draggedFile, setDraggedFile] = useState(null);
	const [forms, setForms] = useState([
		{ file: null, color: '', size: '', quantity: '' },
	]);
	const colorPickerRef = useRef(null);
	const [currentFile, setCurrentFile] = useState(null);

	const dispatch = useDispatch();
	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});

		if (e.target.name === 'file') {
			addNewForm();
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
		const file = e.dataTransfer.files;
		setFile([...file]);
		setDraggedFile(null);
	};

	const defaultColor = '#FFFFFF';

	useEffect(() => {
		function startup() {
			colorPickerRef.current = document.querySelectorAll('#color-picker');
			colorPickerRef.current.forEach((picker, index) => {
				picker.addEventListener('input', () => updateColor(index));
				picker.value = defaultColor;
			});
		}
		startup();
	}, [defaultColor]);

	function updateColor(index) {
		const color = colorPickerRef.current[index].value;
		const setColor = eval(`setColor${index + 1}`);
		setColor(() => [color]);
	}

	const colorPickerClear = document.querySelectorAll('#color-picker');

	const clearColor = (e) => {
		e.preventDefault();
		setColor1([]);
		setColor2([]);
		setColor3([]);
		setColor4([]);
		setColor5([]);
		setColor6([]);
		colorPickerClear.forEach((picker) => {
			picker.value = defaultColor;
		});
	};

	const handleAddProduct = async (e) => {
		e.preventDefault();
		if (forms.some((form) => form.file === null)) {
			swal({
				title: 'Error!',
				text: 'Please select a product image',
				icon: 'error',
				button: 'Ok',
			});
			return;
		}
		if (forms.some((form) => !form.size || !form.color || !form.quantity)) {
			swal({
				title: 'Error!',
				text: 'Please fill all the fields',
				icon: 'error',
				button: 'Ok',
			});
			return;
		}
		if (
			!inputs.title ||
			!inputs.desc ||
			!inputs.price ||
			!inputs.originalPrice ||
			!inputs.width ||
			!inputs.height ||
			!inputs.length ||
			!inputs.weight
		) {
			swal({
				title: 'Error!',
				text: 'Please fill all the fields',
				icon: 'error',
				button: 'Ok',
			});
			return;
		}

		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Actual message creation logic here
		// setLoading(false);

		const storage = getStorage(app);

		const uploadPromises = forms.map(async (form) => {
			const fileSingle = form.file || null;
			console.log(`🚀  file: NewProduct.jsx:125  fileSingle =>`, fileSingle);
			if (fileSingle) {
				const fileName = new Date().getTime() + fileSingle.name;
				const storageRef = ref(storage, fileName);
				const uploadTask = uploadBytesResumable(storageRef, fileSingle);

				try {
					await uploadTask;
					const url = await getDownloadURL(uploadTask.snapshot.ref);
					console.log(`File uploaded successfully. Download URL: ${url}`);

					return {
						img: [url],
						color: [form.color],
						size: [form.size],
						quantity: form.quantity,
					};
				} catch (error) {
					console.error('Error uploading file: ', error);
					throw error;
				}
			} else {
				console.error('No file to upload.');
				return {
					img: [],
					color: [form.color],
					size: [form.size],
					quantity: form.quantity,
				};
			}
		});
		try {
			const variants = await Promise.all(uploadPromises);
			const product = {
				...inputs,
				variants,
			};

			await addProduct(product, dispatch);
			swal({
				title: 'Success',
				text: 'Product added successfully',
				icon: 'success',
				closeOnClickOutside: false,
				closeOnEsc: false,
			}).then(() => {
				resetInputs();
				resetFile();
				resetCategory();
				resetSize();
				resetColors();
				resetColorPickers();
				resetFormFields();
				resetCheckboxes();
			});
		} catch (error) {
			swal('Error', error.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	const resetInputs = () => {
		setInputs({
			title: '',
			desc: '',
			price: '',
			originalPrice: '',
			img: [],
			categories: [],
			size: [],
			color: [],
			quantity: '',
			width: '',
			height: '',
			length: '',
			weight: '',
		});
	};

	const resetFile = () => {
		setFile([]);
	};

	const resetCategory = () => {
		setCat([]);
	};

	const resetSize = () => {
		setSize([]);
	};

	const resetColors = () => {
		const colors = [color1, color2, color3, color4, color5, color6];
		colors.forEach((color) => {
			color.length = 0;
		});
	};

	const resetColorPickers = () => {
		colorPickerClear.forEach((picker) => {
			picker.value = defaultColor;
		});
	};

	const resetFormFields = () => {
		const formFields = document.querySelectorAll(
			'.Title, .Description, .Price, .OriginalPrice, .Categories, .Quantity, .Width, .Height, .Length, .Weight, .expirationDate1, .expirationDate2, .price',
		);
		formFields.forEach((field) => {
			field.value = '';
		});
	};

	const resetCheckboxes = () => {
		const checkboxes = document.querySelectorAll('.Size');
		checkboxes.forEach((checkbox) => {
			checkbox.checked = false;
		});
	};

	const addNewForm = () => {
		setForms((prevForms) => [
			...prevForms,
			{ file: currentFile, color: '', size: '', quantity: '' },
		]);
	};

	const removeForm = (indexToRemove) => {
		setForms((prevForms) =>
			prevForms.filter((form, index) => index !== indexToRemove),
		);
	};

	const handleFormChange = (index, field, event) => {
		let value = event;
		setForms((prevForms) => {
			const newForms = [...prevForms];
			newForms[index][field] = value;
			return newForms;
		});
		if (field === 'file') {
			value = event.files[0];
			setCurrentFile(value);
		}
	};

	return (
		<div
			className='newProduct'
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			{loading ? (
				<div className='progress-icon'>
					<FaSpinner className='spinner' />
				</div>
			) : (
				<div className='newProduct'>
					<h1 className='addProductTitle'>New Product</h1>
					{forms.map((form, index) => (
						<form
							key={index}
							className='addProductForm'
							encType='multipart/form-data'
						>
							<div className='divition1'>
								<div className='addProductItem'>
									<label>Image</label>
									<input
										type='file'
										id='file'
										onChange={(event) =>
											handleFormChange(index, 'file', event.target)
										}
										multiple
										style={{ display: 'none' }}
									/>

									{index !== 0 && (
										<button
											onClick={() => removeForm(index)}
											className='closeFormButton'
										>
											x
										</button>
									)}
									<div
										className='file-dragndrop'
										onDragEnter={() => setDraggedFile(true)}
										onDragLeave={() => setDraggedFile(false)}
										onDragOver={(e) => e.preventDefault()}
										onDrop={() => setDraggedFile(false)}
									>
										{draggedFile ? (
											<p>Drop your file here</p>
										) : (
											<>
												<p>Drag and drop your files here or</p>
												<label
													className='browse'
													htmlFor='file'
												>
													browse
												</label>
											</>
										)}
									</div>
								</div>
								{index < 1 && (
									<div className='addProductItem'>
										<label>Title</label>
										<input
											name='title'
											className='Title'
											type='text'
											placeholder='Apple Airpods'
											onChange={handleChange}
										/>
									</div>
								)}
								{index < 1 && (
									<div className='addProductItem'>
										<label>Description</label>
										<input
											name='desc'
											className='Description'
											type='text'
											placeholder='description...'
											onChange={handleChange}
										/>
									</div>
								)}
								<div className='addProductItem'>
									<fieldset>
										<legend>Size</legend>
										<input
											type='radio'
											className='Size'
											name='size'
											onChange={(event) =>
												handleFormChange(
													index,
													'size',
													event.target.value,
												)
											}
											value='S'
										/>
										<label> S</label>
										<br />
										<input
											type='radio'
											className='Size'
											name='size'
											onChange={(event) =>
												handleFormChange(
													index,
													'size',
													event.target.value,
												)
											}
											value='M'
										/>
										<label> M</label>
										<br />
										<input
											type='radio'
											className='Size'
											name='size'
											onChange={(event) =>
												handleFormChange(
													index,
													'size',
													event.target.value,
												)
											}
											value='L'
										/>
										<label> L</label>
										<br />
										<input
											type='radio'
											className='Size'
											name='size'
											onChange={(event) =>
												handleFormChange(
													index,
													'size',
													event.target.value,
												)
											}
											value='XL'
										/>
										<label> XL</label>
										<br />
										<input
											type='radio'
											name='size'
											onChange={(event) =>
												handleFormChange(
													index,
													'size',
													event.target.value,
												)
											}
											value='XXL'
											className='Size'
										/>
										<label> XXL</label>
										<br />
									</fieldset>
								</div>
								<div className='addProductItem color'>
									<label>Color</label>
									<br />
									<input
										id='color-picker'
										name='color1'
										type='color'
										onChange={(event) =>
											handleFormChange(
												index,
												'color',
												event.target.value,
											)
										}
									/>
								</div>
								<div className='addProductItem'>
									<button onClick={clearColor}>
										Clear All Colors
									</button>
								</div>
							</div>
							<div className='divition2'>
								{index < 1 && (
									<div className='addProductItem'>
										<label>Price</label>
										<input
											name='price'
											type='number'
											placeholder='100'
											onChange={handleChange}
											className='Price'
										/>
									</div>
								)}
								{index < 1 && (
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
								)}
								{index < 1 && (
									<div className='addProductItem'>
										<label>Categories</label>
										<select
											name='categories'
											onChange={handleChange}
											className='Categories'
										>
											<option value=''>Select Categories</option>
											<option value='coat'>Coat</option>
											<option value='women'>Women</option>
											<option value='jeans'>Jeans</option>
										</select>
									</div>
								)}
								<div className='addProductItem'>
									<label>Quantity</label>
									<input
										name='quantity'
										type='number'
										placeholder='1'
										onChange={(event) =>
											handleFormChange(
												index,
												'quantity',
												event.target.value,
											)
										}
										className='Quantity'
									/>
								</div>
							</div>
							{
								<div className='divition2'>
									{index < 1 && (
										<div className='addProductItem'>
											<label>Product Width</label>
											<input
												name='width'
												type='number'
												placeholder='200'
												onChange={handleChange}
												className='Width'
											/>
										</div>
									)}
									{index < 1 && (
										<div className='addProductItem'>
											<label>Product Height</label>
											<input
												name='height'
												type='number'
												placeholder='200'
												onChange={handleChange}
												className='Height'
											/>
										</div>
									)}
									{index < 1 && (
										<div className='addProductItem'>
											<label>Product Length</label>
											<input
												name='length'
												type='number'
												placeholder='200'
												onChange={handleChange}
												className='Length'
											/>
										</div>
									)}
									{index < 1 && (
										<div className='addProductItem'>
											<label>Product Weight</label>
											<input
												name='weight'
												type='number'
												placeholder='200'
												onChange={handleChange}
												className='Weight'
											/>
										</div>
									)}
									{index === forms.length - 1 && (
										<div
											className='addNewForm'
											onClick={addNewForm}
										>
											+
										</div>
									)}
									{index === forms.length - 1 && (
										<button
											onClick={handleAddProduct}
											className='addProductButton'
										>
											Create
										</button>
									)}
								</div>
							}
						</form>
					))}
				</div>
			)}
		</div>
	);
}
