import Product from './pages/Product';
import OfferProducts from './pages/OfferProducts';
// import Poffer from "./components/Poffer"
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import Forgot from './pages/forgot/Forgot';
import Cart from './pages/Cart';
import OrderHave from './pages/HaveOrder';
import Wishlist from './pages/Wishlist';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import './components/style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { TokenValidator } from './redux/apiCalls';
import VerifyEmail from './pages/VerifyEmail';
const App = () => {
	const user = useSelector((state) => state.user.currentUser);
	const { darkMode } = useContext(DarkModeContext);
	const logOut = () => {
		localStorage.removeItem('persist:root');
		window.location.href = '/login';
	};
	return (
		<div className={darkMode ? 'app dark' : 'app'}>
			<Router>
				<Switch>
					<TokenValidator logOut={logOut}>
						<Route path='/forgot'>
							<Forgot />
						</Route>
						<Route path='/verifyEmail'>
							<VerifyEmail />
						</Route>
						<Route
							exact
							path='/'>
							<Home />
						</Route>
						<Route path='/products/:category'>
							<ProductList />
						</Route>
						<Route path='/product/:id'>
							<Product />
						</Route>
						<Route path='/offer/:category'>
							<OfferProducts />
						</Route>
						<Route path='/orderHave'>
							<OrderHave />
						</Route>
						<Route path='/wishList'>
							<Wishlist />
						</Route>
						<Route path='/cart'>
							<Cart />
						</Route>
						<Route path='/success'>
							<Success />
						</Route>
						<Route path='/login'>
							{user ? <Redirect to='/' /> : <Login />}
						</Route>
						<Route path='/register'>
							{user ? <Redirect to='/' /> : <Register />}
						</Route>
					</TokenValidator>
				</Switch>
			</Router>
		</div>
	);
};
export default App;
