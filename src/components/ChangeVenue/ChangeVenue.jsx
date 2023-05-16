import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { withFormik } from "formik";
import { useAuth } from "../../hooks/useAuth";
import VenueForm from "../VenueForm/VenueForm";

function ChangeVenue({
  id,
  venueName,
  description,
  price,
  maxGuests,
  mediaArray,
  address,
  city,
  country,
  continent,
  zip,
  wifi,
  parking,
  pets,
  breakfast,
}) {
  const { authFetch, authDelete } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = (e) => {
    if (e.target.id === "edit") {
      setOpenEdit(true);
    }
    if (e.target.id === "delete") {
      setOpenDelete(true);
    }
  };

  const handleClose = (e) => {
    setOpenEdit(false);
    setOpenDelete(false);
  };

  const EditVenue = withFormik({
    mapPropsToValues: () => ({
      venueName: venueName,
      description: description,
      price: price,
      maxGuests: maxGuests,
      mediaArray: mediaArray,
      mediaString: "",
      address: address,
      city: city,
      country: country,
      continent: continent,
      zip: zip,
      wifi: wifi,
      parking: parking,
      pets: pets,
      breakfast: breakfast,
    }),
    handleSubmit: (values, { setSubmitting }) => {
      const data = {
        name: values.venueName,
        description: values.description,
        price: parseInt(values.price),
        maxGuests: parseInt(values.maxGuests),
        media: values.mediaArray,
        location: {
          address: values.address,
          city: values.city,
          country: values.country,
          continent: values.continent,
          zip: values.zip,
        },
        meta: {
          wifi: values.wifi,
          parking: values.parking,
          pets: values.pets,
          breakfast: values.breakfast,
        },
      };
      console.log(data);
      authFetch(data, "PUT", `https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
    },
  })(VenueForm);

  function handleDelete() {
    authDelete(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
  }

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button id="delete" variant="outlined" color="error" onClick={handleClickOpen}>
        Delete
      </Button>
      <Button id="edit" variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={openEdit} onClose={handleClose}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>Edit venue</DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: 2, "&:hover": { backgroundColor: "inherit" } }}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          <EditVenue />
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onClose={handleClose}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>Delete this venue?</DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: 2, "&:hover": { backgroundColor: "inherit" } }}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent sx={{ m: "auto", p: 4 }}>
          <DialogContentText>This will delete the venue permanently. You cannot undo this action.</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="contained" color="error" disableElevation onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ChangeVenue;
