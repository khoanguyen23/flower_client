import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className='search-form container'>
      <div className='row pt-50 pb-20'>
        <div className='col-lg-12'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="search-input" className='col-lg-2'>Tìm kiếm:</label>
            <input className='col-lg-8' type="text" id="search-input" value={query} onChange={handleQueryChange} />
            <Button variant="text" type="submit" startIcon={<SearchIcon />}>Tìm kiếm</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;