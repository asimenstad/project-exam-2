import { SearchRounded } from "@mui/icons-material";
import { InputAdornment, FormControl, TextField, Box } from "@mui/material";

/**
 * Search for venue.
 * @param {function} handleChange - OnChange function for search input.
 * @param {string} searchInput - The search input value.
 * @returns Search input.
 */
function Search({ handleChange, searchInput }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <FormControl variant="outlined" size="small">
        <TextField
          id="search"
          label="Search"
          size="small"
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
      </FormControl>
    </Box>
  );
}

export default Search;
