import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Alert } from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import CreditCardForm from "./CreditCardForm1";
import MyAccountService from "../../services/MyAccountService";
import AuthService from "../../services/auth.service";
import warning from "warning";
import axios from "axios";
import OrderService from "../../services/OrderService";
import { format } from "date-fns";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
} from "@material-ui/core";

const MyAccount = ({ location }) => {
  const currentUser = AuthService.getCurrentUser();
  // console.log(currentUser)
  const { pathname } = location;
  const history = useHistory();

  // const [userShipping, setUserShipping] = useState(null);

  const [defaultShippingId, setDefaultShippingId] = useState(null);
  const [userShippingList, setUserShippingList] = useState([]);
  const [userPaymentList, setUserPaymentList] = useState([]);
  const [defaultPaymentId, setDefaultPaymentId] = useState(null);

  //shipping address

  useEffect(() => {
    fetchUserShippingList();
    fetchUserPaymentList();
    fetchUserOrderList();
  }, []);
  const fetchUserPaymentList = () => {
    MyAccountService.getUserPayment()
      .then((response) => {
        const userPaymentCheckout = response.data;
        localStorage.setItem(
          "userPayment",
          JSON.stringify(userPaymentCheckout)
        );
        setUserPaymentList(response.data);
        console.log(response.data);
        const defaultPayment = response.data.find(
          (payment) => payment.defaultPayment === true
        );
        if (defaultPayment) {
          setDefaultPaymentId(defaultPayment.id);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin user-payment :", error);
      });
  };

  // let userShipping = null;

  const fetchUserShippingList = () => {
    MyAccountService.getUserShipping()
      .then((response) => {
        const userShippingCheckout = response.data;
        localStorage.setItem(
          "userShipping",
          JSON.stringify(userShippingCheckout)
        );
        setUserShippingList(response.data);
        // console.log(userShipping);

        const defaultShipping = response.data.find(
          (shipping) => shipping.userShippingDefault === true
        );
        if (defaultShipping) {
          setDefaultShippingId(defaultShipping.id);
        }
        if (response.data.length > 0) {
          setShippingId(shippingId);
          // setShippingId(response.data[0].id);
          setUserShippingCity(response.data[0].userShippingCity);
          setUserShippingCountry(response.data[0].userShippingCountry);
          setUserShippingDefault(response.data[0].userShippingDefault);
          setUserShippingName(response.data[0].userShippingName);
          setUserShippingState(response.data[0].userShippingState);
          setUserShippingStreet1(response.data[0].userShippingStreet1);
          setUserShippingStreet2(response.data[0].userShippingStreet2);
          setUserShippingZipcode(response.data[0].userShippingZipcode);
          // setSelectedShipping(userShippingList[0]);
          // setUserShippingCity(userShippingList[0].userShippingCity);
          // setUserShippingCountry(userShippingList[0].userShippingCountry);
          // setUserShippingDefault(userShippingList[0].userShippingDefault);
          // setUserShippingName(userShippingList[0].userShippingName);
          // setUserShippingState(userShippingList[0].userShippingState);
          // setUserShippingStreet1(userShippingList[0].userShippingStreet1);
          // setUserShippingStreet2(userShippingList[0].userShippingStreet2);
          // setUserShippingZipcode(userShippingList[0].userShippingZipcode);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin user-shipping:", error);
      });
  };

  const handleAddUserShipping = () => {
    // Thiết lập giá trị ban đầu cho các trường thông tin địa chỉ
    setUserShippingName("");
    setUserShippingStreet1("");
    setUserShippingStreet2("");
    setUserShippingState("");
    setUserShippingCity("");
    setUserShippingCountry("");
    setUserShippingZipcode("");

    // Các xử lý khác khi thêm địa chỉ
    // ...
  };

  const handleSelectDefaultShipping = (shippingId) => {
    MyAccountService.updateDefaultShipping(shippingId)
      .then(() => {
        setDefaultShippingId(shippingId);
        fetchUserShippingList(); // Lấy lại danh sách user-shipping sau khi cập nhật
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật địa chỉ mặc định:", error);
      });
  };

  const handleSelectDefaultPayment = (paymentId) => {
    MyAccountService.updateDefaultPayment(paymentId)
      .then(() => {
        setDefaultPaymentId(paymentId);
        fetchUserPaymentList(); // Lấy lại danh sách user-shipping sau khi cập nhật
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật the thanh toan mặc định:", error);
      });
  };

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
  const [shippingId, setShippingId] = useState("");
  const [editShipping, setEditShipping] = useState(null);
  
  const handleEditShipping = (shippingId) => {
    const shippingToEdit = userShippingList.find(
      (shipping) => shipping.id === shippingId
    );

    setShippingId(shippingId);
    setUserShippingCity(shippingToEdit.userShippingCity);
    setUserShippingCountry(shippingToEdit.userShippingCountry);
    setUserShippingDefault(shippingToEdit.userShippingDefault);
    setUserShippingName(shippingToEdit.userShippingName);
    setUserShippingState(shippingToEdit.userShippingState);
    setUserShippingStreet1(shippingToEdit.userShippingStreet1);
    setUserShippingStreet2(shippingToEdit.userShippingStreet2);
    setUserShippingZipcode(shippingToEdit.userShippingZipcode);

    setToggle(true);
  };



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
      userShippingZipcode
    ).then(
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

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordChanged, setPasswordChanged] = useState(false);
  const [isUserUpdated, setUserUpdated] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const updateUser = () => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      AuthService.updateUser(
        currentUser.id,
        userName,
        email,
        telephone,
        firstName,
        lastName
      )
      .then((response)=>{
        console.log(response);
        setError("");
        setUserUpdated(true);
       
       
        
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
      });
    }
  };

  const handleChangePassword = () => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      AuthService.changePassword(
        currentUser.id,
        currentPassword,
        newPassword,
        confirmPassword
      )
        .then((response) => {
          console.log(response);
          setError("");
          setPasswordChanged(true);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setError(error.response.data.message);
          } else {
            setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
          }
        });
    }
  };
  const handleEditUserShipping = (e) => {
    e.preventDefault();
    const shippingData = {
      shippingId: shippingId,
      userShippingCity: userShippingCity,
      userShippingCountry: userShippingCountry,
      userShippingDefault: userShippingDefault,
      userShippingName: userShippingName,
      userShippingState: userShippingState,
      userShippingStreet1: userShippingStreet1,
      userShippingStreet2: userShippingStreet2,
      userShippingZipcode: userShippingZipcode,
    };
    axios
      .put(
        `http://localhost:8080/api/user-shipping/${shippingId}`,
        shippingData
      )
      .then((response) => {
        console.log("User Shipping updated:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating User Shipping:", error);
      });
  };

  const handleDeleteShipping = (shippingId) => {
    MyAccountService.deleteUserShipping(shippingId)
      .then((response) => {
        // Xử lý thành công sau khi xóa
        window.location.reload();
        console.log("Xóa thành công");
        // Thực hiện cập nhật danh sách địa chỉ vận chuyển hoặc các hoạt động khác sau khi xóa thành công
      })
      .catch((error) => {
        // Xử lý lỗi nếu xảy ra
        console.error("Lỗi khi xóa địa chỉ vận chuyển:", error);
      });
  };
  const handleDeletePayment = (paymentId) => {
    MyAccountService.deleteUserPayment(paymentId)
      .then((response) => {
        // Xử lý thành công sau khi xóa
        window.location.reload();
        console.log("Xóa thành công");
        // Thực hiện cập nhật danh sách địa chỉ vận chuyển hoặc các hoạt động khác sau khi xóa thành công
      })
      .catch((error) => {
        // Xử lý lỗi nếu xảy ra
        console.error("Lỗi khi xóa địa chỉ vận chuyển:", error);
      });
  };

  const [userOrderList, setUserOrderList] = useState([]);
  const fetchUserOrderList = () => {
    OrderService.getUserOrder()
      .then((response) => {
        setUserOrderList(response.data);
        console.log(response.data);
        return response.data; // Return the order list
      })
      .catch((error) => {
        console.error("Error fetching user orders:", error);
      });
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
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ{" "}
      </BreadcrumbsItem>
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
                  {/* <AddFlower/> */}
                  <Accordion defaultActiveKey="0">
                    {/* Thông tin cá nhân */}
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
                                Xin Chào <strong>{currentUser.username}</strong>
                              </h4>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>User Name</label>
                                  <input
                                    type="text"
                                    value={currentUser.username}
                                    onChange={(e) =>
                                      setUserName(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Họ </label>
                                  <input type="text" 
                                  value={firstName}
                                  onChange={(e) =>
                                    setFirstName(e.target.value)
                                  }/>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Tên</label>
                                  <input type="text"
                                  value={lastName}
                                  onChange={(e) =>
                                    setLastName(e.target.value)
                                  } />
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email</label>
                                  <input
                                    type="email"
                                    value={currentUser.email}
                                    onChange={(e) =>
                                      setEmail(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Số điện thoại </label>
                                  <input type="text"
                                  value={telephone}
                                  onChange={(e) =>
                                    setTelephone(e.target.value)
                                  } />
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
                                <button onClick={updateUser} type="submit">Lưu </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    {/* Đổi mật khẩu */}
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
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu cũ </label>
                                  <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) =>
                                      setCurrentPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu mới </label>
                                  <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                      setNewPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Xác nhận mật khẩu </label>
                                  <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                      setConfirmPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button onClick={handleChangePassword}>
                                  Lưu
                                </button>
                              </div>
                            </div>
                            {error && <Alert severity="warning">{error}</Alert>}
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    {/* Tài khoản thanh toán */}
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
                              <div className="entries-wrapper">
                                <div className="row">
                                  <div className="entries-info text-center col-lg-12 col-md-12">
                                    <ul>
                                      {userPaymentList.map((payment) => (
                                        <li key={payment.id}>
                                          <div className="col-lg-9 col-md-9 usershipping-container entries-wrapper ">
                                            <div className="col-lg-6 col-md-6">
                                              <h4>
                                                {payment.cardName.toUpperCase()}
                                              </h4>
                                              <p>{payment.cardNumber}, </p>
                                              <p>
                                                {payment.expiryMonth}/{" "}
                                                {payment.expiryYear},{" "}
                                                {payment.cvc}
                                              </p>
                                            </div>

                                            <div className="shipping-default col-lg-3 col-md-3">
                                              <label>
                                                <input
                                                  type="checkbox"
                                                  checked={
                                                    defaultPaymentId ===
                                                    payment.id
                                                  }
                                                  onChange={() =>
                                                    handleSelectDefaultPayment(
                                                      payment.id
                                                    )
                                                  }
                                                />
                                                Mặc định
                                              </label>
                                            </div>
                                          </div>
                                          <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center">
                                            <div className="entries-edit-delete text-center row">
                                              <button
                                                onClick={() => setToggle(true)}
                                                className="edit"
                                              >
                                                Chỉnh sửa
                                              </button>
                                              <button
                                              onClick={() =>
                                                handleDeletePayment(
                                                  payment.id
                                                )
                                              }
                                              className="delete"
                                            >
                                              Xóa
                                            </button>
                                            </div>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn block">
                                      <button
                                        onClick={(event) => onAddCreditCard()}
                                      >
                                        Thêm địa chỉ{" "}
                                      </button>
                                    </div>
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
                                <button>Lưu </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    {/* Địa chỉ  */}
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
                                <div className="entries-info text-center col-lg-12 col-md-12">
                                  <ul>
                                    {userShippingList.map((shipping) => (
                                      <li key={shipping.id}>
                                        <div className="col-lg-9 col-md-9 usershipping-container entries-wrapper ">
                                          <div className="col-lg-6 col-md-6">
                                            <h4>{shipping.userShippingCity}</h4>
                                            <p>
                                              {shipping.userShippingStreet2},{" "}
                                              {shipping.userShippingStreet1},{" "}
                                              {shipping.userShippingState},{" "}
                                              {shipping.userShippingCountry}
                                            </p>
                                          </div>
                                          <div className="shipping-default col-lg-3 col-md-3">
                                            <label>
                                              <input
                                                type="checkbox"
                                                checked={
                                                  defaultShippingId ===
                                                  shipping.id
                                                }
                                                onChange={() =>
                                                  handleSelectDefaultShipping(
                                                    shipping.id
                                                  )
                                                }
                                              />
                                              Mặc định
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center">
                                          <div className="entries-edit-delete text-center row">
                                            {/* <button
                                              onClick={() => setToggle(true)}
                                              className="edit"
                                            >
                                              Chỉnh sửa
                                            </button> */}
                                            <button
                                              onClick={() => {
                                                handleEditShipping(shipping.id); // Gọi handleEditShipping với shipping.id tương ứng
                                                setToggle(true);
                                              }}
                                              className="edit"
                                            >
                                              Chỉnh sửa
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleDeleteShipping(
                                                  shipping.id
                                                )
                                              }
                                              className="delete"
                                            >
                                              Xóa
                                            </button>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    {/* <button
                                      onClick={(event) => onAddBtnClick()}
                                    >
                                      Thêm địa chỉ{" "}
                                    </button> */}
                                    <button
                                      onClick={(event) => {
                                        handleAddUserShipping();
                                        onAddBtnClick();
                                      }}
                                    >
                                      Thêm địa chỉ
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {toggle && (
                              <div className="myaccount-info-wrapper">
                                <form onSubmit={handleEditUserShipping}>
                                  <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                      <div className="billing-info">
                                        <label>Tên </label>
                                        <input
                                          type="text"
                                          value={userShippingName}
                                          name="userShippingName"
                                          onChange={(e) =>
                                            setUserShippingName(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Số nhà </label>
                                        <input
                                          type="text"
                                          value={userShippingStreet1}
                                          name="userShippingStreet1"
                                          onChange={(e) =>
                                            setUserShippingStreet1(
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-6">
                                      <div className="billing-info">
                                        <label>Số đường </label>
                                        <input
                                          type="text"
                                          value={userShippingStreet2}
                                          name="userShippingStreet2"
                                          onChange={(e) =>
                                            setUserShippingStreet2(
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Quận/huyện </label>
                                        <input
                                          type="text"
                                          value={userShippingState}
                                          name="userShippingState"
                                          onChange={(e) =>
                                            setUserShippingState(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Tỉnh/ Thành phố </label>
                                        <input
                                          type="text"
                                          value={userShippingCity}
                                          name="userShippingCity"
                                          onChange={(e) =>
                                            setUserShippingCity(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Quốc Gia </label>
                                        <input
                                          type="text"
                                          value={userShippingCountry}
                                          name="userShippingCountry"
                                          onChange={(e) =>
                                            setUserShippingCountry(
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Zipcode </label>
                                        <input
                                          type="text"
                                          value={userShippingZipcode}
                                          name="userShippingZipcode"
                                          onChange={(e) =>
                                            setUserShippingZipcode(
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button type="submit" className="save">
                                        Lưu
                                      </button>
                                    </div>
                                    <div className="billing-btn">
                                      <button
                                        onClick={() => setToggle(false)}
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
                                            <input
                                              type="text"
                                              value={userShippingName}
                                              name="userShippingName"
                                              onChange={(e) =>
                                                setUserShippingName(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="billing-info">
                                            <label>Số nhà </label>
                                            <input
                                              type="text"
                                              value={userShippingStreet1}
                                              name="userShippingStreet1"
                                              onChange={(e) =>
                                                setUserShippingStreet1(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-6">
                                          <div className="billing-info">
                                            <label>Số đường </label>
                                            <input
                                              type="text"
                                              value={userShippingStreet2}
                                              name="userShippingStreet2"
                                              onChange={(e) =>
                                                setUserShippingStreet2(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="billing-info">
                                            <label>Quận/huyện </label>
                                            <input
                                              type="text"
                                              value={userShippingState}
                                              name="userShippingState"
                                              onChange={(e) =>
                                                setUserShippingState(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="billing-info">
                                            <label>Tỉnh/ Thành phố </label>
                                            <input
                                              type="text"
                                              value={userShippingCity}
                                              name="userShippingCity"
                                              onChange={(e) =>
                                                setUserShippingCity(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="billing-info">
                                            <label>Quốc Gia </label>
                                            <input
                                              type="text"
                                              value={userShippingCountry}
                                              name="userShippingCountry"
                                              onChange={(e) =>
                                                setUserShippingCountry(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="billing-info">
                                            <label>Zipcode </label>
                                            <input
                                              type="text"
                                              value={userShippingZipcode}
                                              name="userShippingZipcode"
                                              onChange={(e) =>
                                                setUserShippingZipcode(
                                                  e.target.value
                                                )
                                              }
                                            />
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
                                <button onClick={handleSetUserShipping}>
                                  Lưu thay đổi{" "}
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    {/* Đơn hàng của bạn */}
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="4">
                          <h3 className="panel-title">
                            <span>5 .</span> Đơn hàng của bạn
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="4">
                        <Card.Body>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Trạng thái</TableCell>

                               
                                <TableCell>Mã giảm giá</TableCell>
                                <TableCell>Ngày đặt hàng</TableCell>
                                <TableCell>Ngày giao hàng </TableCell>
                                <TableCell>Tổng tiền</TableCell>
                                <TableCell>Chi tiết</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {userOrderList && userOrderList.length > 0 ? (
                                userOrderList.map((order) => (
                                  <TableRow key={order.id}>
                                    <TableCell>
                                      <Chip
                                        label={order.orderStatus}
                                        style={{
                                          backgroundColor: order.statusColor,
                                          color: "#fff",
                                        }}
                                      />
                                    </TableCell>
                                    
                                    <TableCell></TableCell>
                                    <TableCell>
                                      {format(
                                        new Date(order.orderDate),
                                        "dd/MM/yyyy"
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {" "}
                                      {format(
                                        new Date(order.shippingDate),
                                        "dd/MM/yyyy"
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {order.orderTotal} VND
                                    </TableCell>
                                    <TableCell>
                                      <Link to={`/order-detail/${order.id}`}>
                                        Xem
                                      </Link>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <p>chưa có đơn hàng nào.</p>
                              )}
                            </TableBody>
                          </Table>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={isPasswordChanged}
          onHide={() => setPasswordChanged(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Mật khẩu đã được thay đổi thành công.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setPasswordChanged(false)}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={isUserUpdated}
          onHide={() => setUserUpdated(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Thông tin đã được cập nhật.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setUserUpdated(false)}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;




