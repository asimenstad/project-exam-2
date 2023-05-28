import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Link,
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Button,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { HolidayVillageRounded } from "@mui/icons-material";

function Header() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const avatarLetter = user.name.charAt(0).toUpperCase();

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutUser = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              variant="h6"
              sx={{
                fontFamily: "Comfortaa",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}>
              <HolidayVillageRounded /> Holidaze
            </Link>
          </Box>
          {user ? (
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#000" }} alt={user.name}>
                  {avatarLetter}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.10))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 23,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <Link to="/profile">
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={logoutUser}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <NavLink to="/login">
                <Button variant="contained" disableElevation>
                  Login
                </Button>
              </NavLink>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
