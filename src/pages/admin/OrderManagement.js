import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import SearchForm from "./SearchForm";
import OrderDetails from "./OrderDetails";
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
import OrderService from "../../services/OrderService";
//Icon
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const OrderManagement = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [userOrderList, setUserOrderList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  // const filter = (e) => {
  //   const keyword = e.target.value.toLowerCase();

  //   if (keyword !== "") {
  //     const results = userOrderList.filter((order) => {
  //       const status = userOrderList.orderStatus.toLowerCase();
  //       const categoryMatch = userOrderList.orderStatus.some((status) =>
  //       status.toLowerCase().includes(keyword)
  //       );

  //       return status.includes(keyword) || categoryMatch;
  //     });
  //     setUserOrderList(results);
  //   } else {
  //     setUserOrderList(userOrderList);
  //     // If the text field is empty, show all products
  //   }

  //   setSearchKeyword(keyword);
  // };
  const filter = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);

    if (keyword !== "") {
      const results = userOrderList.filter((order) => {
        const status = order.orderStatus.toLowerCase();
        return status.includes(keyword);
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchUserOrderList();
  }, []);
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
            <h3>Quản lý đơn hàng</h3>
            <div className="row">
              <div className="search-content active">
                <input
                  type="search"
                  value={searchKeyword}
                  onChange={filter}
                  className="search-active"
                  placeholder="Tìm kiếm "
                />
                <button className="button-search">
                  <i className="pe-7s-search" />
                </button>
              </div>
            </div>
            <div className="table-features row"></div>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Đơn hàng</TableCell>
                <TableCell>Trạng thái</TableCell>

                {/* <TableCell>Khách hàng</TableCell> */}

                <TableCell>Ngày đặt hàng</TableCell>
                <TableCell>Ngày giao hàng </TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {userOrderList.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>

                  
                  <TableCell>
                    <Chip
                      label={order.orderStatus}
                      style={{
                        backgroundColor:
                        order.orderStatus === "Đang xử lý"
                            ? "#ccc"
                            : order.orderStatus === "Đang giao hàng"
                            ? "#a749ff"
                            : order.orderStatus === "Thành công"
                            ? "#008000"
                            : order.orderStatus === "Hủy đơn hàng"
                            ? "#df5c39"
                            : "",
                        color: "#fff",
                      }}
                    />
                  </TableCell>

                 

                  <TableCell>
                    {format(new Date(order.orderDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {format(new Date(order.shippingDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{order.orderTotal} VND</TableCell>
                  <TableCell>
                    <Link to={`/order-detail/${order.id}`}>Xem</Link>
                  </TableCell>
                </TableRow>
              ))} */}
              {userOrderList && userOrderList.length > 0 ? (
              searchResults.length > 0
                ? searchResults.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>

                      <TableCell>
                        <Chip
                          label={order.orderStatus}
                          style={{
                            backgroundColor:
                              order.orderStatus === "Đang xử lý"
                                ? "#ccc"
                                : order.orderStatus === "Đang giao hàng"
                                ? "#a749ff"
                                : order.orderStatus === "Thành công"
                                ? "#008000"
                                : order.orderStatus === "Hủy đơn hàng"
                                ? "#df5c39"
                                : "",
                            color: "#fff",
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        {format(new Date(order.orderDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {order.shippingDate ? format(new Date(order.shippingDate), "dd/MM/yyyy") : 'chua co ngay giao hang'}
                      </TableCell>
                      <TableCell>{order.orderTotal} VND</TableCell>
                      <TableCell>
                        <Link to={`/order-detail/${order.id}`}>Xem</Link>
                      </TableCell>
                    </TableRow>
                  ))
                : userOrderList.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>

                      <TableCell>
                        <Chip
                          label={order.orderStatus}
                          style={{
                            backgroundColor:
                              order.orderStatus === "Đang xử lý"
                                ? "#ccc"
                                : order.orderStatus === "Đang giao hàng"
                                ? "#a749ff"
                                : order.orderStatus === "Thành công"
                                ? "#008000"
                                : order.orderStatus === "Hủy đơn hàng"
                                ? "#df5c39"
                                : "",
                            color: "#fff",
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        {format(new Date(order.orderDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {format(new Date(order.shippingDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{order.orderTotal} VND</TableCell>
                      <TableCell>
                        <Link to={`/order-detail/${order.id}`}>Xem</Link>
                      </TableCell>
                    </TableRow>
                  ))
                  ) : (
                    <p>Chưa có đơn hàng nào</p>
                  )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderManagement;
