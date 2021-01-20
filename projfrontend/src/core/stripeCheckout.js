import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Pay with stripe</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user.id;
  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const errorMessage = (err) => {};

  return (
    <div>
      <h3 className="text-white">Stripe checkout {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};
export default StripeCheckout;
