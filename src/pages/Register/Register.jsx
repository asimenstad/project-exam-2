import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Divider,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

function Register() {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [manager, setManager] = useState("");

  function handleChange(e) {
    const inputValue = e.target.value;
    if (e.target.name === "name") {
      setName(inputValue);
    }
    if (e.target.name === "email") {
      setEmail(inputValue);
    }
    if (e.target.name === "password") {
      setPassword(inputValue);
    }
    if (e.target.name === "password") {
      setPassword(inputValue);
    }
    if (e.target.name === "venueManager") {
      setManager(inputValue);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      manager,
    };
    auth.register(data, "https://api.noroff.dev/api/v1/holidaze/auth/register");
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
            Welcome
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2} my={1}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} my={2}>
                <Divider>
                  <Typography>Do you want to become a venue manager?</Typography>
                </Divider>
                <FormControlLabel
                  control={<Checkbox name="venueManager" value={true} color="primary" onChange={handleChange} />}
                  label="Yes, I want to become a venue manager."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
