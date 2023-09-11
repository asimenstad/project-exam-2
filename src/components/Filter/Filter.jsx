import { EastRounded } from "@mui/icons-material";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

function Filter() {
  const [city, setCity] = useState("");
  const cities = ["All", "Oslo", "Rjukan", "Venice"];
  const heroImage =
    "https://images.unsplash.com/photo-1618064541372-289bdb6f5b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2233&q=80";

  return (
    <>
      <Box
        sx={{
          height: 300,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 1,
        }}
      />
      <Box
        sx={{
          mb: 5,
          mt: -7,
          mx: 5,
          px: 4,
          py: 3,
          bgcolor: "#fff",
          borderRadius: 1,
        }}>
        <FormControl fullWidth sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
          <InputLabel id="select-city-label">City</InputLabel>
          <Select
            labelId="select-city-label"
            id="select-city"
            label="City"
            value={city}
            sx={{ flexGrow: 2, minWidth: "5.5rem" }}>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
          <TextField id="guests" label="Guests" type="number" sx={{ flexGrow: 1 }} />
          <DatePicker label="Check in" sx={{ flexGrow: 1 }} />
          <DatePicker label="Check out" sx={{ flexGrow: 1 }} />
          <Button variant="contained" disableElevation sx={{ flexGrow: 1 }} endIcon={<EastRounded />}>
            Find stays
          </Button>
        </FormControl>
      </Box>
    </>
  );
}

export default Filter;
