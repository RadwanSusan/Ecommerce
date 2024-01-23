import { Link, useLocation } from 'react-router-dom';
import {
	CalendarToday,
	LocationSearching,
	MailOutline,
	PermIdentity,
	PhoneAndroid,
	Publish,
} from '@material-ui/icons';
import './user.css';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { updateUser } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
export default function User() {
	const location = useLocation();
	const userId = location.pathname.split('/')[2];
	const [file, setFile] = useState(null);
	const dispatch = useDispatch();
	const user = useSelector((state) =>
		state.userAll.usersAll.find((user) => user._id === userId),
	);
	const [userUpdate, setUserUpdate] = useState({
		username: user.username,
		email: user.email,
		isAdmin: user.isAdmin,
	});
	const handleUpdate = (e) => {
		setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let fileName;
		if (file !== null) {
			fileName = file.name;
		}
		if (file === null) {
			if (
				document.querySelector('.UserName').value == '' &&
				document.querySelector('.Email').value == '' &&
				document.querySelector('.IsAdmin').value == ''
			) {
				swal('Info', 'Please update atleast one feild!', 'info');
				return;
			}
			let updatedValue = e.currentTarget.value;
			if (updatedValue === 'true' || updatedValue == 'false') {
				updatedValue = JSON.parse(updatedValue);
			}
			const fileName = user.img;
			const formData = new FormData();
			formData.append('username', userUpdate.username);
			formData.append('email', userUpdate.email);
			formData.append('isAdmin', userUpdate.isAdmin);
			formData.append('img', fileName);
			try {
				const user = { ...userUpdate };
				if (
					!userUpdate.email.match(
						/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
					)
				) {
					swal('Warning', 'Invalid Email , Please try again!', 'warning');
					return;
				}
				updateUser(userId, user, dispatch);
				swal('User Updated', '', 'success');
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
						const formData = new FormData();
						formData.append('username', userUpdate.username);
						formData.append('email', userUpdate.email);
						formData.append('isAdmin', userUpdate.isAdmin);
						formData.append('img', downloadURL);
						try {
							const user = { ...userUpdate, img: downloadURL };
							if (
								!userUpdate.email.match(
									/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
								)
							) {
								swal('Error', 'Invalid Email', 'error');
								return;
							}
							updateUser(userId, user, dispatch);
							swal('User Updated', '', 'success');
						} catch (err) {
							swal('Error', err.message, 'error');
						}
					});
				},
			);
		}
	};
	return (
		<div className='user'>
			<div className='userTitleContainer'>
				<h1 className='userTitle'>Edit User</h1>
			</div>
			<div className='userContainer'>
				<div className='userShow'>
					<div className='userShowTop'>
						<img
							src={user.img}
							alt=''
							className='userShowImg'
						/>
						<div className='userShowTopTitle'>
							<span className='userShowUsername'>{user.username}</span>
						</div>
					</div>
					<div className='userShowBottom'>
						<span className='userShowTitle'>Account Details</span>
						<div className='userShowInfo'>
							<PermIdentity className='userShowIcon' />
							<span className='userShowInfoTitle'>{user.username}</span>
						</div>
						<span className='userShowTitle'>Contact Details</span>
						<div className='userShowInfo'>
							<MailOutline className='userShowIcon' />
							<span className='userShowInfoTitle'>{user.email}</span>
						</div>
						<div className='userShowInfo'>
							<PermIdentity className='userShowIcon' />
							<span className='userShowInfoTitle'>
								{' '}
								Admin : {user.isAdmin.toString()}
							</span>
						</div>
					</div>
				</div>
				<div className='userUpdate'>
					<span className='userUpdateTitle'>Edit</span>
					<form className='userUpdateForm'>
						<div className='userUpdateLeft'>
							<div className='userUpdateItem'>
								<label>Username</label>
								<input
									type='text'
									placeholder={user.username}
									className='userUpdateInput UserName'
									onChange={handleUpdate}
									name='username'
								/>
							</div>
							<div className='userUpdateItem'>
								<label>Email</label>
								<input
									type='email'
									placeholder={user.email}
									name='email'
									className='userUpdateInput Email'
									onChange={handleUpdate}
								/>
							</div>
							<div className='userUpdateItem'>
								<span>Admin:</span>
								<select
									defaultValue={'no'}
									name='isAdmin'
									id='isAdmin'
									onChange={handleUpdate}
									className='IsAdmin'>
									<option value='true'>Yes</option>
									<option value='false'>No</option>
								</select>
							</div>
						</div>
						<div className='userUpdateRight'>
							<div className='userUpdateUpload'>
								<img
									className='userUpdateImg'
									src={user.img}
									alt=''
								/>
								<label htmlFor='file'>
									<Publish className='userUpdateIcon' />
								</label>
								<input
									type='file'
									id='file'
									style={{ display: 'none' }}
									onChange={(e) => setFile(e.target.files[0])}
									name='file'
								/>
							</div>
							<button
								onClick={handleSubmit}
								className='userUpdateButton'>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
