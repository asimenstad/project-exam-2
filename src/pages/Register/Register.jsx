import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
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

function Register() {
  const { register, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [manager, setManager] = useState(true);

  function handleChange(e) {
    const inputValue = e.target.value;
    const checkedValue = e.target.checked;

    switch (e.target.name) {
      case "name":
        setName(inputValue);
        break;
      case "email":
        setEmail(inputValue);
        break;
      case "password":
        setPassword(inputValue);
        break;
      case "venueManager":
        setManager(checkedValue);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      venueManager: manager,
    };
    register(data, "https://api.noroff.dev/api/v1/holidaze/auth/register");
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
                  helperText="Must not contain punctuation symbols apart from underscore (_)."
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  helperText="Must be a valid stud.noroff.no or noroff.no email address."
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
                  id="password"
                  helperText="Must be at least 8 characters."
                  autoComplete="new-password"
                  size="small"
                  type="password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} my={2}>
                <Divider>
                  <Typography>Do you want to become a venue manager?</Typography>
                </Divider>
                <FormControlLabel
                  control={<Checkbox name="venueManager" color="primary" onChange={handleChange} />}
                  label="Yes, I want to become a venue manager."
                />
              </Grid>
            </Grid>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
            <Button id="submit" type="submit" fullWidth variant="contained" disableElevation sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
