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

import EditProductForm from "./EditProductForm";

//Icon
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ProductManagement = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const deleteSelectedProducts = () => {
    console.log("Đã xóa thành công ", selectedProducts);
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
      // const productName = product.name.toLowerCase();
      // const tags = product.tag.map((tag) => tag.toLowerCase());
      // const category = product.category.toLowerCase();
  
      // // Kiểm tra nếu query tồn tại trong productName, tags hoặc category
      // if (
      //   productName.includes(query.toLowerCase()) ||
      //   tags.includes(query.toLowerCase()) ||
      //   category.includes(query.toLowerCase())
      // ) {
      //   return true;
      // }
  
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
            onClick={(event) => setShow(true)}
            startIcon={<AddIcon />}
            sx={{ color: "#D3D3D3" }}
          >
            Thêm sản phẩm mới
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteForeverIcon />}
            onClick={deleteSelectedProducts}
          >
            Xóa các sản phẩm đã chọn
          </Button>
        </div>
        <div className="table-features ">
          {show && (
            <>
              <Button
                variant="contained"
                onClick={(event) => setShow(false)}
                startIcon={<AddIcon />}
                sx={{ color: "#D3D3D3" }}
              >
                Hủy
              </Button>
              <AddFlower />
            </>
          )}
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>ID</TableCell>

            <TableCell>Tên hoa</TableCell>
            <TableCell>Loại hoa</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((data) => {
            return (
              <TableRow key={data.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(data.id)}
                    onChange={(e) => {
                      const productId = data.id;
                      if (e.target.checked) {
                        setSelectedProducts([...selectedProducts, productId]);
                      } else {
                        setSelectedProducts(
                          selectedProducts.filter((id) => id !== productId)
                        );
                      }
                    }}
                  />
                </TableCell>
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
                        <EditProductForm
                          product={editingProduct}
                          onUpdate={handleUpdate}
                        />
                      </div>
                    </Modal>
                  ) : (
                    <Button
                      onClick={() => handleEdit(data)}
                      className={"edit-btn"}
                    
                    >
                      Chỉnh sửa{" "}
                    </Button>
                  )}
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
