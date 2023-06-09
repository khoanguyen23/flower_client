import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import SearchForm from "./SearchForm";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import AddFlower from "../other/AddFlower";
import {
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";

//Icon
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ProductManagement = ({ products }) => {
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(products.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const getData = (current, pageSize) => {
    // Normally you should get the data from the server

    return products.slice((current - 1) * pageSize, current * pageSize);
  };
  console.log(getData(current, size));

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <button>
          <i className="fa fa-angle-double-left"></i>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button>
          <i className="fa fa-angle-double-right"></i>
        </button>
      );
    }
    return originalElement;
  };
  const handleSearch = (query) => {
    // Thực hiện tìm kiếm và cập nhật kết quả vào state searchResults
    setSearchResults([]);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flora | QUẢN LÝ SẢN PHẨM </title>
        <meta name="description" content="" />
      </MetaTags>
      <div className="order-content container">
        <h3>Quản lý sản phẩm </h3>
        <div className="row">
          <SearchForm onSearch={handleSearch} />
        </div>
        <div className="table-features row">
          <Button
            variant="contained"
            onClick={(event) => setShow(true)}
            startIcon={<AddIcon />}
            sx={{ color: "#D3D3D3" }}
          >
            Thêm sản phẩm mới
          </Button>
          <Button variant="outlined" startIcon={<DeleteForeverIcon />}>
            {" "}
            Xóa các sản phẩm đã chọn
          </Button>
        </div>
        <div className="table-features row">

        {show && <AddFlower />}
        </div>
      </div>
      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-filter-info">
                  <Pagination
                    className="pagination-data"
                    showTotal={(total, range) =>
                      `Showing ${range[0]}-${range[1]} of ${total}`
                    }
                    onChange={PaginationChange}
                    total={products.length}
                    current={current}
                    pageSize={size}
                    showSizeChanger={false}
                    itemRender={PrevNextArrow}
                    onShowSizeChange={PerPageChange}
                  />
                </div>
                <div className="table-responsive">
                  <table className="table table-text-small mb-0">
                    <thead className="thead-primary table-sorting">
                      <tr>
                        <th>ID</th>
                        <th>Tên hoa </th>
                        <th>Mô tả </th>
                        <th>Loại hoa </th>
                        <th>Số lượng </th>
                        <th>Giá </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getData(current, 100).map((data, index) => {
                        return (
                          <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.shortDescription}</td>
                            <td>{data.category}</td>
                            <td>{data.stock}</td>
                            <td>{data.price}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="table-filter-info">
                  <Pagination
                    className="pagination-data"
                    showTotal={(total, range) =>
                      `Showing ${range[0]}-${range[1]} of ${total}`
                    }
                    onChange={PaginationChange}
                    total={products.length}
                    current={current}
                    pageSize={size}
                    showSizeChanger={false}
                    itemRender={PrevNextArrow}
                    onShowSizeChange={PerPageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
ProductManagement.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(ProductManagement);
