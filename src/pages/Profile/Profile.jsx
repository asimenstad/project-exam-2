import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

function Profile() {
  const auth = useAuth();
  const {
    user: { name, email, avatar, venueManager, accessToken },
  } = auth;

  return (
    <Container component="main" sx={{ minHeight: "90vh" }}>
      <Grid container>
        <Grid item>
          <Typography component="h1" variant="h2">
            {name}
          </Typography>
        </Grid>
        {venueManager ? <Grid item>Create venue form</Grid> : <Grid item></Grid>}
      </Grid>
    </Container>
  );
}

export default Profile;
