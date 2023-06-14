import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";

import { format } from "date-fns";
import {
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
} from "@material-ui/core";
import OrderService from "../../services/OrderService"
//Icon

const OrderInfo = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [userOrderList, setUserOrderList] = useState([]);
 


  useEffect(()=>{
    fetchUserOrderList();
  },[])
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
        <title>Flora | QUẢN LÝ ĐƠN HÀNG</title>
        <meta name="description" content="" />
      </MetaTags>

      <div className="order-management pt-50 pb-50">
        <div className="container">
          <div className="order-content container">
            <h3>Thông tin đơn hàng của bạn </h3>
          
            
          </div>
          <Table>
            <TableHead>
              <TableRow>
               
                <TableCell>Đơn hàng</TableCell>
                <TableCell>Trạng thái</TableCell>
                
                
                <TableCell>Khách hàng</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Mã giảm giá</TableCell>
                <TableCell>Ngày đặt hàng</TableCell>
                <TableCell>Ngày giao hàng </TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {userOrderList.map((order) => (
                <TableRow key={order.id}>
                  
                  <TableCell>{order.id}</TableCell>
                 
                  <TableCell>
                    <Chip
                      label={order.orderStatus
                      }
                      style={{ backgroundColor: order.statusColor, color: "#fff" }}
                    />
                  </TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>{format(new Date(order.orderDate), "dd/MM/yyyy")}</TableCell>
                  <TableCell> {format(new Date(order.shippingDate), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{order.orderTotal} VND</TableCell>
                  <TableCell>
                  <Link to={`/order-detail/${order.id}`}>Xem</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderInfo;
