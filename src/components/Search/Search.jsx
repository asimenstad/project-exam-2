import { SearchOffRounded, SearchRounded } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import React from "react";

function Search({ handleChange, searchInput }) {
  return (
    <TextField
      type="search"
      size="small"
      variant="standard"
      label="Search"
      end
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchRounded fontSize="small" />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 2 }}
      onChange={handleChange}
      value={searchInput}
    />
  );
}

export default Search;
