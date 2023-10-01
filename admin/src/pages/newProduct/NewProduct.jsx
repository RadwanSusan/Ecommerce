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
	const [draggedFile, setDraggedFile] = useState(null);
	// const [forms, setForms] = useState([{}]);
	const [forms, setForms] = useState([
		{ file: null, color: null, size: null, quantity: null },
	]);

	const colorPickerRef = useRef(null);
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	const handleCat = (e) => {
		setCat(e.target.value.split(','));
	};
	const addSize = (e) => {
		setSize((prev) => {
			return [...prev, e.target.value];
		});
	};

	const handleFiles = (event) => {
		if (event.target.files.length > 0) {
			setFile([...event.target.files]);
			setDraggedFile(null);
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

	/**
	 * The function `handleAddProduct` is an asynchronous function that handles the process of adding a
	 * product, including validating inputs, uploading images, and saving the product data.
	 * @returns The function does not explicitly return anything.
	 */
	const handleAddProduct = async (e) => {
		e.preventDefault();

		// if (file.length === 0) {
		// 	swal('Error', 'Please select an image', 'info');
		// 	return;
		// }

		// if (!cat.length) {
		// 	swal('Error', 'Please select at least one category', 'info');
		// 	return;
		// }

		// if (!size.length) {
		// 	swal('Error', 'Please select at least one size', 'info');
		// 	return;
		// }

		const storage = getStorage(app);
		const variants = [];
		for (const fileSingle of file) {
			const fileName = new Date().getTime() + fileSingle.name;
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, fileSingle);

			try {
				await uploadTask;
				const url = await getDownloadURL(uploadTask.snapshot.ref);
				const variant = {
					img: [url], // Update this line to use an array with a single element
					color: [color1], // Update this line to use an array with a single element
					size: [size[0]], // Update this line to use an array with a single element
					quantity: inputs.quantity, // Assuming inputs.quantity corresponds to this image
				};

				variants.push(variant);
			} catch (error) {
				swal('Error', error.message, 'error');
				return;
			}
		}

		// Add additional variants dynamically based on user selections
		const additionalVariants = [];

		for (let i = 0; i < forms.length; i++) {
			const variant = {
				img: [file[i]], // Update this line to use an array with a single element
				color: [color1[i]], // Update this line to use an array with a single element
				size: [size[i]], // Update this line to use an array with a single element
				quantity: inputs.quantity[i], // Assuming selectedQuantities corresponds to this variant
			};

			additionalVariants.push(variant);
		}

		variants.push(...additionalVariants);

		const product = {
			...inputs,
			variants,
			categories: cat,
		};

		try {
			await addProduct(product, dispatch);
			swal({
				title: 'Success',
				text: 'Product added successfully',
				icon: 'success',
				button: 'Ok',
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
		}
	};

	const resetInputs = () => {
		setInputs({
			title: '',
			desc: '',
			price: '',
			originalPrice: '',
			img: '',
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
		setForms((prevForms) => [...prevForms, {}]);
	};

	const removeForm = (indexToRemove) => {
		setForms((prevForms) =>
			prevForms.filter((form, index) => index !== indexToRemove),
		);
	};

	const handleFormChange = (index, field, value) => {
		setForms((prevForms) => {
			const newForms = [...prevForms];
			newForms[index][field] = value;
			return newForms;
		});
	};

	return (
		<div
			className='newProduct'
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<div className='newProduct'>
				<h1 className='addProductTitle'>New Product</h1>
				{forms.map((form, index) => (
					<form
						key={index}
						className='addProductForm'
						enctype='multipart/form-data'
					>
						<div className='divition1'>
							<div className='addProductItem'>
								<label>Image</label>
								<input
									type='file'
									id='file'
									// onChange={handleFiles()}
									onChange={(event) =>
										handleFormChange(
											index,
											'file',
											event.target.files[0],
										)
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
							<div className='addProductItem'>
								<label>Title</label>
								<input
									name='title'
									className='Title'
									type='text'
									placeholder='Apple Airpods'
									disabled={index !== 0}
									onChange={handleChange}
								/>
							</div>
							<div className='addProductItem'>
								<label>Description</label>
								<input
									name='desc'
									className='Description'
									type='text'
									placeholder='description...'
									onChange={handleChange}
									disabled={index !== 0}
								/>
							</div>
							<div className='addProductItem'>
								<fieldset>
									<legend>Size</legend>
									<input
										type='radio'
										className='Size'
										name='size'
										// onClick={addSize}
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
										// onClick={addSize}
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
										// onClick={addSize}
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
										// onClick={addSize}
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
										// onClick={addSize}
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
								<button onClick={clearColor}>Clear All Colors</button>
							</div>
						</div>
						<div className='divition2'>
							<div className='addProductItem'>
								<label>Price</label>
								<input
									name='price'
									type='number'
									placeholder='100'
									onChange={handleChange}
									className='Price'
									disabled={index !== 0}
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
									disabled={index !== 0}
								/>
							</div>
							<div className='addProductItem'>
								<label>Categories</label>
								<select
									name='categories'
									// onChange={handleCat}
									onChange={(event) =>
										handleFormChange(
											index,
											'size',
											event.target.value,
										)
									}
									className='Categories'
									disabled={index !== 0}
								>
									<option value=''>Select Categories</option>
									<option value='coat'>Coat</option>
									<option value='women'>Women</option>
									<option value='jeans'>Jeans</option>
								</select>
							</div>
							<div className='addProductItem'>
								<label>Quantity</label>
								<input
									name='quantity'
									type='number'
									placeholder='1'
									onChange={handleChange}
									className='Quantity'
								/>
							</div>
						</div>
						<div className='divition2'>
							<div className='addProductItem'>
								<label>Product Width</label>
								<input
									name='width'
									type='number'
									placeholder='200'
									onChange={handleChange}
									className='Width'
									disabled={index !== 0}
								/>
							</div>
							<div className='addProductItem'>
								<label>Product Height</label>
								<input
									name='height'
									type='number'
									placeholder='200'
									onChange={handleChange}
									className='Height'
									disabled={index !== 0}
								/>
							</div>
							<div className='addProductItem'>
								<label>Product Length</label>
								<input
									name='length'
									type='number'
									placeholder='200'
									onChange={handleChange}
									className='Length'
									disabled={index !== 0}
								/>
							</div>
							<div className='addProductItem'>
								<label>Product Weight</label>
								<input
									name='weight'
									type='number'
									placeholder='200'
									onChange={handleChange}
									className='Weight'
									disabled={index !== 0}
								/>
							</div>
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
							{/* <button
								onClick={handleAddProduct}
								className='addProductButton'
							>
								Create
							</button>
							<div
								className='addNewForm'
								onClick={addNewForm}
							>
								+
							</div> */}
						</div>
					</form>
				))}
			</div>
		</div>
	);
}
