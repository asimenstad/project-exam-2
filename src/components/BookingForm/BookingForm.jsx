import React from "react";
import { Typography, TextField, Button, Box, Divider } from "@mui/material";
import Calendar from "../Calendar/Calendar";

function BookingForm({ bookings, maxGuests, price }) {
  return (
    <>
      <Typography variant="h2">Book your stay</Typography>

      <TextField
        id="guests"
        label="Guests"
        type="number"
        fullWidth
        size="small"
        inputProps={{ min: 1, max: maxGuests }}
      />
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3">{price} kr</Typography>
          <Typography>x 2 nights</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 600 }}>2400 kr</Typography>
          <Typography sx={{ fontWeight: 600 }}>Total</Typography>
        </Box>
      </Box>
      <Button variant="contained" disableElevation fullWidth>
        Book
      </Button>
    </>
  );
}

export default BookingForm;
