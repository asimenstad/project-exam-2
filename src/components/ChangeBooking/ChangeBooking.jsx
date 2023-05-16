import React, { useState } from "react";
import { Delete, MoreHorizRounded, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { useAuth } from "../../hooks/useAuth";

function ChangeBooking({ id, title, dateFrom, dateTo }) {
  const [openCancel, setOpenCancel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { authDelete, isLoading, isError } = useAuth();

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

  function handleCancel(e) {
    authDelete(`https://api.noroff.dev/api/v1/holidaze/bookings/${id}`);
    setAnchorEl(null);
    setOpenCancel(false);
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
              <Button variant="contained" color="error" disableElevation onClick={handleCancel}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ChangeBooking;
