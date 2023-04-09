import { useState } from "react";
import "./newUser.css";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

export default function NewUser() {
	const [inputs, setInputs] = useState({});
	let [file, setFile] = useState(null);
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	const handleClick = (e) => {
		e.preventDefault();
		if (file === null) {
			swal("Please upload an image");
			return;
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
					const user = { ...inputs, img: downloadURL };
					console.log(user);
					const regex =
						/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (!regex.test(user.email)) {
						swal(
							"Warning",
							"Email is not valid , please enter a valid email",
							"warning",
						);
						return;
					}
					const passRegex =
						/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
					if (!passRegex.test(user.password)) {
						swal(
							"Warning",
							"Password is not valid , please enter at least 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
							"warning",
						);
						return;
					}
					user.email = user.email.toLowerCase();
					addUser(user, dispatch);
					swal({
						title: "Success",
						text: "User added successfully",
						icon: "success",
						button: "Ok",
						closeOnClickOutside: false,
						closeOnEsc: false,
					}).then(() => {
						setInputs({
							username: "",
							email: "",
							password: "",
							img: "",
							isAdmin: false,
						});
						setFile(null);
						file = null;
						document.querySelector("#file").value = "";
						document.querySelector(".Email").value = "";
						document.querySelector(".Password").value = "";
						document.querySelector(".IsAdmin").value = "no";
						document.querySelector(".Username").value = "";
					});
				});
			},
		);
	};
	return (
		<div className="newUser">
			<h1 className="newUserTitle">New User</h1>
			<form className="newUserForm">
				<div className="newUserItem">
					<label>Image</label>
					<input
						type="file"
						id="file"
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</div>
				<div className="newUserItem">
					<label>Username</label>
					<input
						id="username"
						className="Username"
						name="username"
						type="text"
						placeholder="john"
						onChange={handleChange}
					/>
				</div>
				{/* <div className="newUserItem">
					<label>Full Name</label>
					<input type="text" placeholder="John Smith" />
				</div> */}
				<div className="newUserItem">
					<label>Email</label>
					<input
						name="email"
						type="email"
						placeholder="john@gmail.com"
						onChange={handleChange}
						className="Email"
						id="email"
					/>
				</div>
				<div className="newUserItem">
					<label>Password</label>
					<input
						name="password"
						type="password"
						placeholder="password"
						onChange={handleChange}
						className="Password"
						id="password"
					/>
				</div>
				{/* <div className="newUserItem">
					<label>Phone</label>
					<input type="text" placeholder="+1 123 456 78" />
				</div>
				<div className="newUserItem">
					<label>Address</label>
					<input type="text" placeholder="New York | USA" />
				</div> */}
				{/* <div className="newUserItem">
					<label>Gender</label>
					<div className="newUserGender">
						<input type="radio" name="gender" id="male" value="male" />
						<label for="male">Male</label>
						<input type="radio" name="gender" id="female" value="female" />
						<label for="female">Female</label>
						<input type="radio" name="gender" id="other" value="other" />
						<label for="other">Other</label>
					</div>
				</div> */}
				<div className="newUserItem">
					<label>Admin?</label>
					<select
						defaultValue={"no"}
						className="IsAdmin newUserSelect"
						name="isAdmin"
						id="isAdmin"
						onChange={handleChange}
					>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<button onClick={handleClick} className="newUserButton">
					Create
				</button>
			</form>
		</div>
	);
}
