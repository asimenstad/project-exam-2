import React from "react";
import { Box, Container, Grid, Typography, TextField, FormControlLabel, Checkbox, Button, Link } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  function handleChange(e) {
    const inputValue = e.target.value;
    if (e.target.name === "email") {
      setEmail(inputValue);
    }
    if (e.target.name === "password") {
      setPassword(inputValue);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    auth.login(data, "https://api.noroff.dev/api/v1/holidaze/auth/login");
  }

  return (
    <Container component="main" sx={{ minHeight: "90vh" }}>
      <Grid container>
        <Grid
          item
          xs={false}
          md={5}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1613425653628-23fd58c3c2b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "center",
            width: "100%",
          }}
        />
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingInline: 6,
            paddingBlock: 15,
          }}>
          <Typography variant="h2" component="h1">
            Welcome back
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              onChange={handleChange}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
              Log In
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
