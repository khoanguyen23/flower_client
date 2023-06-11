import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import MyAccountService from "../../services/MyAccountService";
import { useState, useEffect } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { Checkbox } from "@mui/material";

const Checkout = ({ location, cartItems, currency }) => {
  const { pathname } = location;
  let cartTotalPrice = 0;

  const [checked, setChecked] = useState(true);
  const [userShipping, setUserShipping] = useState("");
  const [userPayment, setUserPayment] = useState("");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    fetchUserShipping();
    fetchUserPayment();
  }, []);
  console.log(userPayment);

  const fetchUserShipping = async () => {
    try {
      const response = await MyAccountService.getUserShipping();
      const userShippingData = response.data;

      // Filter the userShippingData array to get the shipping with defaultShipping=true
      const defaultShipping = userShippingData.filter(
        (shipping) => shipping.userShippingDefault === true
      );

      //  console.log(defaultShipping[0].userShippingCity);
      // Do something with the default shipping information
      setUserShipping(defaultShipping[0]);
    } catch (error) {
      console.error("Error retrieving user shipping:", error);
      // Handle the error
    }
  };
  const fetchUserPayment = async () => {
    try {
      const response = await MyAccountService.getUserPayment();
      const userPaymentData = response.data;

      // Filter the userPaymentData array to get the Payment with defaultPayment=true
      const defaultPayment = userPaymentData.filter(
        (payment) => payment.defaultPayment === true
      );

      console.log(defaultPayment[0]);
      // Do something with the default Payment information
      setUserPayment(defaultPayment[0]);
    } catch (error) {
      console.error("Error retrieving user Payment:", error);
      // Handle the error
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flora | Thanh toán</title>
        <meta name="description" content="" />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Thanh toán
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <Accordion defaultActiveKey="0">
                  <Card className="single-my-account mb-20">
                    <Card.Header className="panel-heading">
                      <Accordion.Toggle variant="link" eventKey="0">
                        <h3 className="panel-title">
                          <span>1 .</span> Địa chỉ giao hàng{" "}
                        </h3>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        {cartItems && cartItems.length >= 1 ? (
                          <div className="billing-info-wrap">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="billing-info mb-50">
                                  <div className="table-features">
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>
                                            Địa chỉ giao hàng đã lưu
                                          </TableCell>
                                          <TableCell></TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell>Địa chỉ, Tên</TableCell>
                                          <TableCell>
                                            <Checkbox
                                              onChange={handleChange}
                                              inputProps={{
                                                "aria-label": "controlled",
                                              }}
                                            />
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info mb-20">
                                  <label>Họ</label>
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info mb-20">
                                  <label>Tên</label>
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="billing-info mb-20">
                                  <label>Tên công ty (nếu có)</label>
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="billing-select mb-20">
                                  <label>Tỉnh/ Thành phố </label>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="billing-info mb-20">
                                  <label>Tên đường, Tòa nhà, Số nhà.</label>

                                  <input
                                    type="text"
                                    value={userShipping.userShippingStreet1}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="billing-info mb-20">
                                  <label>Tỉnh/Thành phố</label>
                                  <input
                                    type="text"
                                    value={userShipping.userShippingCity}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info mb-20">
                                  <label>Quận/Huyện</label>
                                  <input
                                    type="text"
                                    value={userShipping.userShippingState}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info mb-20">
                                  <label>Phường/Xã</label>
                                  <input
                                    type="text"
                                    value={userShipping.userShippingStreet2}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info mb-20">
                                  <label>Số điện thoại</label>
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info mb-20">
                                  <label>Địa chỉ Email</label>
                                  <input type="text" />
                                </div>
                              </div>
                            </div>

                            <div className="additional-info-wrap">
                              <h4>Thông tin thêm</h4>
                              <div className="additional-info">
                                <label>Ghi chú</label>
                                <textarea
                                  placeholder="Ghi chú về đơn đặt hàng của bạn. Ví dụ: ghi chú đặc biệt cho shipper, lời nhắn cho người nhận,..."
                                  name="message"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="item-empty-area text-center">
                                <div className="item-empty-area__icon mb-30">
                                  <i className="pe-7s-cash"></i>
                                </div>
                                <div className="item-empty-area__text">
                                  Không tìm thấy sản phẩm trong giỏ hàng để
                                  thanh toán <br />{" "}
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/shop-grid-standard"
                                    }
                                  >
                                    MUA NGAY
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="single-my-account mb-20">
                    <Card.Header className="panel-heading">
                      <Accordion.Toggle variant="link" eventKey="1">
                        <h3 className="panel-title">
                          <span>2 .</span> Phương thức thanh toán
                        </h3>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <div className="billing-info-wrap">
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Tên </label>
                                <input
                                  type="text"
                                  value={userPayment.cardName}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Số thẻ</label>
                                <input
                                  type="text"
                                  value={userPayment.cardNumber}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <label>Ngày hết hạn </label>
                              <div className="billing-info mb-20">
                                <input
                                  type="text"
                                  value={userPayment.expiryMonth}
                                />
                              </div>
                              <div className="col-lg-6 col-md-6"><div className="billing-info mb-20">
                                <label>Loại thẻ </label>
                                <input type="text" value={userPayment.type} />
                              </div></div>
                              
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <input
                                  type="text"
                                  value={userPayment.expiryYear}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="single-my-account mb-20">
                    <Card.Header className="panel-heading">
                      <Accordion.Toggle variant="link" eventKey="2">
                        <h3 className="panel-title">
                          <span>3 .</span> Xem lại đơn hàng
                        </h3>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body></Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="col-lg-5">
                <div className="your-order-area">
                  <h3>Đơn hàng của bạn</h3>
                  <div className="your-order-wrap gray-bg-4">
                    <div className="your-order-product-info">
                      <div className="your-order-top">
                        <ul>
                          <li>Sản phẩm</li>
                          <li>Tổng</li>
                        </ul>
                      </div>
                      <div className="your-order-middle">
                        <ul>
                          {cartItems.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );
                            const finalProductPrice =
                              cartItem.price * currency.currencyRate;
                            const finalDiscountedPrice =
                              discountedPrice * currency.currencyRate;

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                            return (
                              <li key={key}>
                                <span className="order-middle-left">
                                  {cartItem.name} X {cartItem.quantity}
                                </span>{" "}
                                <span className="order-price">
                                  {discountedPrice !== null
                                    ? finalDiscountedPrice * cartItem.quantity +
                                      "VND"
                                    : finalProductPrice * cartItem.quantity +
                                      "VND"}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="your-order-bottom">
                        <ul>
                          <li className="your-order-shipping">Phí ship</li>
                          <li>Miễn phí vận chuyển</li>
                        </ul>
                      </div>
                      <div className="your-order-total">
                        <ul>
                          <li className="order-total">Tổng thanh toán</li>
                          <li>{cartTotalPrice + "VND"}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="payment-method"></div>
                  </div>
                  <div className="place-order mt-25">
                    <button className="btn-hover">Đặt hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Checkout);
