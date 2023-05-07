import React, { useState } from "react";
import { Avatar, Box, Button, Modal, Typography, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../hooks/useAuth";

function ProfileInfo({ avatar, name, email, venueManager }) {
  const { user, authFetch } = useAuth();
  const [open, setOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState(avatar);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleChange(e) {
    const inputValue = e.target.value;
    setNewAvatar(inputValue);
  }

  function handleDelete() {
    const data = {
      avatar: null,
    };
    authFetch(data, "PUT", `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/media`);
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      avatar: newAvatar,
    };
    authFetch(data, "PUT", `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/media`);
    setOpen(false);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        bgcolor: "white",
        borderRadius: 1,
      }}>
      <Avatar sx={{ width: 100, height: 100 }} src={avatar ? avatar : undefined} />
      <Typography component="h1" variant="h2" sx={{ marginTop: 2 }}>
        {name}
      </Typography>
      <Typography variant="body2">{email}</Typography>
      {venueManager && <Typography variant="body1">Venue manager</Typography>}
      <Button onClick={handleOpen} startIcon={<EditIcon />} sx={{ marginTop: 2 }}>
        Edit avatar
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 6,
            borderRadius: 1,
          }}>
          <Avatar sx={{ width: 100, height: 100 }} src={newAvatar} />
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name="avatar"
              fullWidth
              id="avatar"
              label="Avatar (URL)"
              autoFocus
              size="small"
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mt: 2 }}>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
              <Button type="submit" variant="contained">
                confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ProfileInfo;
