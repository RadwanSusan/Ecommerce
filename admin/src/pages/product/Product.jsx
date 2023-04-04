import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/apiCalls";
import swal from "sweetalert";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
export default function Product() {
	const location = useLocation();
	const productId = location.pathname.split("/")[2];
	const [pStats, setPStats] = useState([]);
	const dispatch = useDispatch();
	const [file, setFile] = useState(null);

	const product = useSelector((state) =>
		state.product.products.find((product) => product._id === productId),
	);

	const MONTHS = useMemo(
		() => [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Agu",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		[],
	);

	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await userRequest.get("orders/income");
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
				console.log(err);
			}
		};
		getStats();
	}, [productId, MONTHS]);

	const [productUpdateData, setProductUpdateData] = useState({
		title: product.title,
		desc: product.desc,
		price: product.price,
		inStock: product.inStock,
		img: product.img,
		categories: product.categories,
		size: product.size,
		color: product.color,
		
	});
	const handleUpdate = (e) => {
		setProductUpdateData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	const handleSubmit = async (e) => {
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
					const formData = new FormData();
					formData.append("title", productUpdateData.title);
					formData.append("desc", productUpdateData.desc);
					formData.append("price", productUpdateData.price);
					formData.append("inStock", productUpdateData.inStock);
					formData.append("img", downloadURL);
					try {
						const product = { ...productUpdateData, img: downloadURL };
						updateProduct(productId, product, dispatch);
						swal("Offer Updated", "", "success");
					} catch (err) {
						console.log(err);
					}
				});
			},
		);
	};

	return (
		<div className="product">
			<div className="productTitleContainer">
				<h1 className="productTitle">Product</h1>
				<Link to="/newproduct">
					<button className="productAddButton">Create</button>
				</Link>
			</div>
			<div className="productTop">
				<div className="productTopLeft">
					<Chart data={pStats} dataKey="Sales" title="Sales Performance" />
				</div>
				<div className="productTopRight">
					<div className="productInfoTop">
						<img src={product.img} alt="" className="productInfoImg" />
						<span className="productName">{product.title}</span>
					</div>
					<div className="productInfoBottom">
						<div className="productInfoItem">
							<span className="productInfoKey">id:</span>
							<span className="productInfoValue">{product._id}</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">sales:</span>
							<span className="productInfoValue">5123</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">in stock:</span>
							<span className="productInfoValue">
								{product.inStock.toString()}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="productBottom">
				<form className="productForm">
					<div className="productFormLeft">
						<label>Product Name</label>
						<input
							type="text"
							name="title"
							placeholder={product.title}
							onChange={handleUpdate}
						/>
						<label>Product Description</label>
						<input
							type="text"
							name="desc"
							placeholder={product.desc}
							onChange={handleUpdate}
						/>
						<label>Price</label>
						<input
							type="text"
							name="price"
							placeholder={product.price}
							onChange={handleUpdate}
						/>
						<label>In Stock</label>
						<select
							name="inStock"
							name="inStock"
							id="idStock"
							onChange={handleUpdate}
						>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
					</div>
					<div className="productFormRight">
						<div className="productUpload">
							<img src={product.img} alt="" className="productUploadImg" />
							<label for="file">
								<Publish />
							</label>
							<input
								type="file"
								id="file"
								style={{ display: "none" }}
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</div>
						<button className="productButton" onClick={handleSubmit}>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
