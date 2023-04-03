import { Link, useLocation } from "react-router-dom";
import "./offerUser.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function OfferUser() {
	const location = useLocation();
	const offerId = location.pathname.split("/")[2];
	const [oStats, setOStats] = useState([]);

	const offer = useSelector((state) =>
		state.offer.offer.find((offer) => offer._id === offerId),
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

	// update offer
	const [offerUpdateData, setOfferUpdateData] = useState({
		title: offer.title,
		desc: offer.desc,
		price: offer.price,
		inStock: offer.inStock,
		img: offer.img,
	});
	const handleUpdate = (e) => {
		setOfferUpdateData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	console.log(offerUpdateData);
	const handleFile = (e) => {
		// setFile(e.target.files[0]);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		
	};

	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await userRequest.get("orders/income?pid=" + offerId);
				const list = res.data.sort((a, b) => {
					return a._id - b._id;
				});
				list.map((item) =>
					setOStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], Sales: item.total },
					]),
				);
			} catch (err) {
				console.log(err);
			}
		};
		getStats();
	}, [offerId, MONTHS]);
	return (
		<div className="product">
			<div className="productTitleContainer">
				<h1 className="productTitle">Offer</h1>
				<Link to="/createOffer">
					<button className="productAddButton">Create</button>
				</Link>
			</div>
			<div className="productTop">
				<div className="productTopLeft">
					<Chart data={oStats} dataKey="Sales" title="Sales Performance" />
				</div>
				<div className="productTopRight">
					<div className="productInfoTop">
						<img src={offer.img} alt="" className="productInfoImg" />
						<span className="productName">{offer.title}</span>
					</div>
					<div className="productInfoBottom">
						<div className="productInfoItem">
							<span className="productInfoKey">id:</span>
							<span className="productInfoValue">{offer.title}</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">sales:</span>
							<span className="productInfoValue">0</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">in stock:</span>
							<span className="productInfoValue">{offer.inStock}</span>
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
							placeholder={offer.title}
							onChange={handleUpdate}
						/>
						<label>Product Description</label>
						<input
							type="text"
							name="desc"
							placeholder={offer.desc}
							onChange={handleUpdate}
						/>
						<label>Price</label>
						<input
							type="text"
							name="price"
							placeholder={offer.price}
							onChange={handleUpdate}
						/>
						<label>In Stock</label>
						<select name="inStock" id="idStock" onChange={handleUpdate}>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
					<div className="productFormRight">
						<div className="productUpload">
							<img
								src={offer.img}
								alt={offer.title}
								className="productUploadImg"
							/>
							<label for="file">
								<Publish />
							</label>
							<input
								type="file"
								id="file"
								style={{ display: "none" }}
								onChange={handleFile}
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
