import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import ProductDescription from "./screens/ProductDescription";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Admin from "./screens/Admin";

export default function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const isPremium = currentUser ? currentUser.isPremium : false 

  return (
    <div className="App">
      <Navbar isPremium={isPremium} />
      <BrowserRouter>
        <Route path="/" component={Home} exact />
        <Route path="/product/:id" component={ProductDescription} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={() => <Profile isPremium={isPremium} />} />
        <Route path="/admin" component={Admin} />
      </BrowserRouter>
    </div>
  );
}
