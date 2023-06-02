import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

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
  const accessToken = localStorage.getItem("accessToken");
  const [toggle, setToggle] = useState(false);
  const [addressList, setAddressList] = useState([0]);
  const [id, setId] = useState(0);
  console.log(addressList)
  const onAddBtnClick = (event) => {
    
    setId((id) => id + 1 );
    setAddressList([...addressList, id + 11]);
  };
  const onRemoveBtnClick = (id) => {
    setAddressList(addressList.filter((address) => address !== id));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flora | Tài khoản của tôi</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Tài khoản của tôi
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Chỉnh sửa thông tin tài khoản{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Tài khoản của tôi</h4>
                              <h5>Chi tiết</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Họ</label>
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
                                  <label>Địa chỉ Email</label>
                                  <input type="email" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Số điện thoại</label>
                                  <input type="text" />
                                </div>
                              </div>
                              {/* <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Fax</label>
                                  <input type="text" />
                                </div>
                              </div> */}
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Tiếp tục</button>
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
                            <span>2 .</span> Thay đổi mật khẩu
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Thay đổi mật khẩu</h4>
                              <h5>Mật khẩu của bạn</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu</label>
                                  <input type="password" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Xác nhận mật khẩu</label>
                                  <input type="password" />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Tiếp tục</button>
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
                            <span>3 .</span> Thay đổi địa chỉ{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Địa chỉ nhận hàng</h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>268 Lý Thường Kiệt</p>
                                    <p>Quận 10</p>
                                    <p>Hồ Chí Minh</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                    <button className="edit">Sửa</button>
                                    <button>Xóa</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Tiếp tục</button>
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
                              <h4>Address Book Entries</h4>
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
                                    <button onClick={(event) => onAddBtnClick()}>
                                      Thêm địa chỉ{" "}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {toggle && (
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
                                  <div className="col-lg-12 col-md-6">
                                    <div className="billing-info">
                                      <label>Quốc Gia </label>
                                      <input type="text" />
                                    </div>
                                  </div>
                                </div>
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
                                        <div className="col-lg-12 col-md-6">
                                          <div className="billing-info">
                                            <label>Quốc Gia </label>
                                            <input type="text" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      className="billing-btn"
                                      onClick={() => onRemoveBtnClick(address)}
                                    >
                                      Xóa địa chỉ
                                    </button>
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
