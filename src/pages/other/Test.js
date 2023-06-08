import React, { useState, useEffect } from "react";
import FlowerService from "../../services/FlowerService";
import axios from "axios";
import { Image } from "cloudinary-react";

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
  const [imageUrl, setImageUrl] = useState("");

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "c9yxxaie");

    axios
      .post("https://api.cloudinary.com/v1_1/diks0pj1d/image/upload", formData)
      .then((res) => {
        setImageUrl(res.data.secure_url);
        setImages([...images, imageUrl]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFile = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const formDataWithUrls = {
    name: flowerName,
    image: images,
    tag,
    category,
    shortDescription: description,
    stock: inStockNumber,
    price: regularPrice,
    discount: salePrice,
    fullDescription,
  };
  console.log(formDataWithUrls);
  const handleSetFlower = async (e) => {
    e.preventDefault();

    try {
      // Send the flower data to your API
      const response = await axios.post(
        "http://localhost:8080/api/flowers",
        formDataWithUrls
      );
      console.log(response.data);
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
              {/* <div className="image-container col-sm-6">
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
                    <div className="form-group"></div>
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
                    onChange={uploadFile}
                    id="#inputFile"
                  />
                </div>

                <div className="form-group"></div>
              </div> */}
              <label htmlFor="image" className="col-sm-3 control-label">
                Image
              </label>
              <div className="col-sm-9">
                {imageUrl ? (
                  <Image cloudName="diks0pj1d" publicId={imageUrl} />
                ) : (
                  <input
                    type="file"
                    className="form-control"
                    onChange={uploadFile}
                    id="image"
                  />
                )}
              </div>
              <div className="input-container col-sm-6">
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
                            checked={category.includes("hoa-tinh-yeu")}
                            onChange={(e) =>
                              setCategory((prevCategory) =>
                                e.target.checked
                                  ? [...prevCategory, "hoa-tinh-yeu"]
                                  : prevCategory.filter(
                                      (c) => c !== "hoa-tinh-yeu"
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
                            checked={category.includes("hoa-valentine")}
                            onChange={(e) =>
                              setCategory((prevCategory) =>
                                e.target.checked
                                  ? [...prevCategory, "hoa-valentine"]
                                  : prevCategory.filter(
                                      (c) => c !== "hoa-valentine"
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
                            checked={category.includes("hoa-cuoi")}
                            onChange={(e) =>
                              setCategory((prevCategory) =>
                                e.target.checked
                                  ? [...prevCategory, "hoa-cuoi"]
                                  : prevCategory.filter((c) => c !== "hoa-cuoi")
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
                            checked={category.includes("qua-tang")}
                            onChange={(e) =>
                              setCategory((prevCategory) =>
                                e.target.checked
                                  ? [...prevCategory, "qua-tang"]
                                  : prevCategory.filter((c) => c !== "qua-tang")
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
                <div className="form-group">
                  <label htmlFor="category" className="col-sm-3 control-label">
                    Tag
                  </label>
                  <div className="col-sm-9 checkbox-container-tag">
                    <div className="checkbox-row">
                      <div className="checkbox-element">
                        <label>
                          <input
                            type="checkbox"
                            value="hoa-hong"
                            checked={tag.includes("hoa-hong")}
                            onChange={(e) =>
                              setTag((prevTag) =>
                                e.target.checked
                                  ? [...prevTag, "hoa-hong"]
                                  : prevTag.filter((c) => c !== "hoa-hong")
                              )
                            }
                          />
                          Hoa hồng
                        </label>
                      </div>
                      <div className="checkbox-element">
                        <label>
                          <input
                            type="checkbox"
                            value="hoa-sen"
                            checked={tag.includes("hoa-sen")}
                            onChange={(e) =>
                              setTag((prevTag) =>
                                e.target.checked
                                  ? [...prevTag, "hoa-sen"]
                                  : prevTag.filter((c) => c !== "hoa-sen")
                              )
                            }
                          />
                          Hoa sen
                        </label>
                      </div>
                      <div className="checkbox-element">
                        <label>
                          <input
                            type="checkbox"
                            value="hoa-tulip"
                            checked={tag.includes("hoa-tulip")}
                            onChange={(e) =>
                              setTag((prevTag) =>
                                e.target.checked
                                  ? [...prevTag, "hoa-tulip"]
                                  : prevTag.filter((c) => c !== "hoa-tulip")
                              )
                            }
                          />
                          Hoa tulip
                        </label>
                      </div>
                    </div>
                    <div className="checkbox-row">
                      <div className="checkbox-element">
                        <label>
                          <input
                            type="checkbox"
                            value="hoa-cuc"
                            checked={tag.includes("hoa-cuc")}
                            onChange={(e) =>
                              setTag((prevTag) =>
                                e.target.checked
                                  ? [...prevTag, "hoa-cuc"]
                                  : prevTag.filter((c) => c !== "hoa-cuc")
                              )
                            }
                          />
                          Hoa cúc
                        </label>
                      </div>
                      <div className="checkbox-element">
                        <label>
                          <input
                            type="checkbox"
                            value="hoa-mau-don"
                            checked={tag.includes("hoa-mau-don")}
                            onChange={(e) =>
                              setTag((prevTag) =>
                                e.target.checked
                                  ? [...prevTag, "hoa-mau-don"]
                                  : prevTag.filter((c) => c !== "hoa-mau-don")
                              )
                            }
                          />
                          Hoa mẫu đơn
                        </label>
                      </div>
                      <div className="checkbox-element">
                        <label>
                          <input
                            type="checkbox"
                            value="hoa-lay-on"
                            checked={tag.includes("hoa-lay-on")}
                            onChange={(e) =>
                              setTag((prevTag) =>
                                e.target.checked
                                  ? [...prevTag, "hoa-lay-on"]
                                  : prevTag.filter((c) => c !== "hoa-lay-on")
                              )
                            }
                          />
                          Hoa lay ơn
                        </label>
                      </div>
                    </div>
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
