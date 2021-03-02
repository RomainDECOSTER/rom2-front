import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
  function deleteFilter() {
    setGlobalFilter(undefined);
  }

  return (
    <div>
      <TextField
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={deleteFilter} disabled={globalFilter === undefined}>
                <CloseRounded />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default GlobalFilter;
