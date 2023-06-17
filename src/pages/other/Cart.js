import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";

import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart,
  updateCartItem,
  updateCartItemDecrease
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import MyAccountService from "../../services/MyAccountService";
import { useEffect } from "react";

const Cart = ({
  location,
  cartItems,
  currency,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart,
}) => {
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;
  let cartTotalPrice = 0;
  const [cartItemList, setCartItemList] = useState([]);
 
  console.log(cartItemList)
  cartItemList.forEach((item) => {
    const id = item.id;
    console.log(item)
   
    console.log(id); // In ra giá trị id của mỗi phần tử trong cartItemList
  });

  

  const fetchCartItem = () => {
    MyAccountService.getCartItem()
      .then((response) => {
        console.log(response.data);
        setCartItemList(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin cartItem :", error);
      });
  };
  useEffect(() => {
    fetchCartItem();
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Flora | Giỏ hàng</title>
        <meta name="description" content="" />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Giỏ hàng
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItemList && cartItemList.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Giỏ hàng</h3>

                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th></th>
                          </tr>
                        </thead>

                        <tbody>
                          {cartItemList.map((cartItem, key) => {
                            console.log(cartItem)
                            const id = cartItem.id
                            console.log(id)
                            const discountedPrice = getDiscountPrice(
                              // cartItem.price,
                              // cartItem.discount

                              cartItem.flower.price,
                              cartItem.flower.discount
                              // cartItem.subtotal,
                            );

                            const finalProductPrice =
                              // cartItem.price * currency.currencyRate
                              cartItem.flower.price * currency.currencyRate;
                            const finalDiscountedPrice =
                            cartItem.flower.price - (cartItem.flower.price * cartItem.flower.discount / 100)

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.flower.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        cartItem.flower.image[0]
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.flower.id
                                    }
                                  >
                                    {cartItem.flower.name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {finalProductPrice + "VND"}
                                      </span>
                                      <span className="amount">
                                        {finalDiscountedPrice + "VND"}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {finalProductPrice + "VND"}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={updateCartItemDecrease(cartItem)}
                                     
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      // value={updateInput}
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={updateCartItem(cartItem)}

                                      // disabled={
                                      //   cartItem !== undefined &&
                                      //   cartItem.quantity &&
                                      //   cartItem.quantity >=
                                      //     cartItemStock(
                                      //       cartItem,

                                      //     )
                                      // }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? finalDiscountedPrice * cartItem.quantity +
                                      "VND"
                                    : finalProductPrice * cartItem.quantity +
                                      "VND"}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      deleteFromCart(cartItem, addToast)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/sho"}>
                          Tiếp tục mua sắm
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>
                          Xóa toàn bộ sản phẩm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Phí vận chuyển
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>Nhập mã giảm giá phí vận chuyển</p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Tỉnh thành</label>
                            <select className="email s-email s-wid">
                              <option>Đà Nẵng</option>
                              <option>Lâm Đồng</option>
                              <option>Quảng Trị</option>
                              <option>Hồ Chí Minh</option>
                              <option>Ninh Thuận</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Mã Zip</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Tra cứu giá sản phẩm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Áp dụng mã giảm giá
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Nhập mã giảm giá</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Áp dụng
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Tổng kết
                        </h4>
                      </div>
                      <h5>
                        Tổng số tiền <span>{cartTotalPrice + "VND"}</span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Tổng thanh toán <span>{cartTotalPrice + "VND"}</span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Thanh toán
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không tìm thấy sản phẩm trong giỏ hàng <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        MUA NGAY
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
