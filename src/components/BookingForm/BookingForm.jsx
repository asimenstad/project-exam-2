import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { CheckCircleOutlineRounded, Close, ErrorOutlineRounded } from "@mui/icons-material";
import BookingCalendar from "../BookingCalendar.jsx/BookingCalendar";
import { useAuth } from "../../hooks/useAuth";
import { differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";

function BookingForm({ bookings, maxGuests, price, id }) {
  const { authFetch, user, isLoading, isError } = useAuth();
  const [bookingDates, setBookingDates] = useState({});
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

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

  const handleClose = () => {
    setOpenModal(false);
    navigate(0);
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
    setOpenModal(true);
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
      {user ? (
        <Button type="submit" variant="contained" disableElevation fullWidth>
          Book
        </Button>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          <Link to="/login">
            <Button fullWidth variant="contained" disableElevation>
              Login
            </Button>
          </Link>
          or
          <Link to="/register">
            <Button fullWidth variant="contained" disableElevation>
              Sign up
            </Button>
          </Link>
        </Box>
      )}
      <Dialog open={openModal} onClose={handleClose}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isError ? (
              <>
                <ErrorOutlineRounded /> Error
              </>
            ) : (
              <>
                <CheckCircleOutlineRounded /> Booking Confirmed!
              </>
            )}
          </DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: 2, "&:hover": { backgroundColor: "inherit" } }}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          {isError ? <>An error occurred.</> : <>Check your email for a booking confirmation. Have a nice stay!</>}
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="contained" disableElevation onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
}

export default BookingForm;
