import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
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
import AddIcon from "@mui/icons-material/Add";

const OrderManagement = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    // Thực hiện tìm kiếm và cập nhật kết quả vào state searchResults
    setSearchResults([]);
  };

  return (
    <Fragment>
      <div className="order-management pt-50 pb-50">
        <div className="container">
          <div className="order-content container">
            <div className="row">
              <SearchForm onSearch={handleSearch} />
            </div>
            <div className="table-features row">
            <div className="btn-create pr-20">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ color: "#D3D3D3" }}
                >
                  Tạo bài viết mới
                </Button>
              </div>
              <Button variant="outlined" startIcon={<DeleteForeverIcon />}>
                {" "}
                Xóa các bài viết đã chọn
              </Button>
            </div>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell></TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Mã giảm giá</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
                  <Link to="#">
                    <Button>

                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderManagement;
