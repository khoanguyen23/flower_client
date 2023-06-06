import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import OrderManagement from "./OrderManagement";
import { Link } from "react-router-dom";

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

const TABS = [
  { label: "Quản lí sản phẩm", value: "product" },
  { label: "Quản lí đơn hàng", value: "order" },
];

const OrderDetails = () => {
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
              <Table className="table table-striped">
                <TableBody>
                  <TableRow>
                    <TableCell>Ngày đặt hàng:</TableCell>
                    <TableCell>21/05/2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ngày thanh toán:</TableCell>
                    <TableCell>22/05/2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phương thức thanh toán:</TableCell>
                    <TableCell>Thanh toán khi nhận hàng</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>IP khách hàng:</TableCell>
                    <TableCell>192.168.1.1</TableCell>
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
                <Table className="table col-lg-12">
                  <TableHead>
                    <TableCell>Địa chỉ thanh toán</TableCell>
                    <TableCell>Địa chỉ giao hàng</TableCell>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Long Lực Sĩ</TableCell>
                      <TableCell>Luân Thư Sinh</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>123 Đường ABC, Quận 1, TP. HCM</TableCell>
                      <TableCell>456 Đường XYZ, Quận 2, TP. HCM</TableCell>
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
          <div class="mb-5 mt-5 d-flex justify-content-center">
            <Link to="/order-management">
              <Button
                variant="contained"
                sx={{ color: "#D3D3D3" }}
              >
                Cập nhật đơn hàng
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
