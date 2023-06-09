import React, { useState, useEffect } from "react";
import FlowerService from "../../services/FlowerService";
import axios from "axios";
import {storage} from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";




function AddFlower(props) {
  const [flowerName, setFlowername] = useState("");
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [inStockNumber, setInStockNumber] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [tag, setTag] = useState([]);
  const [file, setFile] = useState("");
  // const [imageUpload, setImageUpload] = useState(null);
  // const [imageUrls, setImageUrls] = useState([]);
  
  
  // const imagesListRef = ref(storage, "images/");

  const storageRef = ref(storage);



  const tagList = [
    "Hoa hồng",
    "Hoa tulip",
    "Hoa mẫu đơn",
    "Hoa layon",
    "Hoa sen",
    "Hoa cúc",
  ];
  const handleTagButtonClick = (tagItem, e) => {
    e.preventDefault();
    if (tag.includes(tagItem)) {
      setTag(tag.filter((item) => item !== tagItem));
    } else {
      setTag([...tag, tagItem]);
    }
  };
  const changeBoth = (e) => {
    uploadFile(e);
    setFile(e.target.files[0]);
 
  };

  // const uploadImageToFirestore = async (imageUpload) => {
  //   try {
  //     const imageRef = ref(imagesRef, v4()); // Tạo tham chiếu tới một tên tệp ngẫu nhiên
  //     await uploadBytes(imageRef, imageUpload); // Tải lên ảnh lên Firestore
  //     const imageUrl = await getDownloadURL(imageRef); // Lấy URL tải xuống của ảnh đã tải lên
  //     return imageUrl;
  //   } catch (error) {
  //     console.error("Error uploading image to Firestore:", error);
  //     throw error;
  //   }
  // };


  // const uploadImageToFirestore = async (imageUpload) => {
  //   try {
  //     // const imageRef = ref(storage, `images/${fileName}`);
  //     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  //     // const imageRef = ref(imagesRef, v4()); // Tạo tham chiếu tới một tên tệp ngẫu nhiên
  //     await uploadBytes(imageRef, imageUpload); // Tải lên ảnh lên Firestore
  //     const imageUrl = await getDownloadURL(imageRef); // Lấy URL tải xuống của ảnh đã tải lên
  //     return imageUrl;
  //   } catch (error) {
  //     console.error("Error uploading image to Firestore:", error);
  //     throw error;
  //   }
  // };

  const uploadImageToFirestore = async (imageUpload) => {
    return new Promise((resolve, reject) => {
      const imageRef = ref(storage, `images/${imageUpload.name }`);
  
      uploadBytes(imageRef, imageUpload)
        .then(() => getDownloadURL(imageRef))
        .then((imageUrl) => resolve(imageUrl))
        .catch((error) => reject(error));
    });
  };
  
  
  const uploadFile = async (e) => {
    const image = e.target.files[0];
    // const imageURL = URL.createObjectURL(image);
    try {
      const imageUrl = await uploadImageToFirestore(image);
      setImages([...images, imageUrl]);
      // setImages([...images, imageURL]);
    } catch (error) {
    }
  };

  const removeFile = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  // const formDataWithUrls = {
  //   name: flowerName,
  //   image: images,
  //   tag,
  //   category,
  //   shortDescription: description,
  //   stock: inStockNumber,
  //   price: regularPrice,
  //   discount: salePrice,
  //   fullDescription,
  // };
  

  // console.log(formDataWithUrls);
  const handleSetFlower = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = [];

      for (const image of images) {
        const imageUrl = await uploadImageToFirestore(image);
        imageUrls.push(imageUrl);
      }
  
      const formDataWithUrls = {
        name: flowerName,
        image: imageUrls,
        tag,
        category,
        shortDescription: description,
        stock: inStockNumber,
        price: regularPrice,
        discount: salePrice,
        fullDescription,
      };

      const response = await axios.post(
        "http://localhost:8080/api/flowers",
        formDataWithUrls
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FlowerService.getFlower()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //console.log(products);
  return (
    <div>
      <div className="container">
        <div className="panel-heading">
          <h3 className="panel-title">Thêm sản phẩm</h3>
        </div>
        <section className="panel">
          <div className="panel-body col-sm-12">
            <form
              onSubmit={handleSetFlower}
              className="form-horizontal"
              role="form"
            >
              <div className="image-container col-sm-5">
                <div className="image-upload-preview product-img">
                  {images && images[0] ? (
                    <div className="main-image">
                      {images.length > 0 && <img src={images[0]} alt="..." />}
                    </div>
                  ) : (
                    <div className="main-image-preview ">
                      <h3>+</h3>
                      <p>Thêm hình ảnh cho sản phẩm</p>
                    </div>
                  )}

                  <div className="thumbnail-images">
                    {images.slice(1).map((image, index) => (
                      <div key={index} className="thumbnail-image">
                        <img src={image} alt="..." />
                        <button
                          type="button"
                          onClick={() => removeFile(index + 1)}
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
                  {/* <input
                    type="file"
                    className="form-control"
                    id="#inputFile"
                    onChange={(e) => setFile(e.target.files[0])}
                    // style={{ display: "none" }}
                  /> */}
                </div>
                <div className="form-group">
                  <label htmlFor="category" className="col-sm-3 control-label">
                    Tag
                  </label>
                  <div className="col-sm-9 checkbox-container-tag">
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
                </div>

                <div className="form-group"></div>
              </div>
              <div className="input-container col-sm-7">
                <div className="form-group">
                  <label htmlFor="name" className="col-sm-6 control-label">
                    Tên hoa
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      value={flowerName}
                      onChange={(e) => setFlowername(e.target.value)}
                      placeholder="Tên hoa"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="category" className="col-sm-3 control-label">
                    Loại hoa
                  </label>
                  <div className="col-sm-9 checkbox-container">
                    <div className="checkbox-row">
                      <div className="checkbox-element">
                        <label>
                          <input
                            type="checkbox"
                            value="hoa-tinh-yeu"
                            checked={category.includes("Hoa tình yêu")}
                            onChange={(e) =>
                              setCategory((prevCategory) =>
                                e.target.checked
                                  ? [...prevCategory, "Hoa tình yêu"]
                                  : prevCategory.filter(
                                      (c) => c !== "Hoa tình yêu"
                                    )
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
                            value="hoa-valentine"
                            checked={category.includes("Hoa valentine")}
                            onChange={(e) =>
                              setCategory((prevCategory) =>
                                e.target.checked
                                  ? [...prevCategory, "Hoa valentine"]
                                  : prevCategory.filter(
                                      (c) => c !== "Hoa valentine"
                                    )
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
                            value="hoa-cuoi"
                            checked={category.includes("Hoa cưới")}
                            onChange={(e) =>
                              setCategory((prevCategory) =>
                                e.target.checked
                                  ? [...prevCategory, "Hoa cưới"]
                                  : prevCategory.filter((c) => c !== "Hoa cưới ")
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
                            value="qua-tang"
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
                  <label
                    htmlFor="inStockNumber"
                    className="col-sm-3 control-label"
                  >
                    Số lượng
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      name="inStockNumber"
                      autoComplete="off"
                      value={inStockNumber}
                      onChange={(e) => setInStockNumber(e.target.value)}
                      placeholder="Số lượng"
                    />
                  </div>
                </div>

                <div className="form-group group-price">
                  <label className="col-sm-9">Giá</label>
                  <div className="col-lg-4 col-md-4">
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Giá thường"
                        value={regularPrice}
                        onChange={(e) => setRegularPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Giá sale"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="description"
                    className="col-sm-3 control-label"
                  >
                    Mô tả
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="fullDescription"
                    className="col-sm-3 control-label"
                  >
                    Mô tả đầy đủ
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      value={fullDescription}
                      onChange={(e) => setFullDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-3 col-sm-9">
                    <button type="submit" className="btn btn-primary">
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddFlower;
