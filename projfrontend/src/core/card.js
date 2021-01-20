import React, { useState, useEffect } from "react";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";

const Card = ({
  product,
  addtocart = true,
  removefromcart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [count, setCount] = useState(product.count);
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };
  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const cartTitles = product ? product.name : "Default name";
  const cartDescription = product
    ? product.description
    : "Default Description ";
  const cartPrice = product ? product.price : "Default Price";

  const showAddToCart = (addtocart) => {
    return (
      addtocart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removefromcart) => {
    return (
      removefromcart && (
        <button
          onClick={() => {
            removeItemFromCart(product.id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitles}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">{cartPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtocart)}</div>
          <div className="col-12">{showRemoveFromCart(removefromcart)}</div>
        </div>
      </div>
    </div>
  );
};
export default Card;
