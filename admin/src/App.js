import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
import Forgot from "./pages/forgot/Forgot";
import Reset from "../../api/reset/Reset";

import Transactions from "./pages/transactions/Transactions";
import Analytics from "./pages/Analytics/Analytics";
import "./components/style/dark.scss";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  const { darkMode } = useContext(DarkModeContext);

  const admin = true;
  return (
    <Router>
      <Switch>
        <Route path="/forgot">
          <Forgot />
        </Route>
        {/* <Route path="/reset">
          <Reset />
        </Route> */}

        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        {admin && (
          <div className={darkMode ? "app dark" : "app"}>
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
              <Route path="/transactions">
                <Transactions />
              </Route>
              <Route path="/analytics">
                <Analytics />
              </Route>
            </div>
          </div>
        )}
      </Switch>
    </Router>
  );
}

export default App;
