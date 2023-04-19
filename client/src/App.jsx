import Product from "./pages/Product";
import OfferProducts from "./pages/OfferProducts";
// import Poffer from "./components/Poffer"
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import "./components/style/dark.scss";
import { useState } from "react";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";


const App = () => {

	const user = useSelector((state) => state.user.currentUser);
   const { darkMode } = useContext(DarkModeContext);


	return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products/:category">
            <ProductList />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/offer/:category">
            <OfferProducts />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
