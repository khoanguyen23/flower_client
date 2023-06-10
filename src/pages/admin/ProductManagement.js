import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";

import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import SearchForm from "./SearchForm";
import PropTypes from "prop-types";
import AddFlower from "../other/AddFlower";
import Paginator from "react-hooks-paginator";

import { getSortedProducts } from "../../helpers/product";

import {
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import EditProductForm from "./EditProductForm";

//Icon
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import FlowerService from "../../services/FlowerService";

const ProductManagement = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const pageLimit = 10;

  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Function to handle the edit button click
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Function to handle the update operation in the EditProductForm component
  const handleUpdate = (updatedProduct) => {
    // Perform the update operation using the updatedProduct data
    console.log("Updated product:", updatedProduct);
    setEditingProduct(null); // Clear the editingProduct state
    setIsModalOpen(false); // Close the modal
  };

  const handleDelete = (productId) => {
    FlowerService.deleteFlower(productId)
      .then(() => {
        // Xóa thành công, cập nhật danh sách sản phẩm
        const updatedProducts = products.filter(
          (product) => product.id !== productId
        );
        setCurrentData(updatedProducts);
        // Cập nhật state products hoặc gọi action để cập nhật trong Redux store
      })
      .catch((error) => {
        console.error("Lỗi khi xóa hoa:", error);
      });
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  const handleSearch = (query) => {
    const searchResults = products.filter((product) => {
      return false;
    });

    setCurrentData(searchResults);
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
            onClick={() => setIsAddModalOpen(true)}
            startIcon={<AddIcon />}
            sx={{ color: "#D3D3D3" }}
          >
            Thêm sản phẩm mới
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteForeverIcon />}
            //onClick={deleteSelectedProducts}
          >
            Xóa các sản phẩm đã chọn
          </Button>
        </div>
        {isAddModalOpen && (
          <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
            <div className="modal-content">
              <div className="modal-heading">
              <h3 className="panel-title">Thêm sản phẩm</h3>
                <Button
                  onClick={() => setIsAddModalOpen(false)}
                  color="inherit"
                  size="small"
                  className="close-icon"
                  startIcon={<CloseIcon />}
                />
               
              </div>

              <AddFlower />
            </div>
          </Modal>
        )}
      </div>

      <Table>
        <TableHead>
          <TableRow>
           
            <TableCell>ID</TableCell>

            <TableCell>Tên hoa</TableCell>
            <TableCell>Loại hoa</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Chi tiết</TableCell>
            <TableCell>Chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((data) => {
            return (
              <TableRow key={data.id}>
              
                <TableCell>{data.id} </TableCell>
                <TableCell>{data.name} </TableCell>
                <TableCell>{data.shortDescription} </TableCell>
                <TableCell>{data.category} </TableCell>
                <TableCell>{data.stock} </TableCell>
                <TableCell>{data.price} </TableCell>
                <TableCell>
                  {/* Check if the product is being edited */}
                  {editingProduct && editingProduct.id === data.id ? (
                    // Render the modal
                    <Modal
                      open={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                    >
                      <div className="modal-content">
                        <Button
                          onClick={() => setIsModalOpen(false)}
                          color="inherit"
                          size="small"
                          startIcon={<CloseIcon />}
                        />
                        <EditProductForm
                          product={editingProduct}
                          onUpdate={handleUpdate}
                        />
                      </div>
                    </Modal>
                  ) : (
                    <></>
                  )}
                  <Button
                    onClick={() => handleEdit(data)}
                    className={"edit-btn"}
                  >
                    Chỉnh sửa{" "}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(data.id)}
                    startIcon={<DeleteForeverIcon />}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="pro-pagination-style d-flex justify-content-center text-center mt-30 ">
        <Paginator
          totalRecords={products.length}
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
