import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button, Dialog, DialogContent, DialogTitle, Avatar, Box, TextField, IconButton } from "@mui/material";
import { Close, EditRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/**
 * Changes or deletes user avatar.
 * @param {string} avatar - The URL of the profile avatar.
 * @returns Modal with form.
 */
function ChangeAvatar({ avatar }) {
  const { user } = useAuth();
  const [newAvatar, setNewAvatar] = useState(avatar);
  const [open, setOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [isFormError, setIsFormError] = useState(false);
  const navigate = useNavigate();

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

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      avatar: newAvatar,
    };
    try {
      setIsFormLoading(true);
      const postData = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/media`, postData);
      if (response.ok) {
        setIsFormError(false);
        setOpen(false);
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
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
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
