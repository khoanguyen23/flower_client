import React, { useState } from "react";
import { Button } from "@material-ui/core";
import FlowerService from "../../services/FlowerService";
import axios from "axios";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";

const EditProductForm = ({ product, onUpdate }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [shortDescription, setShortDescription] = useState(
    product.shortDescription
  );
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount);
  const [image, setImage] = useState(product.image);
  const [flowerId, setFlowerId] = useState(product.id);
  const [fullDescription, setFullDescription] = useState(
    product.fullDescription
  );
  const [tag, setTag] = useState(product.tag);
console.log(image)
  const changeBoth = (e) => {
    uploadFile(e);
    setImageUpload(e.target.files[0]);
    // setFile(e.target.files[0]);
  };
  const uploadImageToFirestore = async (imageUpload) => {
    return new Promise((resolve, reject) => {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

      // uploadBytes(imageRef, imageUpload)
      //   .then(() => getDownloadURL(imageRef))
      //   .then((imageUrl) => resolve(imageUrl))
      //   .catch((error) => reject(error));
      uploadBytes(imageRef, imageUpload).then(() => {
        getDownloadURL(imageRef).then((imageUrl) => resolve(imageUrl));
      });
    });
  };

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    
    // const imageURL = URL.createObjectURL(image);
    try {
      const imageUrl = await uploadImageToFirestore(file);
      console.log(imageUrl);
      setImage([...image, imageUrl]);
      console.log(image);
      

      // setImageUpload(imageUrl)
      // setImages([...images, imageURL]);
    } catch (error) {}
  };

  // const uploadFile = async (e) => {
  //   const file = e.target.files[0];
  //   const imageURL = URL.createObjectURL(file);

  //   try {
  //     // const cloudinaryURL = await uploadImageToCloudinary(imageURL);
  //     setImage([...image, imageURL]);
  //   } catch (error) {
  //     // Xử lý lỗi nếu có
  //   }
  // };
  const removeFile = (index) => {
    const updatedImages = [...image];
    updatedImages.splice(index, 1);
    setImage(updatedImages);
  };
  const tagList = [
    "Hoa hồng",
    "Hoa tulip",
    "Hoa mẫu đơn",
    "Hoa layon",
    "Hoa sen",
    "Hoa cúc",
    "Hoa baby",
    "Hoa cẩm chướng"
  ];
  const handleTagButtonClick = (tagItem, e) => {
    e.preventDefault();
    if (tag.includes(tagItem)) {
      setTag(tag.filter((item) => item !== tagItem));
    } else {
      setTag([...tag, tagItem]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrls = [];

      for (const image of image) {
        const imageUrl = await uploadImageToFirestore(image);
        imageUrls.push(imageUrl);
      }

      const flowerData = {
        flowerId: flowerId,
        name: name,
        image: image, // Đảm bảo bạn đã sử dụng tên biến đúng là `images`
        tag: tag,
        category: category,
        shortDescription: shortDescription,
        stock: stock,
        price: price,
        discount: discount,
        fullDescription: fullDescription,
      };

      axios
        .put(`http://localhost:8080/api/flowers/${flowerId}`, flowerData)
        .then((response) => {
          console.log("Flower updated:", response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating flower:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

 
  
  return (
    <div className="modal-content-wrapper">
    
      <form onSubmit={handleSubmit} className="form-horizontal" role="form">
        <div className="image-container col-sm-5">
          <div className="image-upload-preview product-img">
            {image && image[0] ? (
              <div className="main-image">
                {image.length > 0 && <img src={image[0]} alt="..." />}
              </div>
            ) : (
              <div className="main-image-preview ">
                <h3>+</h3>
                <p>Thêm hình ảnh cho sản phẩm</p>
              </div>
            )}

            <div className="thumbnail-images">
              {image.map((image, index) => (
                <div key={index} className="thumbnail-image">
                  <img src={image} alt="..." />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                  ></button>
                </div>
              ))}
            </div>
            
          </div>

          <div className="form-group">
            <input
              type="file"
              className="form-control"
              onChange={changeBoth}
              id="file"
            />
           
          </div>
          
          <div className="form-group">
            <label htmlFor="category" className="col-sm-3 control-label">
              Tag
            </label>

            <div className="sidebar-widget-tag">
              {tagList.map((tagItem) => (
                <div className="checkbox-element" key={tagItem}>
                  <button
                    className={`tag-button ${
                      tag.includes(tagItem) ? "active" : ""
                    }`}
                    onClick={(e) => handleTagButtonClick(tagItem, e)}
                  >
                    {tagItem}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group"></div>
        </div>
        <div className="input-container col-sm-7">
          <div className="form-group">
            <label htmlFor="name" className="col-sm-6 control-label">
              Tên hoa
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                value={name}
                placeholder={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="form-group">
            <label htmlFor="category" className="col-sm-3 control-label">
              Loại hoa
            </label>
            <div className="col-sm-12 checkbox-container">
              <div className="checkbox-row">
                <div className="checkbox-element">
                  <label>
                    <input
                      type="checkbox"
                      value="Hoa tình yêu"
                      checked={category.includes("Hoa tình yêu")}
                      onChange={(e) =>
                        setCategory((prevCategory) =>
                          e.target.checked
                            ? [...prevCategory, "Hoa tình yêu"]
                            : prevCategory.filter((c) => c !== "Hoa tình yêu")
                        )
                      }
                    />
                    Hoa tình yêu
                  </label>
                </div>
                <div className="checkbox-element">
                  <label>
                    <input
                      type="checkbox"
                      value=" Hoa valentine"
                      checked={category.includes(" Hoa valentine")}
                      onChange={(e) =>
                        setCategory((prevCategory) =>
                          e.target.checked
                            ? [...prevCategory, " Hoa valentine"]
                            : prevCategory.filter((c) => c !== " Hoa valentine")
                        )
                      }
                    />
                    Hoa valentine
                  </label>
                </div>
              </div>
              <div className="checkbox-row">
                <div className="checkbox-element">
                  <label>
                    <input
                      type="checkbox"
                      value="Hoa cưới"
                      checked={category.includes("Hoa cưới")}
                      onChange={(e) =>
                        setCategory((prevCategory) =>
                          e.target.checked
                            ? [...prevCategory, "Hoa cưới"]
                            : prevCategory.filter((c) => c !== "Hoa cưới")
                        )
                      }
                    />
                    Hoa cưới
                  </label>
                </div>
                <div className="checkbox-element">
                  <label>
                    <input
                      type="checkbox"
                      value=" Quà tặng"
                      checked={category.includes("Quà tặng")}
                      onChange={(e) =>
                        setCategory((prevCategory) =>
                          e.target.checked
                            ? [...prevCategory, "Quà tặng"]
                            : prevCategory.filter((c) => c !== "Quà tặng")
                        )
                      }
                    />
                    Quà tặng
                  </label>
                </div>
              </div>
            </div>
          </div> */}
           <div className="form-group">
            <label htmlFor="category" className="col-sm-3 control-label">
              Loại hoa
            </label>
            <div className="col-sm-12 checkbox-container">
              <div className="checkbox-row">
                <div className="checkbox-element">
                  <label>
                    <input
                      type="checkbox"
                      value="Hoa tình yêu"
                      checked={category.includes("Hoa tình yêu")}
                      onChange={(e) =>
                        setCategory((prevCategory) =>
                          e.target.checked
                            ? [...prevCategory, "Hoa tình yêu"]
                            : prevCategory.filter((c) => c !== "Hoa tình yêu")
                        )
                      }
                    />
                    Hoa tình yêu
                  </label>
                </div>
                <div className="checkbox-element">
                  <label>
                    <input
                      type="checkbox"
                      value="Hoa Valentine"
                      checked={category.includes("Hoa valentine")}
                      onChange={(e) =>
                        setCategory((prevCategory) =>
                          e.target.checked
                            ? [...prevCategory, "Hoa valentine"]
                            : prevCategory.filter((c) => c !== "Hoa valentine")
                        )
                      }
                    />
                    Hoa valentine
                  </label>
                </div>
              </div>
              <div className="checkbox-row">
                <div className="checkbox-element">
                  <label>
                    <input
                      type="checkbox"
                      value="Hoa cưới"
                      checked={category.includes("Hoa cưới")}
                      onChange={(e) =>
                        setCategory((prevCategory) =>
                          e.target.checked
                            ? [...prevCategory, "Hoa cưới"]
                            : prevCategory.filter((c) => c !== "Hoa cưới")
                        )
                      }
                    />
                    Hoa cưới
                  </label>
                </div>
                <div className="checkbox-element">
                  <label>
                    <input
                      type="checkbox"
                      value="Quà tặng"
                      checked={category.includes("Quà tặng")}
                      onChange={(e) =>
                        setCategory((prevCategory) =>
                          e.target.checked
                            ? [...prevCategory, "Quà tặng"]
                            : prevCategory.filter((c) => c !== "Quà tặng")
                        )
                      }
                    />
                    Quà tặng
                  </label>
                </div>
              </div>
            </div>
            
          </div>

          <div className="form-group">
            <label htmlFor="stock" className="col-sm-3 control-label">
              Số lượng
            </label>
            <div className="col-sm-12">
              <input
                type="number"
                min="0"
                className="form-control"
                name="inStockNumber"
                autoComplete="off"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Số lượng"
              />
            </div>
          </div>

          <div className="form-group group-price">
            <label className="col-sm-9">Giá</label>
            <div className="col-sm-6">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Giá thường"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Giảm giá "
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="col-sm-3 control-label">
              Mô tả
            </label>
            <div className="col-sm-12">
              <textarea
                className="form-control"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="fullDescription" className="col-sm-3 control-label">
              Mô tả đầy đủ
            </label>
            <div className="col-sm-12">
              <textarea
                className="form-control"
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="form-group">
            <div className="billing-back-btn">
              <div className="col-sm-6 addflower-btn">
                <button type="submit">Cập nhật </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
