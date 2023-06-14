import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../helpers/product";
import MyAccountService from "../../../services/MyAccountService";
import { useState } from "react";
import { useEffect } from "react";

const MenuCart = ({ cartData, currency, deleteFromCart }) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const [cartItemList, setCartItemList] = useState([])


  const fetchCartItem = () => {
    MyAccountService.getCartItem()
    .then((response)=> {
      console.log(response.data)
      setCartItemList(response.data)
      
    })
    .catch((error) => {
      console.error("Lỗi khi lấy thông tin cartItem :", error);
    })
  }
  useEffect(() => {
    fetchCartItem();
  }, []);
  return (
    <div className="shopping-cart-content">
      {cartItemList && cartItemList.length > 0 ? (
        <Fragment>
          <ul>
            {cartItemList.map((single, key) => {
              const discountedPrice = getDiscountPrice(
                single.flower.price,
                single.flower.discount
              );
              const finalProductPrice = (
                single.flower.price * currency.currencyRate
              ).toFixed(2);
              const finalDiscountedPrice = (
                discountedPrice * currency.currencyRate
              ).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + single.flower.id}>
                      <img
                        alt=""
                        src={process.env.PUBLIC_URL + single.flower.image[0]}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={process.env.PUBLIC_URL + "/product/" + single.flower.id}
                      >
                        {" "}
                        {single.flower.name}{" "}
                      </Link>
                    </h4>
                    <h6>Số lượng : {single.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ?  + finalDiscountedPrice + "VND"
                        :  + finalProductPrice+ "VND"}
                    </span>
                    
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => deleteFromCart(single.flower, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Tổng cộng :{" "}
              <span className="shop-total">
                { + cartTotalPrice + "VND"}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              Xem giỏ hàng
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
             Thanh toán
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">Không có sản phẩm nào trong giỏ hàng</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func
};

export default MenuCart;
