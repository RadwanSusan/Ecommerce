import { useState } from "react";
import "./newProduct.css";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

export default function NewProduct() {
	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState(null);
	const [cat, setCat] = useState([]);
	const [size, setSize] = useState([]);
	const [color, setColor] = useState([]);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	const handleCat = (e) => {
		setCat(e.target.value.split(","));
	};
	const addSize = (e) => {
		setSize((prev) => {
			return [...prev, e.target.value];
		});
	};
	const handleColor = (e) => {
		setColor((prev) => {
			return [...prev, e.target.value];
		});
	};
	console.log(color);

	const handleClick = (e) => {
		e.preventDefault();
		if (file === null) {
			swal("Error", "Please select an image", "info");
			return;
		}
		if (cat.length === 0) {
			swal("Error", "Please select at least one category", "info");
			return;
		}
		if (size.length === 0) {
			swal("Error", "Please select at least one size", "info");
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
					const product = {
						...inputs,
						img: downloadURL,
						categories: cat,
						size: size,
						color: color,
					};
					console.log(product);
					addProduct(product, dispatch);
					swal("Success", "Product added successfully", "success");
				});
			},
		);
	};

	return (
		<div className="newProduct">
			<h1 className="addProductTitle">New Product</h1>
			<form className="addProductForm">
				<div className="addProductItem">
					<label>Image</label>
					<input
						type="file"
						id="file"
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</div>
				<div className="addProductItem">
					<label>Title</label>
					<input
						name="title"
						type="text"
						placeholder="Apple Airpods"
						onChange={handleChange}
					/>
				</div>
				<div className="addProductItem">
					<label>Description</label>
					<input
						name="desc"
						type="text"
						placeholder="description..."
						onChange={handleChange}
					/>
				</div>
				<div className="addProductItem">
					<fieldset>
						<legend>Size</legend>
						<input type="checkbox" name="size" onClick={addSize} value="S" />
						<label> S</label>
						<br />
						<input type="checkbox" name="size" onClick={addSize} value="M" />
						<label> M</label>
						<br />
						<input type="checkbox" name="size" onClick={addSize} value="L" />
						<label> L</label>
						<br />
						<input type="checkbox" name="size" onClick={addSize} value="XL" />
						<label> XL</label>
						<br />
						<input type="checkbox" name="size" onClick={addSize} value="XXL" />
						<label> XXL</label>
						<br />
					</fieldset>
				</div>
				<div className="addProductItem color">
					<label>Color</label>
					<br />
					<input name="color1" type="color" onChange={handleColor} />
					<input name="color2" type="color" onChange={handleColor} />
					<input name="color3" type="color" onChange={handleColor} />
				</div>
				<div className="addProductItem">
					<label>Price</label>
					<input
						name="price"
						type="number"
						placeholder="100"
						onChange={handleChange}
					/>
				</div>
				<div className="addProductItem">
					<label>Categories</label>
					<select name="categories" onChange={handleCat}>
						<option value="">Select Categories</option>
						<option value="women">Women</option>
						<option value="jeans">Jeans</option>
						<option value="coat">Coats</option>
					</select>
				</div>
				<div className="addProductItem">
					<label>Quantity</label>
					<input
						name="quantity"
						type="number"
						placeholder="1"
						onChange={handleChange}
					/>
				</div>
				<div className="addProductItem">
					<label>Product Width</label>
					<input
						name="width"
						type="number"
						placeholder="200"
						onChange={handleChange}
					/>
				</div>
				<div className="addProductItem">
					<label>Product Height</label>
					<input
						name="height"
						type="number"
						placeholder="200"
						onChange={handleChange}
					/>
				</div>
				<button onClick={handleClick} className="addProductButton">
					Create
				</button>
			</form>
		</div>
	);
}
