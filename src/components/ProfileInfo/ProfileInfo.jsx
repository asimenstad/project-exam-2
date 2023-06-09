import { Avatar, Box, Typography } from "@mui/material";
import ChangeAvatar from "../ChangeAvatar/ChangeAvatar";

/**
 * Profile of user.
 * @param {Object} data - The user data.
 * @param {string} data.avatar - The URL of the profile avatar.
 * @param {string} data.name - The name of the user.
 * @param {string} data.email - The email of the user.
 * @param {boolean} data.venueManager - Whether the user is a venue manager or not.
 * @returns Profile info card.
 */
function ProfileInfo({ avatar, name, email, venueManager }) {
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
      <ChangeAvatar avatar={avatar} />
    </Box>
  );
}

export default ProfileInfo;
