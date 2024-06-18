import React, { useState } from "react";

const ShopSearch = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchValue);
    
  };
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Tìm kiếm </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#" onSubmit={handleSubmit}>
          <input type="text" placeholder="Tìm kiếm..." value={searchValue} onChange={handleChange} />
          <button>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSearch;
