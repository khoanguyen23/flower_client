import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import OrderManagement from "./OrderManagement";
import { Link, useHistory } from "react-router-dom";
import OrderService from "../../services/OrderService";
import MyAccountService from "../../services/MyAccountService";
import { format } from "date-fns";

import {
  Button,
  Tabs,
  Tab,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Chip,
  Grid,
  Icon,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

const TABS = [
  { label: "Quản lí sản phẩm", value: "product" },
  { label: "Quản lí đơn hàng", value: "order" },
];

const OrderDetails = () => {
  const { orderId } = useParams();

  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  const [order, setOrder] = useState({});
  const [userShipping, setUserShipping] = useState({});
  const [userPayment, setUserPayment] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("aaa");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    fetchOrderDetails(orderId);
    fetchFlowerOrder(orderId);
  }, []);

  const fetchOrderDetails = (orderId) => {
    OrderService.getOrderDetails(orderId)
      .then((response) => {
        console.log(response.data.userPayment);
        setOrder(response.data);
        setUserPayment(response.data.userPayment);
        setUserShipping(response.data.userShippingAddress);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin chi tiết đơn hàng:", error);
      });
  };

  const fetchFlowerOrder = (orderId) => {
    OrderService.getFlowerOrder(orderId)
      .then((response) => {
        console.log(response.data);
        setFlowers(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm:", error);
      });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatus(value); // Store the selected value

    // Call the update status function after updating the state
    handleUpdateStatus(value);
  };

  const handleUpdateStatus = (status) => {
    if (status) {
      OrderService.updateOrderDetails(orderId, status)
        .then(() => {
          console.log("Đã cập nhật trạng thái đơn hàng thành công.");
          // You can perform any additional actions after updating the order status
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        });
    }
  };
  const handleMethodChange = (e) => {
    const value = e.target.value;
    setSelectedMethod(value); // Store the selected value

    // Call the update Method function after updating the state
    handleUpdateMethod(value);
  };

  const handleUpdateMethod = (method) => {
    if (method) {
      OrderService.updateOrderMethod(orderId, method)
        .then(() => {
          console.log("Đã cập nhật phương thức thành công.");
          // You can perform any additional actions after updating the order status
        })
        .catch((error) => {
          console.error("Lỗi khi phương thức đơn hàng:", error);
        });
    }
  };

  console.log(order);
  console.log(userPayment);
  console.log(userShipping);



  return (
    <Fragment>
      <MetaTags>
        <title>Flora | CHI TIẾT ĐƠN HÀNG</title>
        <meta name="description" content="" />
      </MetaTags>

      <div className="order-detail pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>Thông tin đơn hàng </h3>
              <h2>Thông tin chi tiết của order {orderId}</h2>
              <Table className="table table-striped">
                <TableBody>
                  <TableRow>
                    <TableCell>Ngày đặt hàng:</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ngày giao hàng dự kiến :</TableCell>
                    <TableCell>{order.shippingDate}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Phương thức thanh toán:</TableCell>
                    <TableCell>
                      <select
                        name="phuongthuc"
                        value={selectedMethod}
                        onChange={handleMethodChange}
                      >
                        <option value="Thanh toán khi nhận hàng">
                          Thanh toán khi nhận hàng
                        </option>
                        <option value="Thanh toán thẻ ngân hàng">
                          Thanh toán thẻ ngân hàng
                        </option>
                      </select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Trạng thái:</TableCell>
                    <TableCell>
                      <select
                        name="trangthai"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                      >
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Thành công">Thành công</option>
                        <option value="Hủy đơn hàng">Hủy đơn hàng</option>
                      </select>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div class="row mt-3 mb-3">
              <div className="col-lg-12">
                <Table className="table col-lg-12">
                  <TableHead>
                    <TableCell>Thông tin thanh toán</TableCell>
                    <TableCell>Thông tin giao hàng</TableCell>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{userPayment.cardName}</TableCell>
                      <TableCell>{userShipping.userShippingName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{userPayment.cardNumber}</TableCell>
                      <TableCell>
                        {userShipping.userShippingStreet1},
                        {userShipping.userShippingStreet2},
                        {userShipping.userShippingState},
                        {userShipping.userShippingCity}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <p>
                          <strong>Email:</strong> lucsilong@gmail.com
                        </p>{" "}
                        <p>
                          <strong>Điện thoại:</strong> 0901234567{" "}
                        </p>
                      </TableCell>
                      <TableCell>
                        <strong>Điện thoại:</strong> 0909876543
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>
                        <em>Ghi chú khách hàng</em>
                        <p>
                          Nhắn giùm tôi là: "Bầu trời của anh chính là em ❤️"
                        </p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <h3>Chi tiết sản phẩm</h3>
          <Table class="table">
            <TableHead>
              <TableRow>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Tổng</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {flowers.map((flower) => {
                console.log(flower)
                return (
                  <TableRow key={flower.id}>
                    <TableCell>
                      <img
                        src={flower.flower.image[0]}
                        width="150"
                        height="200"
                      />
                    </TableCell>
                    <TableCell>{flower.flower.name}</TableCell>
                    <TableCell>{flower.quantity}</TableCell>
                    <TableCell>{flower.flower.price}</TableCell>
                    <TableCell>{flower.subtotal}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colspan="3">Tổng tiền hàng:</TableCell>
                <TableCell colspan="2">{order.orderTotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colspan="3">Phí vận chuyển:</TableCell>
                <TableCell colspan="2">50.000 đồng</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colspan="3">Mã giảm giá:</TableCell>
                <TableCell colspan="2">ABC123</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colspan="3">
                  <strong>Tổng thanh toán:</strong>
                </TableCell>
                <TableCell colspan="2">
                  <strong>{order.orderTotal}</strong>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div class="mb-5 mt-5 ml-5  mr-5 d-flex justify-content-center">
            <Button
              variant="contained"
              sx={{ color: "#D3D3D3" }}
              onClick={handleGoBack}
            >
              Quay lại
            </Button>
            <Button
              variant="contained"
              sx={{ color: "#D3D3D3" }}
              onClick={handleGoBack}
            >
              Cập nhật đơn hàng
            </Button>
            {/* <Link to="/order-management">
              <Button variant="contained" sx={{ color: "#D3D3D3" }}>
                Cập nhật đơn hàng
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;