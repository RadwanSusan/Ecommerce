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
	const [file, setFile] = useState(null);
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
					console.log({ ...inputs });
					const user = { ...inputs, img: downloadURL };
					addUser(user, dispatch);
					swal("User added successfully");
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
					/>
				</div>
				<div className="newUserItem">
					<label>Password</label>
					<input
						name="password"
						type="password"
						placeholder="password"
						onChange={handleChange}
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
						className="newUserSelect"
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
