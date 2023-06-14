import React, { useState, useEffect } from "react";
import { Box, Tab, } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";


import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import OrderManagement from "../pages/admin/OrderManagement";
import BlogManagement from "../pages/admin/BlogManagement";
import ProductManagement from "../pages/admin/ProductManagement";
const BoardAdmin = () => {
  const [content, setContent] = useState("");

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <a href="/home-flowers">Trang chủ</a>
      </header>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Quản lý sản phẩm" value="1" />
            <Tab label="Quản lý đơn hàng" value="2" />
            
          </TabList>
        </Box>
        <TabPanel value="1">
          {/* <AddFlower /> */}
          <ProductManagement/>
        </TabPanel>
        <TabPanel value="2">
          <OrderManagement />
        </TabPanel>
        
      </TabContext>
    </Box>
    
    </div>
  );
};

export default BoardAdmin;