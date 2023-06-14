import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy, useState } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import CreditCardForm1 from "./pages/other/CreditCardForm1";
import BoardAdmin from "./components/BoardAdmin";
import Register from "./pages/other/Register";

// home pages

const HomeFurniture = lazy(() => import("./pages/home/HomeFurniture"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
// blog pages
const Blog = lazy(() => import("./pages/blog/Blog"));
// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const OrderManagement = lazy(() => import("./pages/admin/OrderManagement"));
const OrderDetails = lazy(() => import("./pages/admin/OrderDetails"));
const OrderInfo = lazy(() => import("./pages/other/OrderInfo"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeFurniture}
                />
                {/* Homepages */}
                <Route
                  path={process.env.PUBLIC_URL + "/home-flowers"}
                  component={HomeFurniture}
                />
                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop"}
                  component={ShopGridStandard}
                />
                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                {/* Blog pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/blog"}
                  component={Blog}
                />
                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login"}
                  component={LoginRegister}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/register"}
                  component={Register}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/credit-card"}
                  component={CreditCardForm1}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/admin"}
                  component={BoardAdmin}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/order-management"}
                  component={OrderManagement}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/order-info"}
                  component={OrderInfo}
                />

                <Route path="/order-detail/:orderId" component={OrderDetails} />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
