import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css';
import Home from './pages/home/Home';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import Forgot from './pages/forgot/Forgot';
import Transactions from './pages/transactions/Transactions';
import Analytics from './pages/Analytics/Analytics';
import Register from './pages/register/Register';
import './components/style/dark.scss';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { DarkModeContext } from './context/darkModeContext';
import { TokenValidator } from './redux/apiCalls';
import React from 'react';
function App() {
	const admin = useSelector((state) => state.user?.currentUser?.isAdmin);
	const { darkMode } = useContext(DarkModeContext);
	const logOut = () => {
		localStorage.removeItem('persist:root');
		window.location.href = '/login';
	};
	return (
		<div className={darkMode ? 'app dark' : 'app'}>
			<Router>
				<Route path='/login'>
					{admin ? <Redirect to='/' /> : <Login />}
				</Route>
				<Route path='/register'>
					<Register />
				</Route>
				{admin ? (
					<>
						<Topbar />
						<div className='container'>
							<Sidebar />
							<Switch>
								<TokenValidator logOut={logOut}>
									<Route
										exact
										path='/'
									>
										<Home />
									</Route>
									<Route path='/users'>
										<UserList />
									</Route>
									<Route path='/user/:userId'>
										<User />
									</Route>
									<Route path='/newUser'>
										<NewUser />
									</Route>
									<Route path='/products'>
										<ProductList />
									</Route>
									<Route path='/product/:productId'>
										<Product />
									</Route>
									<Route path='/newproduct'>
										<NewProduct />
									</Route>
									<Route path='/transactions'>
										<Transactions />
									</Route>
									<Route path='/analytics'>
										<Analytics />
									</Route>
								</TokenValidator>
							</Switch>
						</div>
					</>
				) : (
					<Redirect to='/login' />
				)}
				<Route path='/forgot'>
					<Forgot />
				</Route>
			</Router>
		</div>
	);
}
export default App;
