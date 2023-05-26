import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button, Dialog, DialogContent, DialogTitle, Avatar, Box, TextField, IconButton } from "@mui/material";
import { Close, EditRounded } from "@mui/icons-material";

/**
 * Changes or deletes user avatar.
 * @param {string} avatar - The URL of the profile avatar.
 * @returns Modal with form.
 */
function ChangeAvatar({ avatar }) {
  const { user, authFetch } = useAuth();
  const [newAvatar, setNewAvatar] = useState(avatar);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <Box>
      <Button onClick={handleClickOpen} startIcon={<EditRounded />} sx={{ marginTop: 2 }}>
        Edit avatar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>Edit avatar</DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: 2, "&:hover": { backgroundColor: "inherit" } }}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
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
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mt: 4 }}>
              <Button variant="contained" disableElevation color="error" onClick={handleDelete}>
                Delete
              </Button>
              <Button type="submit" variant="contained" disableElevation>
                confirm
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ChangeAvatar;
