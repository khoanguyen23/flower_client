import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import SearchForm from "./SearchForm";
import {
  Button,
  Tabs,
  Tab,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
  Icon,
} from "@material-ui/core";
import { TextField, Autocomplete } from "@mui/material";

//Icon
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

const TABS = [
  { label: "Quản lí sản phẩm", value: "product" },
  { label: "Quản lí đơn hàng", value: "order" },
];

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState(TABS[1].value);

  const handleTabChange = (event, value) => {
    setActiveTab(value);
  };
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    // Thực hiện tìm kiếm và cập nhật kết quả vào state searchResults
    setSearchResults([]);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flora | QUẢN LÝ ĐƠN HÀNG</title>
        <meta name="description" content="" />
      </MetaTags>

      <div className="order-management pt-50 pb-50">
        <div className="container">
          <div className="tab-menu">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="#6610f2"
            >
              {TABS.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </div>
          <div className="order-content container">
            <h3>Quản lý đơn hàng</h3>
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
                  Tạo đơn hàng mới
                </Button>
              </div>

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
        </div>
      </div>
    </Fragment>
  );
};

export default OrderManagement;
