import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Modal, Button } from "react-bootstrap";

import AuthService from "../../services/auth.service"
import { useLocation } from 'react-router-dom';
import { useState,useContext,  useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRef } from "react";


const LoginRegister = ({ location }) => {
  const { pathname } = location;
  


  const history = useHistory();

  const form = useRef();
  const checkBtn = useRef();
  const [loginSuccess, setLoginSuccess] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();


    // const credentials = {
    //   username,
    //   password,
    // };

    AuthService.login(username, password)
      .then(() => {
        // localStorage.setItem("accessToken", response.data.accessToken);
        // localStorage.setItem("username", response.data.username);
        // localStorage.setItem("email", response.data.email);
        history.push("/my-account");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Đăng nhập thất bại:", error);
        setLoginSuccess(false);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    AuthService.register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
          setSuccessful(true);
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

  return (
    <Fragment>
      <MetaTags>
        <title>Flora | Đăng nhập</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Đăng nhập/Đăng ký
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">             
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Đăng nhập</h4>
                        </Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Đăng ký</h4>
                        </Nav.Link>
                      </Nav.Item> */}
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLogin} >
                              <input
                                type="text"
                                name="user-name"
                                value={username}
                                onChange={onChangeUsername}
                                placeholder="Tên đăng nhập"
                              />
                              <input
                                type="password"
                                name="user-password"
                                value={password}
                                onChange={onChangePassword}
                                placeholder="Mật khẩu"
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Nhớ tài khoản</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Quên mật khẩu
                                  </Link>
                                  <Link to={process.env.PUBLIC_URL + "/register"}>
                                    Chưa có tài khoản ?? Tạo tài khoản mới 
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Đăng nhập</span>
                                </button>
                              </div>
                              
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      {/* <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegister}>
                              <input
                                type="text"
                                name="user-name"
                                value={username}
                                onChange={onChangeUsername}
                                placeholder="Tên đăng nhập"
                              />
                              <input
                                type="password"
                                name="user-password"
                                value={password}
                                onChange={onChangePassword}
                                placeholder="Mật khẩu"
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={onChangeEmail}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Đăng ký</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane> */}
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
      <Modal show={!loginSuccess} onHide={() => setLoginSuccess(true)}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập thất bại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thông tin đăng nhập không chính xác. Vui lòng thử lại.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setLoginSuccess(true)}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
