import { useEffect, useState } from "react";
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
  DialogContentText,
} from "@mui/material";
import { CheckCircleOutlineRounded, Close, ErrorOutlineRounded } from "@mui/icons-material";
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import { useAuth } from "../../hooks/useAuth";
import { differenceInDays, isValid } from "date-fns";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

/**
 *
 * @param {array} bookings - All booked dates on venue.
 * @param {number} maxGuests - The maximum number of guests.
 * @param {number} price - The price of the venue.
 * @param {string} id - The unique id of the venue.
 * @returns Booking form.
 */
function BookingForm({ bookings, maxGuests, price, id }) {
  const { user } = useAuth();
  const [bookingDates, setBookingDates] = useState({});
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(1);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [dateError, setDateError] = useState("");
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleCalendarChange = (ranges) => {
    setBookingDates(ranges);
    setNights(differenceInDays(ranges.endDate, ranges.startDate));
    setDateError("");
  };

  useEffect(() => {
    setTotalPrice(price * nights);
  }, [nights]);

  const handleGuestChange = (e) => {
    setGuests(e.target.value);
  };

  const handleClose = () => {
    setOpenSuccess(false);
    setOpenError(false);
    navigate(0);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      dateFrom: new Date(bookingDates.startDate),
      dateTo: new Date(bookingDates.endDate),
      guests: parseInt(guests),
      venueId: id,
    };
    if (
      data.dateFrom === null ||
      data.dateTo === null ||
      isValid(data.dateFrom) === false ||
      isValid(data.dateTo) === false
    ) {
      setDateError("Please select available dates.");
    } else {
      try {
        setIsFormLoading(true);
        const postData = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(data),
        };
        const response = await fetch("https://api.noroff.dev/api/v1/holidaze/bookings", postData);
        const json = await response.json();
        if (response.ok) {
          console.log(json);
          setOpenSuccess(true);
        } else {
          console.log(response);
          setOpenError(true);
        }
      } catch (error) {
        console.log(error);
        setOpenError(true);
      } finally {
        setIsFormLoading(false);
      }
    }
  }
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, position: "relative" }}>
        <Typography variant="h2">Book your stay</Typography>
        {bookings && <BookingCalendar onChange={handleCalendarChange} bookings={bookings} />}
        <Typography variant="body1" color="error">
          {dateError}
        </Typography>
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
            <Typography>Per night</Typography>
            <Typography>{price} KR</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{nights} night(s)</Typography>
            <Typography>{totalPrice} KR</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
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
          <Link to="/login">
            <Button fullWidth variant="contained" disableElevation>
              Login to book
            </Button>
          </Link>
        )}
        {isFormLoading && <Loader />}
      </Box>
      <Dialog open={openSuccess} onClose={handleClose}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleOutlineRounded /> Booking Confirmed!
          </DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: 2, "&:hover": { backgroundColor: "inherit" } }}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText>Check your email for a booking confirmation. Have a nice stay!</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="contained" disableElevation onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openError} onClose={handleClose}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ErrorOutlineRounded /> Unable to complete booking
          </DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: 2, "&:hover": { backgroundColor: "inherit" } }}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText>We could not complete your booking. Please try again.</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="contained" disableElevation onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BookingForm;
