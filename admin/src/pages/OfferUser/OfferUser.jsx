import { useLocation } from 'react-router-dom';
import './offerUser.css';
import Chart from '../../components/chart/Chart';
import { Publish } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { updateOffer } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { Add } from '@material-ui/icons';
export default function OfferUser() {
	const location = useLocation();
	const offerId = location.pathname.split('/')[2];
	const [oStats, setOStats] = useState([]);
	const [file, setFile] = useState([]);
	const dispatch = useDispatch();
	const [pStats, setPStats] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(null);

	const offer = useSelector((state) =>
		state.offer.offer.find((offer) => offer._id === offerId),
	);
	const [size, setSize] = useState([...offer.size]);
	const colorArrayUpdate = [];
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
	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await userRequest.get('orders/income?pid=' + offerId);
				const list = res.data.sort((a, b) => {
					return a._id - b._id;
				});
				list.map((item) => {
					setPStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], Sales: item.total },
					]);
					setOStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], Sales: item.total },
					]);
				});
			} catch (err) {
				swal('Error', err.message, 'error');
			}
		};
		getStats();
	}, [offerId, MONTHS]);

	const [offerUpdateData, setOfferUpdateData] = useState({
		title: offer.title,
		desc: offer.desc,
		price: offer.price,
		inStock: offer.inStock,
		img: offer.img,
		categories: offer.categories,
		size: offer.size,
		color: offer.color,
		height: offer.height,
		width: offer.width,
		quantity: offer.quantity,
		weight: offer.weight,
		length: offer.lengthN,
	});

	const handleUpdate = (e) => {
		setOfferUpdateData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let fileName;
		if (file !== null || file !== []) {
			fileName = file.name;
		}
		if (file === null || file === []) {
			if (
				document.querySelector('.PTitle').value === '' &&
				document.querySelector('.PDesc').value === '' &&
				document.querySelector('.PPrice').value === '' &&
				document.querySelector('.PoriginalPrice').value === '' &&
				document.querySelector('.PWeight').value === '' &&
				document.querySelector('.PHeight').value === '' &&
				document.querySelector('.PWidth').value === '' &&
				document.querySelector('.PQuantity').value === '' &&
				document.querySelector('.PLength').value === '' &&
				document.querySelector('.PDateStart').value === '' &&
				document.querySelector('.PDateEnd').value === ''
			) {
				swal('Info', 'Please update atleast one feild!', 'info');
				return;
			}
			if (
				offerUpdateData.title === '' ||
				offerUpdateData.desc === '' ||
				offerUpdateData.price === '' ||
				offerUpdateData.inStock === ''
			) {
				swal('Info', 'Please make an update in one of the feilds!', 'info');
				return;
			}
			try {
				if (document.querySelector('.color-picker1.haveColor')) {
					colorArrayUpdate.push(
						document.querySelector('.color-picker1').value,
					);
				}
				if (document.querySelector('.color-picker2.haveColor')) {
					colorArrayUpdate.push(
						document.querySelector('.color-picker2').value,
					);
				}
				if (document.querySelector('.color-picker3.haveColor')) {
					colorArrayUpdate.push(
						document.querySelector('.color-picker3').value,
					);
				}
				if (document.querySelector('.color-picker4.haveColor')) {
					colorArrayUpdate.push(
						document.querySelector('.color-picker4').value,
					);
				}
				if (document.querySelector('.color-picker5.haveColor')) {
					colorArrayUpdate.push(
						document.querySelector('.color-picker5').value,
					);
				}
				if (document.querySelector('.color-picker6.haveColor')) {
					colorArrayUpdate.push(
						document.querySelector('.color-picker6').value,
					);
				}
				if (document.querySelector('.SizeS.haveSize')) {
					sizeArrayUpdate.push('S');
				}
				if (document.querySelector('.SizeM.haveSize')) {
					sizeArrayUpdate.push('M');
				}
				if (document.querySelector('.SizeL.haveSize')) {
					sizeArrayUpdate.push('L');
				}
				if (document.querySelector('.SizeXL.haveSize')) {
					sizeArrayUpdate.push('XL');
				}
				if (document.querySelector('.SizeXXL.haveSize')) {
					sizeArrayUpdate.push('XXL');
				}
				const color = colorArrayUpdate;
				const size = sizeArrayUpdate;
				const offer = {
					...offerUpdateData,
					img: offerUpdateData.img.map((imgUrl, i) =>
						i === currentIndex ? downloadURL : imgUrl,
					),
					size,
					color,
				};
				updateOffer(offerId, offer, dispatch);
				setFile([]);
				setCurrentIndex(null);
				swal('Offer Updated', '', 'success');
			} catch (err) {
				swal('Error', err.message, 'error');
			}
		} else {
			fileName = new Date().getTime() + file.name;
			const storage = getStorage(app);
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

					switch (snapshot.state) {
						case 'paused':
							break;
						case 'running':
							break;
						default:
					}
				},
				(error) => {
					swal('Error', error.message, 'error');
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						try {
							if (document.querySelector('.color-picker1.haveColor')) {
								colorArrayUpdate.push(
									document.querySelector('.color-picker1').value,
								);
							}
							if (document.querySelector('.color-picker2.haveColor')) {
								colorArrayUpdate.push(
									document.querySelector('.color-picker2').value,
								);
							}
							if (document.querySelector('.color-picker3.haveColor')) {
								colorArrayUpdate.push(
									document.querySelector('.color-picker3').value,
								);
							}
							if (document.querySelector('.color-picker4.haveColor')) {
								colorArrayUpdate.push(
									document.querySelector('.color-picker4').value,
								);
							}
							if (document.querySelector('.color-picker5.haveColor')) {
								colorArrayUpdate.push(
									document.querySelector('.color-picker5').value,
								);
							}
							if (document.querySelector('.color-picker6.haveColor')) {
								colorArrayUpdate.push(
									document.querySelector('.color-picker6').value,
								);
							}
							if (document.querySelector('.SizeS.haveSize')) {
								sizeArrayUpdate.push('S');
							}
							if (document.querySelector('.SizeM.haveSize')) {
								sizeArrayUpdate.push('M');
							}
							if (document.querySelector('.SizeL.haveSize')) {
								sizeArrayUpdate.push('L');
							}
							if (document.querySelector('.SizeXL.haveSize')) {
								sizeArrayUpdate.push('XL');
							}
							if (document.querySelector('.SizeXXL.haveSize')) {
								sizeArrayUpdate.push('XXL');
							}
							const color = colorArrayUpdate;
							const size = sizeArrayUpdate;
							const offer = {
								...offerUpdateData,
								img: offerUpdateData.img.map((imgUrl, i) =>
									i === currentIndex ? downloadURL : imgUrl,
								),

								size,
								color,
							};
							updateOffer(offerId, offer, dispatch);
							setFile([]);
							setCurrentIndex(null);
							swal('Offer Updated', '', 'success');
						} catch (err) {
							swal('Error', err.message, 'error');
						}
					});
				},
			);
		}
	};

	useEffect(() => {
		offer.size.map((item) => {
			if (item === 'S') {
				document.querySelector('.SizeS').checked = true;
				document.querySelector('.SizeS').classList.add('haveSize');
			} else if (item === 'M') {
				document.querySelector('.SizeM').checked = true;
				document.querySelector('.SizeM').classList.add('haveSize');
			} else if (item === 'L') {
				document.querySelector('.SizeL').checked = true;
				document.querySelector('.SizeL').classList.add('haveSize');
			} else if (item === 'XL') {
				document.querySelector('.SizeXL').checked = true;
				document.querySelector('.SizeXL').classList.add('haveSize');
			} else if (item === 'XXL') {
				document.querySelector('.SizeXXL').checked = true;
				document.querySelector('.SizeXXL').classList.add('haveSize');
			}
			return null;
		});
	}, [offer.size]);
	useEffect(() => {
		if (offer.color[0] !== undefined) {
			document.querySelector('.color-picker1').classList.add('haveColor');
			document.querySelector('.color-picker1').value = offer.color[0];
		}
		if (offer.color[1] !== undefined) {
			document.querySelector('.color-picker2').classList.add('haveColor');
			document.querySelector('.color-picker2').value = offer.color[1];
		}
		if (offer.color[2] !== undefined) {
			document.querySelector('.color-picker3').classList.add('haveColor');
			document.querySelector('.color-picker3').value = offer.color[2];
		}
		if (offer.color[3] !== undefined) {
			document.querySelector('.color-picker4').classList.add('haveColor');
			document.querySelector('.color-picker4').value = offer.color[3];
		}
		if (offer.color[4] !== undefined) {
			document.querySelector('.color-picker5').classList.add('haveColor');
			document.querySelector('.color-picker5').value = offer.color[4];
		}
		if (offer.color[5] !== undefined) {
			document.querySelector('.color-picker6').classList.add('haveColor');
			document.querySelector('.color-picker6').value = offer.color[5];
		}
		return null;
	}, [offer.color]);
	const addSize = (e) => {
		if (e.target.classList.contains('haveSize')) {
			e.target.classList.remove('haveSize');
		} else {
			e.target.classList.add('haveSize');
		}
		setSize((prev) => {
			return [...prev, e.target.value];
		});
	};
	const haveColor = (e) => {
		if (e === 'color-picker1') {
			document.querySelector('.color-picker1').classList.add('haveColor');
		}
		if (e === 'color-picker2') {
			document.querySelector('.color-picker2').classList.add('haveColor');
		}
		if (e === 'color-picker3') {
			document.querySelector('.color-picker3').classList.add('haveColor');
		}
		if (e === 'color-picker4') {
			document.querySelector('.color-picker4').classList.add('haveColor');
		}
		if (e === 'color-picker5') {
			document.querySelector('.color-picker5').classList.add('haveColor');
		}
		if (e === 'color-picker6') {
			document.querySelector('.color-picker6').classList.add('haveColor');
		}
	};
	//   console.log(offer.quantity);
	//   if (offer.quantity === 0) {
	//   	offer.inStock = false;
	//   }
	if (offerUpdateData.quantity > 0) {
		offerUpdateData.inStock = true;
	} else {
		offerUpdateData.inStock = false;
	}
	return (
		<div className='product'>
			<div className='divition1'>
				<div className='productTitleContainer'>
					<h1 className='productTitle'>Offer</h1>
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
								src={offer.img}
								alt=''
								className='productInfoImg'
							/>
							<span className='productName'>{offer.title}</span>
						</div>
						<div className='allDiviti'>
							<div className='productInfoBottom'>
								<div className='productInfoItem'>
									<span className='productInfoKey'>Offer ID:</span>
									<span className='productInfoValue'>
										{' '}
										{offer._id}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>Offer name:</span>
									<span className='productInfoValue'>
										{offer.title}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>
										Offer description:
									</span>
									<span className='productInfoValue productInfoValue2'>
										{offer.desc}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>sales:</span>
									<span className='productInfoValue'>0</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>in stock:</span>
									<span className='productInfoValue'>
										{offer.inStock.toString()}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>Size:</span>
									<ul className='productInfoValue'>
										{offer.size.map((item, currentIndex) => (
											<li key={currentIndex}>{item}</li>
										))}
									</ul>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>Color:</span>
									<ul className='productInfoValue'>
										{offer.color.map((item, currentIndex) => (
											<li key={currentIndex}>{item}</li>
										))}
									</ul>
								</div>
							</div>
							<div className='diviti'>
								<div className='productInfoItem'>
									<span className='productInfoKey'>
										OriginalPrice:
									</span>
									<span className='productInfoValue'>
										{offer.originalPrice}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>Price:</span>
									<span className='productInfoValue'>
										{offer.price}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>
										Quantity Available:
									</span>
									<span className='productInfoValue'>
										{offer.quantity}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>offer Start:</span>
									<span className='productInfoValue'>
										{offer.timeStart}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>offer End:</span>
									<span className='productInfoValue'>
										{offer.timeEnd}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>Width:</span>
									<span className='productInfoValue'>
										{offer.width}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>Height:</span>
									<span className='productInfoValue'>
										{offer.height}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>Length:</span>
									<span className='productInfoValue'>
										{offer.length}
									</span>
								</div>
								<div className='productInfoItem'>
									<span className='productInfoKey'>Weight:</span>
									<span className='productInfoValue'>
										{offer.weight}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='productBottom'>
				<form className='productForm'>
					<div className='productFormLeft'>
						<label>Product Name</label>
						<input
							className='PTitle'
							type='text'
							name='title'
							placeholder={offer.title}
							onChange={handleUpdate}
						/>
						<label>Product Description</label>
						<textarea
							className='PDesc'
							type='text'
							name='desc'
							placeholder={offer.desc}
							onChange={handleUpdate}
						/>
						<label>Original Price</label>
						<input
							className='PPrice'
							type='number'
							name='originalPrice'
							placeholder={offer.originalPrice}
							onChange={handleUpdate}
						/>
						<label>Price</label>
						<input
							className='PoriginalPrice'
							type='number'
							name='price'
							placeholder={offer.price}
							onChange={handleUpdate}
						/>
						<label>In Stock</label>
						<select
							className='PStock'
							name='inStock'
							id='idStock'
							onChange={handleUpdate}
						>
							<option value='true'>Yes</option>
							<option value='false'>No</option>
						</select>
						<label>Width</label>
						<input
							className='PWidth'
							type='number'
							name='width'
							placeholder={offer.width}
							onChange={handleUpdate}
						/>
						<label>Height</label>
						<input
							className='PHeight'
							type='number'
							name='height'
							placeholder={offer.height}
							onChange={handleUpdate}
						/>
						<label>Weight</label>
						<input
							className='PWeight'
							type='number'
							name='weight'
							placeholder={offer.weight}
							onChange={handleUpdate}
						/>
						<label>Length</label>
						<input
							className='PLength'
							type='number'
							name='length'
							placeholder={offer.length}
							onChange={handleUpdate}
						/>
					</div>
					<div className='productFormRight'>
						<label>Quantity</label>
						<input
							className='PQuantity'
							type='number'
							name='quantity'
							placeholder={offer.quantity}
							onChange={handleUpdate}
						/>
						<label>Offer Start</label>
						<input
							className='PDateStart'
							type='date'
							name='timeStart'
							placeholder={offer.timeStart}
							onChange={handleUpdate}
						/>
						<label>Offer End</label>
						<input
							className='PDateEnd'
							type='date'
							name='timeEnd'
							placeholder={offer.timeEnd}
							onChange={handleUpdate}
						/>
						<fieldset>
							<legend>Size</legend>
							<input
								type='checkbox'
								className='SizeS'
								name='size'
								value='S'
								onClick={addSize}
							/>
							<label> S</label>
							<br />
							<input
								type='checkbox'
								className='SizeM'
								name='size'
								value='M'
								onClick={addSize}
							/>
							<label> M</label>
							<br />
							<input
								type='checkbox'
								className='SizeL'
								name='size'
								value='L'
								onClick={addSize}
							/>
							<label> L</label>
							<br />
							<input
								type='checkbox'
								className='SizeXL'
								name='size'
								value='XL'
								onClick={addSize}
							/>
							<label> XL</label>
							<br />
							<input
								type='checkbox'
								className='SizeXXL'
								name='size'
								value='XXL'
								onClick={addSize}
							/>
							<label> XXL</label>
							<br />
						</fieldset>
						<br />
						<div className='addProductItem color'>
							<label>Color</label>
							<br />
							<input
								id='color-picker1'
								class='color-picker1'
								name='color1'
								type='color'
								onInput={() => {
									haveColor('color-picker1');
								}}
							/>
							<input
								id='color-picker2'
								class='color-picker2'
								name='color1'
								type='color'
								onInput={() => {
									haveColor('color-picker2');
								}}
							/>
							<input
								id='color-picker3'
								class='color-picker3'
								name='color1'
								type='color'
								onInput={() => {
									haveColor('color-picker3');
								}}
							/>
							<input
								id='color-picker4'
								class='color-picker4'
								name='color1'
								type='color'
								onInput={() => {
									haveColor('color-picker4');
								}}
							/>
							<input
								id='color-picker5'
								class='color-picker5'
								name='color1'
								type='color'
								onInput={() => {
									haveColor('color-picker5');
								}}
							/>
							<input
								id='color-picker6'
								class='color-picker6'
								name='color1'
								type='color'
								onInput={() => {
									haveColor('color-picker6');
								}}
							/>
						</div>
					</div>
					<div className='productFormRight'>
						<div className='productUpload'>
							{offer.img.map((imgUrl, currentIndex) => (
								<div key={currentIndex}>
									<img
										src={imgUrl}
										alt={offer.title}
										className='productUploadImg'
									/>
									<label for={`file${currentIndex}`}>
										<Publish />
									</label>
									<input
										type='file'
										id={`file${currentIndex}`}
										style={{ display: 'none' }}
										onChange={(e) => {
											setFile(e.target.files[0]);
											setCurrentIndex(currentIndex); // update the index state
										}}
									/>
								</div>
							))}
						</div>

						<button
							className='productButton'
							onClick={handleSubmit}
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
