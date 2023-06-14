import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { getSortedProducts } from "../../helpers/product";
import Paginator from "react-hooks-paginator";

import {
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
} from "@material-ui/core";

//Icon
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]); // replace with your orders data
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [offset, setOffset] = useState(0);

  const pageLimit = 10;

  // handle search input change event
  const handleSearchInputChange = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  // filter orders by search keyword
  const filterOrders = (keyword) => {
    const results = orders.filter((order) => {
      const orderName = order.name.toLowerCase();
      const orderId = order.id.toLowerCase();
      return orderName.includes(keyword) || orderId.includes(keyword);
    });
    setCurrentData(results.slice(0, pageLimit));
    setCurrentPage(1);
  };

  // handle search form submit event
  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    filterOrders(searchKeyword.toLowerCase());
  };

  // handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentData(
      orders.slice((pageNumber - 1) * pageLimit, pageNumber * pageLimit)
    );
    setCurrentPage(pageNumber);
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
              <div className="col-lg-4"></div>
              <div className="search-content active col-lg-8">
                <input
                  type="search"
                  value={searchKeyword}
                  className="search-active"
                  placeholder="Tìm kiếm "
                />
                <button className="button-search">
                  <i className="pe-7s-search" />
                </button>
              </div>
            </div>
            <div className="table-features row">
              <Button variant="outlined" startIcon={<DeleteForeverIcon />}>
                {" "}
                Xóa các đơn hàng đã chọn
              </Button>
            </div>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Đơn hàng</TableCell>
                <TableCell>Ngày đặt hàng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Mã giảm giá</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>1000</TableCell>
                <TableCell>May 21, 2023</TableCell>
                <TableCell>
                  <Chip
                    label="Đang xử lý"
                    style={{ backgroundColor: "#D3D3D3", color: "#fff" }}
                  />
                </TableCell>
                <TableCell>Long Lực Sĩ</TableCell>
                <TableCell>Bầu trời</TableCell>
                <TableCell>1</TableCell>
                <TableCell></TableCell>
                <TableCell>325000 VND</TableCell>
                <TableCell>
                  <Link to="/order-detail">Xem</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>1001</TableCell>
                <TableCell>May 22, 2023</TableCell>
                <TableCell>
                  <Chip
                    label="Thành công"
                    style={{ backgroundColor: "#4caf50", color: "#fff" }}
                  />
                </TableCell>
                <TableCell>Thắng Mít Ướt</TableCell>
                <TableCell>Cánh tiên</TableCell>
                <TableCell>1</TableCell>
                <TableCell></TableCell>
                <TableCell>300000 VND</TableCell>
                <TableCell>
                  <Link to="#">Xem</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>1002</TableCell>
                <TableCell>May 23, 2023</TableCell>
                <TableCell>
                  <Chip
                    label="Đang giao hàng"
                    style={{ backgroundColor: "#FFD700", color: "#fff" }}
                  />
                </TableCell>
                <TableCell>Phan Khoa Học</TableCell>
                <TableCell>Cảm ơn</TableCell>
                <TableCell>1</TableCell>
                <TableCell></TableCell>
                <TableCell>200000 VND</TableCell>
                <TableCell>
                  <Link to="#">Xem</Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>1003</TableCell>
                <TableCell>May 1, 2023</TableCell>
                <TableCell>
                  <Chip
                    label="Hủy đơn hàng"
                    style={{ backgroundColor: "#FF0000", color: "#fff" }}
                  />
                </TableCell>
                <TableCell>Thắm Boom Hàng</TableCell>
                <TableCell>Cảm kích</TableCell>
                <TableCell>3</TableCell>
                <TableCell></TableCell>
                <TableCell>1350000 VND</TableCell>
                <TableCell>
                  <Link to="#">Xem</Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="pro-pagination-style d-flex justify-content-center text-center mt-30 ">
            <Paginator
              totalRecords={orders.length}
              pageLimit={pageLimit}
              pageNeighbours={2}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageContainerClass="mb-0 mt-0"
              pagePrevText="«"
              pageNextText="»"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderManagement;
