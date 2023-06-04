import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import AddFlower from "./AddFlower";

import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import CreditCardForm from "./CreditCardForm1";
import MyAccountService from "../../services/MyAccountService";

const MyAccount = ({ location }) => {
  const { pathname } = location;
  const history = useHistory();
  // const [userInfo, setUserInfo] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });
  useEffect(() => {
    // Kiểm tra nếu chưa đăng nhập, chuyển hướng tới trang login.html
    if (!localStorage.getItem("accessToken")) {
      history.push("/home-flower-shop");
    } else {
      // Lấy thông tin người dùng từ local storage
      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      setUserInfo({ username, email });
    }
  }, []);
  // const [userShipping, setUserShipping] = useState("");
  // useEffect(() => {
  //   MyAccountService.getUserShipping().then((Response) => {
  //     console.log(Response.data);
  //     setUserShipping(Response.data);
  //   });
  // }, []);

  

  //shipping address
  const [userShippingList, setUserShippingList] = useState([]);
  const [userShippingCity, setUserShippingCity] = useState("");
  const [userShippingCountry, setUserShippingCountry] = useState("");
  const [userShippingDefault, setUserShippingDefault] = useState(false);
  const [userShippingName, setUserShippingName] = useState("");
  const [userShippingState, setUserShippingState] = useState("");
  const [userShippingStreet1, setUserShippingStreet1] = useState("");
  const [userShippingStreet2, setUserShippingStreet2] = useState("");
  const [userShippingZipcode, setUserShippingZipcode] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

//credit card information

  // const [cardName,setCardName] = useState("");
  // const [cardNumber,setCardNumber] = useState("");
  // const [cvc,setCvc] = useState("");
  // const [defaultPayment,setDefaultPayment] = useState("");
  // const [expiryMonth,setExpiryMonth] = useState("");
  // const [expiryYear,setExpiryYear] = useState("");
  // const [holderName,setHolderName] = useState("");
  

  const handleSetUserShipping = (e) => {
    e.preventDefault();

    MyAccountService.setUserShipping(
      userShippingCity,
      userShippingCountry,
      userShippingDefault,
      userShippingName,
      userShippingState,
      userShippingStreet1,
      userShippingStreet2,
      userShippingZipcode).then(
      (response) => {
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };
  



  // useEffect(() => {
  //   fetch('api/user-shipping/')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data); // Kiểm tra dữ liệu phản hồi từ server
  //       setUserShippingList(data);
  //     })
  //     .catch(error => console.error(error));
  // }, []);
  // console.log("userShipping", userShippingList);
  const accessToken = localStorage.getItem("accessToken");
  const [toggle, setToggle] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [id, setId] = useState(0);
  const [idCreditCard, setIdCreditCard] = useState(0);
  const [creditCardList, setCreditCardList] = useState([]);

  const onAddCreditCard = (event) => {
    setIdCreditCard((id) => idCreditCard + 1);
    setCreditCardList([...creditCardList, idCreditCard + 1]);
  };
  const onRemoveCreditCard = (idCreditCard) => {
    setCreditCardList(
      creditCardList.filter((creditcard) => creditcard !== idCreditCard)
    );
  };
  const onAddBtnClick = (event) => {
    setId((id) => id + 1);
    setAddressList([...addressList, id + 1]);
  };
  const onRemoveBtnClick = (id) => {
    setAddressList(addressList.filter((address) => address !== id));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Tài khoản </title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Tài khoản 
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <AddFlower/>
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Thông tin cá nhân{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>
                                Xin Chào  {userInfo.username}
                              </h4>
                              
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Họ </label>
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Tên</label>
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email</label>
                                  <input type="email" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Số điện thoại </label>
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Fax</label>
                                  <input type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Lưu </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Đổi mật khẩu
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Đổi mật khẩu</h4>
                              <h5>Mật khẩu cũ </h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu mới </label>
                                  <input type="password" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Xác nhận mật khẩu </label>
                                  <input type="password" />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Lưu </button>
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
                            <span>3 .</span> Thông tin tài khoản thanh toán{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4></h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>Tên </p>
                                    <p>Số tài khoản </p>
                                    <p>2352367828723897</p>
                                    <p>Thời hạn </p>
                                    <p>29</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                    <button
                                      onClick={() => setToggle(!toggle)}
                                      className="edit"
                                    >
                                      Chỉnh sửa
                                    </button>
                                    <button
                                      onClick={(event) => onAddCreditCard()}
                                    >
                                      Thêm{" "}
                                    </button>
                                  </div>
                                </div>
                              </div>
                             
                            </div>
                            <div className="description">
                                {creditCardList.map((creditcard) => {
                                  return (
                                    <>
                                      <CreditCardForm />

                                      <div className="billing-back-btn">
                                        <div className="billing-btn">
                                          <button
                                            className="billing-btn"
                                            onClick={() =>
                                              onRemoveCreditCard(creditcard)
                                            }
                                          >
                                            Xóa địa chỉ
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            {toggle && <CreditCardForm />}

                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Lưu </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="3">
                          <h3 className="panel-title">
                            <span>4 .</span> Thông tin địa chỉ{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Địa chỉ nhận hàng </h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>John Doe</p>
                                    <p>Paul Park </p>
                                    <p>Lorem ipsum dolor set amet</p>
                                    <p>NYC</p>
                                    <p>New York</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                    <button
                                      onClick={() => setToggle(!toggle)}
                                      className="edit"
                                    >
                                      Chỉnh sửa
                                    </button>
                                    <button
                                      onClick={(event) => onAddBtnClick()}
                                    >
                                      Thêm địa chỉ{" "}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {toggle && (
                              <div className="myaccount-info-wrapper">
                                <form onSubmit={handleSetUserShipping}>
                                <div className="row">
                                  <div className="col-lg-6 col-md-12">
                                    <div className="billing-info">
                                      <label>Tên </label>
                                      <input type="text" 
                                      value={userShippingName}
                                      name="userShippingName"
                                      onChange={(e) => setUserShippingName(e.target.value)}/>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                      <label>Số nhà </label>
                                      <input type="text" 
                                      value={userShippingStreet1}
                                      name="userShippingStreet1"
                                      onChange={(e) => setUserShippingStreet1(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-6">
                                    <div className="billing-info">
                                      <label>Số đường </label>
                                      <input type="text"
                                      value={userShippingStreet2}
                                      name="userShippingStreet2"
                                      onChange={(e) => setUserShippingStreet2(e.target.value)} />
                                    </div>
                                  </div>

                                  <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                      <label>Quận/huyện </label>
                                      <input type="text" 
                                      value={userShippingState}
                                      name="userShippingState"
                                      onChange={(e) => setUserShippingState(e.target.value)}/>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                      <label>Tỉnh/ Thành phố </label>
                                      <input type="text" 
                                      value={userShippingCity}
                                      name="userShippingCity"
                                      onChange={(e) => setUserShippingCity(e.target.value)}/>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                      <label>Quốc Gia </label>
                                      <input type="text" 
                                      value={userShippingCountry}
                                      name="userShippingCountry"
                                      onChange={(e) => setUserShippingCountry(e.target.value)}/>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                      <label>Zipcode </label>
                                      <input type="text"
                                      value={userShippingZipcode}
                                      name="userShippingZipcode"
                                      onChange={(e) => setUserShippingZipcode(e.target.value)} />
                                    </div>
                                  </div>
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    <button 
                                    type="submit"  
                                    className="save">Lưu</button>
                                  </div>
                                  <div className="billing-btn">
                                    <button
                                      onClick={() => setToggle(!toggle)}
                                      className="cancel"
                                    >
                                      Hủy
                                    </button>
                                  </div>
                                </div>
                                </form>
                                
                              </div>
                            )}
                            <div className="description">
                              {addressList.map((address) => {
                                return (
                                  <div key={address}>
                                    <div className="myaccount-info-wrapper">
                                      <div className="row">
                                        <div className="col-lg-6 col-md-12">
                                          <div className="billing-info">
                                            <label>Tên </label>
                                            <input type="text" />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="billing-info">
                                            <label>Số nhà </label>
                                            <input type="text" />
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-6">
                                          <div className="billing-info">
                                            <label>Số đường </label>
                                            <input type="text" />
                                          </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6">
                                          <div className="billing-info">
                                            <label>Quận/huyện </label>
                                            <input type="text" />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="billing-info">
                                            <label>Tỉnh </label>
                                            <input type="text" />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="billing-info">
                                            <label>Quốc Gia </label>
                                            <input type="text" />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="billing-info">
                                            <label>Zipcode </label>
                                            <input type="text" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="billing-back-btn">
                                      <div className="billing-btn">
                                        <button
                                          className="billing-btn"
                                          onClick={() =>
                                            onRemoveBtnClick(address)
                                          }
                                        >
                                          Xóa địa chỉ
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Lưu thay đổi </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
