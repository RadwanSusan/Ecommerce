import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Offer from "./pages/offerList/OfferList";
import OfferUser from "./pages/OfferUser/OfferUser";
import CreateOffer from "./pages/CreateOffer/CreateOffer";
import Login from "./pages/login/Login";

function App() {
	// const admin = useSelector((state) => state.user.currentUser.isAdmin);
	const admin = true;
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				{admin && (
					<>
						<Topbar />
						<div className="container">
							<Sidebar />
							<Route exact path="/">
								<Home />
							</Route>
							<Route path="/users">
								<UserList />
							</Route>
							<Route path="/user/:userId">
								<User />
							</Route>
							<Route path="/newUser">
								<NewUser />
							</Route>
							<Route path="/products">
								<ProductList />
							</Route>
							<Route path="/product/:productId">
								<Product />
							</Route>
							<Route path="/newproduct">
								<NewProduct />
							</Route>
							<Route exact path="/offer">
								<Offer />
							</Route>
							<Route path="/offer/:offerId">
								<OfferUser />
							</Route>
							<Route path="/createOffer">
								<CreateOffer />
							</Route>
						</div>
					</>
				)}
			</Switch>
		</Router>
	);
}

export default App;
