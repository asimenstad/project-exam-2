import { SearchRounded } from "@mui/icons-material";
import { InputAdornment, FormControl, InputLabel, Input } from "@mui/material";

/**
 * Search for venue.
 * @param {function} handleChange - OnChange function for search input.
 * @param {string} searchInput - The search input value.
 * @returns Search input.
 */
function Search({ handleChange, searchInput }) {
  return (
    <FormControl variant="standard">
      <InputLabel htmlFor="search">Search</InputLabel>
      <Input
        type="search"
        size="small"
        label="Search"
        endAdornment={
          <InputAdornment position="end">
            <SearchRounded fontSize="small" />
          </InputAdornment>
        }
        sx={{ mb: 2 }}
        onChange={handleChange}
        value={searchInput}
      />
    </FormControl>
  );
}

export default Search;
