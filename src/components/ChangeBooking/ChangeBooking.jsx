import { useState } from "react";
import { Delete, MoreHorizRounded, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { format } from "date-fns";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

/**
 * Cancel booking.
 * @param {string} id - The unique id of the booking.
 * @param {string} title - The title of the booked venue.
 * @param {string} dateFrom - The date the booking starts.
 * @param {string} dateTo - The date the booking ends.
 * @returns Menu with cancel booking modal.
 */
function ChangeBooking({ id, title, dateFrom, dateTo }) {
  const [openCancel, setOpenCancel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isFormError, setIsFormError] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleModalClick = () => {
    setOpenCancel(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenCancel(false);
  };

  async function handleDelete() {
    try {
      setIsFormLoading(true);
      const data = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/bookings/${id}`, data);
      if (response.ok) {
        setAnchorEl(null);
        setOpenCancel(false);
        navigate(0);
      } else {
        console.log(response);
        setIsFormError(true);
      }
    } catch (error) {
      console.log(error);
      setIsFormError(true);
    } finally {
      setIsFormLoading(false);
    }
  }

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="booking-options-button"
        aria-controls={open ? "booking-options-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreHorizRounded />
      </IconButton>
      <Menu
        id="booking-options-menu"
        MenuListProps={{
          "aria-labelledby": "booking-options-button",
        }}
        anchorEl={anchorEl}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={open}
        onClose={handleClose}>
        <MenuItem id="cancel" onClick={handleModalClick}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          Cancel booking
          <Dialog open={openCancel} onClose={handleClose}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <DialogTitle>Cancel this booking?</DialogTitle>
              <IconButton onClick={handleClose} sx={{ mr: 2, "&:hover": { backgroundColor: "inherit" } }}>
                <Close />
              </IconButton>
            </Box>
            <DialogContent sx={{ m: "auto", p: 4 }}>
              <DialogContentText mb={2}>
                {title}, {format(new Date(dateFrom), "PP")} - {format(new Date(dateTo), "PP")}
              </DialogContentText>
              <DialogContentText>This will cancel the booking. You cannot undo this action.</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mb: 2, mr: 2 }}>
              <Button variant="contained" color="error" disableElevation onClick={handleDelete}>
                Cancel
              </Button>
            </DialogActions>
            {isFormLoading && <Loader />}
          </Dialog>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ChangeBooking;
