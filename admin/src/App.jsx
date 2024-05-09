import React, { useContext } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DarkModeContext } from './context/darkModeContext';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
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
import './App.css';
import './components/style/dark.scss';
function App() {
	const userRole = useSelector((state) => state.user?.currentUser?.role);
	const { darkMode } = useContext(DarkModeContext);
	return (
		<div className={darkMode ? 'app dark' : 'app'}>
			<Router>
				<Switch>
					<Route
						path='/login'
						render={() =>
							userRole ? (
								<Redirect
									to={userRole === 'superAdmin' ? '/' : '/products'}
								/>
							) : (
								<Login />
							)
						}
					/>
					<Route
						path='/register'
						component={Register}
					/>
					<Route
						path='/forgot'
						component={Forgot}
					/>
					{userRole ? (
						<>
							<Topbar />
							<div className='container'>
								<Sidebar />
								<Switch>
									<Route
										exact
										path='/'
										component={Home}
									/>
									<Route
										path='/users'
										component={UserList}
									/>
									<Route
										path='/user/:userId'
										component={User}
									/>
									<Route
										path='/newUser'
										component={NewUser}
									/>
									<Route
										path='/products'
										component={ProductList}
									/>
									<Route
										path='/product/:productId'
										component={Product}
									/>
									<Route
										path='/newproduct'
										component={NewProduct}
									/>
									<Route
										path='/transactions'
										component={Transactions}
									/>
									<Route
										path='/analytics'
										component={Analytics}
									/>
								</Switch>
							</div>
						</>
					) : (
						<Redirect to='/login' />
					)}
				</Switch>
			</Router>
		</div>
	);
}
export default App;
