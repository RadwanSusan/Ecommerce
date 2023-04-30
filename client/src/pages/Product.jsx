import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import NavbarBottom from "../components/NavbarBottom";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import FooterNew from "../components/FooterNew";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { addProduct, getAllProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const Container = styled.div`
	user-select: none;
`;

const Wrapper = styled.div`
	padding: 50px;
	display: flex;
	${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
	flex: 1;
`;

const Image = styled.img`
	width: 90%;
	height: 70vh;
	object-fit: cover;
	${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
	flex: 1;
	padding: 0px 50px;
	${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
	font-weight: 200;
`;

const Desc = styled.p`
	margin: 20px 0px;
`;

const Price = styled.span`
	font-weight: 100;
	font-size: 40px;
`;

const FilterContainer = styled.div`
	width: 50%;
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	${mobile({ width: "100%" })}
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
`;

const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
`;

const FilterColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	cursor: pointer;
	margin-left: 10px;
	&:hover {
		outline: 3px solid #292931;
	}
	> * {
		&:first-child {
			outline: 3px solid #292931;
		}
	}
`;

const FilterSize = styled.select`
	margin-left: 10px;
	padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`;

const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
`;

const Button = styled.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	&:hover {
		background-color: #f8f4f4;
	}
`;

const Product = () => {
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");
	const [cart, setCart] = useState([]);
	const dispatch = useDispatch();
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	let userId = localStorage.getItem("persist:root");
	userId = JSON.parse(userId);
	userId = userId.user;
	userId = JSON.parse(userId);
	userId = userId?.currentUser?._id;
	useEffect(() => {
		const getProduct = async () => {
			try {
				let res = await publicRequest.get("/products/find/" + id);
				if (res.data == null) {
					res = await publicRequest.get("/offer/find/" + id);
				}
				setProduct(res.data);
			} catch {}
		};
		getProduct();
	}, [id]);
	// useEffect(() => {
	// 	const getCart = async () => {
	// 		try {
	// 			console.log(`🚀 ~ file: Product.jsx:164 ~ getCart ~ userId:`, userId);
	// 			useDispatch(getAllProduct(action));
	// 			let res = await userRequest.get("/carts/find/" + userId);
	// 			console.log(`🚀 ~ file: Product.jsx:166 ~ getCart ~ res:`, res);
	// 			setCart(res.data);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	getCart();
	// }, [userId]);
	document.querySelectorAll(".Color").forEach((item) =>
		item.addEventListener("click", (e) => {
			document.querySelectorAll(".Color").forEach((item2) => {
				item2.style.outline = "none";
			});
			e.target.style.outline = "3px solid #292931";
		}),
	);
	const handleQuantity = (type) => {
		if (type === "dec") {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			if (quantity >= product.quantity) {
				swal(
					"Info",
					"You have exceeded the number of available products!",
					"info",
				);
			} else {
				setQuantity(quantity + 1);
			}
		}
	};
	let cartProducts = JSON.parse(localStorage.getItem("persist:root"));
	cartProducts = cartProducts.cart;
	cartProducts = JSON.parse(cartProducts);
	const mergedCart = cartProducts.products.reduce((acc, curr) => {
		const existingItem = acc.find((item) => item._id === curr._id);
		if (existingItem) {
			existingItem.quantity += curr.quantity;
		} else {
			acc.push({ ...curr });
		}
		return acc;
	}, []);
	const chekAvail = () => {
		let newQuantity = mergedCart.map((item) => {
			if (item._id === product._id) {
				return {
					quantity: product.quantity - item.quantity,
				};
			}
		});
		newQuantity = newQuantity.filter((item) => item !== undefined);
		if (newQuantity.length > 0) {
			if (newQuantity[0].quantity < 1) {
				return false;
			} else {
				return true;
			}
		}
		return true;
	};
	const handleClick = () => {
		dispatch(addProduct({ ...product, quantity, color, size }));
		swal("Success", "Product added to cart!", "success");
		product.quantity -= quantity;
		if (product.quantity < 1) {
			document.querySelector(".AddCart").disabled = true;
		}
		setQuantity(1);
	};
	return (
		<Container>
			<Announcement />
			<Navbar />
			<NavbarBottom />
			<Wrapper>
				<ImgContainer>
					<Image src={product.img} />
				</ImgContainer>
				<InfoContainer>
					<Title>{product.title}</Title>
					<Desc>{product.desc}</Desc>
					<Price>$ {product.price}</Price>
					<FilterContainer>
						<Filter>
							<FilterTitle>Color : </FilterTitle>
							{product.color?.map((c) => (
								<FilterColor
									className="Color"
									color={c}
									key={c}
									onClick={() => setColor(c)}
								/>
							))}
						</Filter>
						<Filter>
							<FilterTitle>Size : </FilterTitle>
							<FilterSize onChange={(e) => setSize(e.target.value)}>
								{product.size?.map((s) => (
									<FilterSizeOption key={s}>{s}</FilterSizeOption>
								))}
							</FilterSize>
						</Filter>
					</FilterContainer>
					<AddContainer>
						<AmountContainer>
							<Remove onClick={() => handleQuantity("dec")} />
							<Amount>{quantity}</Amount>
							<Add onClick={() => handleQuantity("inc")} />
						</AmountContainer>
						{chekAvail() ? (
							<Button className="AddCart" onClick={handleClick}>
								ADD TO CART
							</Button>
						) : (
							<Button className="AddCart" disabled>
								ADD TO CART
							</Button>
						)}
					</AddContainer>
				</InfoContainer>
			</Wrapper>
			<Newsletter />
			<FooterNew />
			{/* <MobileMenu /> */}
		</Container>
	);
};

export default Product;
