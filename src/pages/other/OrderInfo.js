import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";

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

const OrderInfo = () => {
  const { orderId } = useParams();
  console.log(orderId);
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  const [order, setOrder] = useState({});
  const [userShipping, setUserShipping] = useState({});
  const [userPayment, setUserPayment] = useState({});

  useEffect(() => {
    fetchOrderDetails(orderId);
    // fetchUserShippingDefault();
    // fetchUserPaymentDefault();
  }, []);

  const fetchOrderDetails = (orderId) => {
    OrderService.getOrderDetails(orderId)
      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin chi tiết đơn hàng:", error);
      });
  };

 

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
              <h3>Thông tin đơn hàng</h3>
              <h2>Thông tin chi tiết của order {orderId}</h2>
              <Table className="table table-striped">
                <TableBody>
                  <TableRow>
                    <TableCell>Ngày đặt hàng:</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ngày thanh toán:</TableCell>
                    <TableCell>{order.shippingDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phương thức thanh toán:</TableCell>
                    <TableCell>Thanh toán khi nhận hàng</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Trạng thái:</TableCell>
                    <TableCell>
                      <select name="trangthai">
                        <option value="dang-xu-ly">Đang xử lý</option>
                        <option value="dang-giao">Đang giao hàng</option>
                        <option value="thanh-cong">Thành công</option>
                        <option value="huy-don">Hủy đơn hàng</option>
                      </select>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div class="row mt-3 mb-3">
              <div className="col-lg-12">
               
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
              <TableRow>
                <TableCell>
                  <img
                    src="https://i.pinimg.com/564x/8a/8c/00/8a8c00bc11c84ab988288f11c125aa38.jpg"
                    width="150"
                    height="200"
                  />
                </TableCell>
                <TableCell>Bầu trời</TableCell>
                <TableCell>1</TableCell>
                <TableCell>300.000 đồng</TableCell>
                <TableCell>300.000 đồng</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colspan="3">Tổng tiền hàng:</TableCell>
                <TableCell colspan="2">300.000 đồng</TableCell>
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
                  <strong>325.000 đồng</strong>
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
            
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderInfo;
