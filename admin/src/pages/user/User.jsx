import { Link, useLocation } from "react-router-dom";
import {
	CalendarToday,
	LocationSearching,
	MailOutline,
	PermIdentity,
	PhoneAndroid,
	Publish,
} from "@material-ui/icons";
import "./user.css";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function User() {
	const location = useLocation();
	const userId = location.pathname.split("/")[2];
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
		if (file === null) {
			swal("Please upload an image");
			return;
		}
		let updatedValue = e.currentTarget.value;

		if (updatedValue === "true" || updatedValue == "false") {
			updatedValue = JSON.parse(updatedValue);
		}
		const fileName = new Date().getTime() + file.name;
		const storage = getStorage(app);
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
				}
			},
			(error) => {},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					const formData = new FormData();
					formData.append("username", userUpdate.username);
					formData.append("email", userUpdate.email);
					formData.append("isAdmin", userUpdate.isAdmin);
					for (var pair of formData.entries()) {
						console.log(pair[0] + ", " + pair[1]);
					}
					try {
						const user = { ...userUpdate, img: downloadURL };
						updateUser(userId, user, dispatch);
						console.log(
							`🚀 ~ file: User.jsx:82 ~ getDownloadURL ~ user:`,
							user,
						);
						swal("User Updated Successfully");
					} catch (err) {
						console.log(err);
					}
				});
			},
		);
	};

	return (
		<div className="user">
			<div className="userTitleContainer">
				<h1 className="userTitle">Edit User</h1>
				
			</div>
			<div className="userContainer">
				<div className="userShow">
					<div className="userShowTop">
						<img src={user.img} alt="" className="userShowImg" />
						<div className="userShowTopTitle">
							<span className="userShowUsername">{user.username}</span>
						</div>
					</div>
					<div className="userShowBottom">
						<span className="userShowTitle">Account Details</span>
						<div className="userShowInfo">
							<PermIdentity className="userShowIcon" />
							<span className="userShowInfoTitle">{user.username}</span>
						</div>
						{/* <div className="userShowInfo">
							<CalendarToday className="userShowIcon" />
							<span className="userShowInfoTitle">10.12.1999</span>
						</div> */}
						<span className="userShowTitle">Contact Details</span>
						{/* <div className="userShowInfo">
							<PhoneAndroid className="userShowIcon" />
							<span className="userShowInfoTitle">+1 123 456 67</span>
						</div> */}
						<div className="userShowInfo">
							<MailOutline className="userShowIcon" />
							<span className="userShowInfoTitle">{user.email}</span>
						</div>
						<div className="userShowInfo">
							<PermIdentity className="userShowIcon" />
							<span className="userShowInfoTitle">
								{" "}
								Admin : {user.isAdmin.toString()}
							</span>
						</div>
						{/* <div className="userShowInfo">
							<LocationSearching className="userShowIcon" />
							<span className="userShowInfoTitle">New York | USA</span>
						</div> */}
					</div>
				</div>
				<div className="userUpdate">
					<span className="userUpdateTitle">Edit</span>
					<form className="userUpdateForm">
						<div className="userUpdateLeft">
							<div className="userUpdateItem">
								<label>Username</label>
								<input
									type="text"
									placeholder={user.username}
									className="userUpdateInput"
									onChange={handleUpdate}
									name="username"
								/>
							</div>
							{/* <div className="userUpdateItem">
								<label>Full Name</label>
								<input
									type="text"
									placeholder="Anna Becker"
									className="userUpdateInput"
								/>
							</div> */}
							<div className="userUpdateItem">
								<label>Email</label>
								<input
									type="email"
									placeholder={user.email}
									name="email"
									className="userUpdateInput"
									onChange={handleUpdate}
								/>
							</div>
							<div className="userUpdateItem">
								<span>Admin:</span>
								<select
									defaultValue={"no"}
									name="isAdmin"
									id="isAdmin"
									onChange={handleUpdate}
								>
									<option value="true">Yes</option>
									<option value="false">No</option>
								</select>
							</div>
							{/* <div className="userUpdateItem">
								<label>Phone</label>
								<input
									type="text"
									placeholder="+1 123 456 67"
									className="userUpdateInput"
								/>
							</div> */}
							{/* <div className="userUpdateItem">
								<label>Address</label>
								<input
									type="text"
									placeholder="New York | USA"
									className="userUpdateInput"
								/>
							</div> */}
						</div>
						<div className="userUpdateRight">
							<div className="userUpdateUpload">
								<img className="userUpdateImg" src={user.img} alt="" />
								<label htmlFor="file">
									<Publish className="userUpdateIcon" />
								</label>
								<input
									type="file"
									id="file"
									style={{ display: "none" }}
									onChange={(e) => setFile(e.target.files[0])}
									name="file"
								/>
							</div>
							<button onClick={handleSubmit} className="userUpdateButton">
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
