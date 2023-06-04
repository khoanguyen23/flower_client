import React,{useState,useEffect} from "react";
import FlowerService from "../../services/FlowerService";


function AddFlower() {
    const [flowerName,setFlowername]=useState("");
    const [category,setCategory]=useState("");
    const [desciption,setDescription]=useState("");
    const [inStockNumber,setInStockNumber]=useState("");
    const [regularPrice,setRegularPrice]=useState("");
    const [salePrice,setSalePrice]=useState("");
    const [image,setImage]=useState();

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    // const showImage=(e)=>{
    //     document.ims.show.src=e.value;
    //     setImage(e.value)
    // } 
    const [products, setProducts] = useState([]);
  useEffect(() => {
    FlowerService.getFlower().then((Response) => {
      console.log(Response.data);
      setProducts(Response.data);
    });
  }, []);
 
    
    const handleSetFlower = (e) => {
        e.preventDefault();
    
        FlowerService.setFlower(
          flowerName,
          category,
          desciption,
          inStockNumber,
          regularPrice,
          salePrice,
          image,).then(
          (response) => {
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      };

    // const handleSetFlower = (e) => {
    //   e.preventDefault();
    
    //   const flowerData = {
    //     flowerName,
    //     category,
    //     desciption,
    //     inStockNumber,
    //     regularPrice,
    //     salePrice,
    //     image,
    //   };
    
    //   FlowerService.setFlower(flowerData)
    //     .then((response) => {
    //       window.location.reload();
    //     })
    //     .catch((error) => {
    //       const resMessage =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString();
    
    //       setMessage(resMessage);
    //       setSuccessful(false);
    //     });
    // };
      
    
  return (
    <div>
      <div className="container">
        <section classNameName="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"> Thêm sản phẩm</h3>
          </div>
          <div className="panel-body">
            <form
              onSubmit={handleSetFlower}
              className="form-horizontal"
              role="form"
            >

              <div className="form-group">
                <label for="name" className="col-sm-3 control-label">
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
                <label for="tech" className="col-sm-3 control-label">
                  Loại hoa
                </label>
                <div className="col-sm-9">
                  <select className="form-control"  value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="hoa-tinh-yeu">Hoa tình yêu </option>
                    <option value="hoa-valetine">Hoa valentine </option>
                    <option value="hoa-cuoi">Hoa cưới </option>
                    <option value="qua-tang">Quà tặng </option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label for="name" className="col-sm-3 control-label">
                  Số lượng
                </label>
                <div className="col-sm-9">
                  <input
                   type="number"
                   min="0"
                    className="form-control"
                    name="name"
                    autocomplete="off"
                    value={inStockNumber}
                    onChange={(e) => setInStockNumber(e.target.value)}
                    placeholder="Số lượng"
                  />
                </div>
              </div>
              <div className="form-group">
                <label for="about" className="col-sm-3 control-label">
                  Mô tả
                </label>
                <div className="col-sm-9">
                  <textarea className="form-control" value={desciption}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
              </div>
              <div className="form-group group-price">
              <label className="col-sm-9">Giá  </label>
                <div className="col-lg-4 col-md-4 ">
                
                  <div className="">
                    
                    <input  type="text" className="form-control" placeholder="Giá thường "value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}/>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 ">
                  <div className="">
                   
                    <input type="text" className="form-control" placeholder="Giá sale" value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label " for="file_img">
                  Chọn ảnh (jpg/png):
                </label>{" "}
                <div className="col-sm-9">
                  <input type="file" name="file_img"value={image}
                    onChange={(e) => setImage(e.target.value)} />
                </div>
                {image && (
                <div>
                  <img
                    alt="not fount"
                    width={"100%"}
                    // src={URL.createObjectURL(image)} 
                    />
                  
                </div>
              )}
              </div>

              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-9">
                  <button type="submit" className="btn btn-primary">
                    Lưu
                  </button>
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
