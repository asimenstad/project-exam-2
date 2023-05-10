import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

function ChangeVenue() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    if (e.target.id === "edit") {
      setOpenEdit(true);
    }
    if (e.target.id === "delete") {
      setOpenDelete(true);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpenEdit(false);
    setOpenDelete(false);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }} onClick={(e) => e.preventDefault()}>
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
        <DialogContent></DialogContent>
      </Dialog>
      <Dialog open={openDelete} onClose={handleClose}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>Delete venue</DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: 2, "&:hover": { backgroundColor: "inherit" } }}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent sx={{ m: "auto", p: 4 }}>
          <Button variant="contained" color="error" disableElevation>
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ChangeVenue;
