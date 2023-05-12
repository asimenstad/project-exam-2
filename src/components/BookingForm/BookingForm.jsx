import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Box, Divider, Grid } from "@mui/material";
import BookingCalendar from "../BookingCalendar.jsx/BookingCalendar";
import { useAuth } from "../../hooks/useAuth";
import { differenceInDays } from "date-fns";

function BookingForm({ bookings, maxGuests, price, id }) {
  const { authFetch } = useAuth();
  const [bookingDates, setBookingDates] = useState({});
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(1);

  const handleCalendarChange = (ranges) => {
    setBookingDates(ranges);
    setNights(differenceInDays(ranges.endDate, ranges.startDate));
  };

  useEffect(() => {
    setTotalPrice(price * nights);
  }, [nights]);

  const handleGuestChange = (e) => {
    setGuests(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      dateFrom: new Date(bookingDates.startDate),
      dateTo: new Date(bookingDates.endDate),
      guests: parseInt(guests),
      venueId: id,
    };
    console.log(data);
    authFetch(data, "POST", "https://api.noroff.dev/api/v1/holidaze/bookings");
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h2">Book your stay</Typography>
      {bookings && <BookingCalendar onChange={handleCalendarChange} bookings={bookings} />}
      <TextField
        id="guests"
        label="Guests"
        type="number"
        fullWidth
        size="small"
        onChange={handleGuestChange}
        value={guests}
        inputProps={{ min: 1, max: maxGuests }}
      />
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{nights} night(s)</Typography>
          <Typography>{price} KR</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 600 }}>Total</Typography>
          <Typography sx={{ fontWeight: 600 }}>{totalPrice} KR</Typography>
        </Box>
      </Box>
      <Button type="submit" variant="contained" disableElevation fullWidth>
        Book
      </Button>
    </Box>
  );
}

export default BookingForm;
