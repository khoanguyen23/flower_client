import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import BoardUser from "../BoardUser";
import BoardModerator from "../BoardModerator";
import BoardAdmin from "../BoardAdmin";
import AuthService from "../../services/auth.service";


import EventBus from "../../common/EventBus";
import MyAccountService from "../../services/MyAccountService";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  deleteFromCart,
  iconWhiteClass,
}) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [cartItemList, setCartItemList] = useState('')


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
  // useEffect(() => {
  //   fetchCartItem();
  // }, []);

  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    // console.log(user.roles)

    if (user) {
      setCurrentUser(user);
      fetchCartItem();
    }
    

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    localStorage.removeItem("userShipping");
  localStorage.removeItem("userPayment");

    setCurrentUser(undefined);
  };

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Tìm kiếm..." />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
        {currentUser ? (
          <div>
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  Tài khoản của tôi
                </Link>
              </li>
              <li>
                {/* <a href="/home-flower-shop">Log out</a> */}
                <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
              </li>
            </ul>
          </div>
          ) : (
          <div>
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login"}>
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/register"}  >
                  Đăng ký
                </Link>
              </li>
            </ul>
          </div>
           )}
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareData && compareData.length ? compareData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItemList && cartItemList.length ? cartItemList.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}  
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
