import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { format } from "date-fns";

function BookingsVenue({ bookings }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h2">Bookings ({bookings.length})</Typography>
      {bookings.map(({ created, dateFrom, dateTo, guests, id }) => (
        <Box key={id} sx={{ bgcolor: "#fff", display: "flex", flexDirection: "column", p: 3, borderRadius: 1 }}>
          <Typography variant="overline">{format(new Date(created), "PP")}</Typography>
          <Divider />
          <Typography>{guests} guests</Typography>
          <Typography>
            {format(new Date(dateFrom), "PP")} - {format(new Date(dateTo), "PP")}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
export default BookingsVenue;
