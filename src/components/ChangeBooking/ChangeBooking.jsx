import React, { useState } from "react";
import { Delete, EditRounded, MoreHorizRounded, Close } from "@mui/icons-material";
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
} from "@mui/material";

function ChangeBooking() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleModalClick = (e) => {
    if (e.target.id === "edit") {
      setOpenEdit(true);
    }
    if (e.target.id === "delete") {
      setOpenDelete(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenEdit(false);
    setOpenDelete(false);
  };

  function handleDelete() {}

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
        <MenuItem id="edit" onClick={handleModalClick}>
          <ListItemIcon>
            <EditRounded />
          </ListItemIcon>
          Change booking
          <Dialog open={openEdit} onClose={handleClose}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <DialogTitle>Change booking</DialogTitle>
              <IconButton onClick={handleClose} sx={{ mr: 2, "&:hover": { backgroundColor: "inherit" } }}>
                <Close />
              </IconButton>
            </Box>
            <DialogContent></DialogContent>
            <DialogActions></DialogActions>
          </Dialog>
        </MenuItem>
        <Divider />
        <MenuItem id="delete" onClick={handleModalClick}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          Cancel booking
          <Dialog open={openDelete} onClose={handleClose}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <DialogTitle>Cancel this booking?</DialogTitle>
              <IconButton onClick={handleClose} sx={{ mr: 2, "&:hover": { backgroundColor: "inherit" } }}>
                <Close />
              </IconButton>
            </Box>
            <DialogContent sx={{ m: "auto", p: 4 }}>
              <DialogContentText>This will delete the booking. You cannot undo this action.</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mb: 2, mr: 2 }}>
              <Button variant="contained" color="error" disableElevation onClick={handleDelete}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ChangeBooking;
