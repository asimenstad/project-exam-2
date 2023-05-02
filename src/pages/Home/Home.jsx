import React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Venues from "../../components/Venues/Venues.jsx";

function Home() {
  return (
    <Container component="main">
      <Typography variant="h1">Venues</Typography>
      <Venues></Venues>
    </Container>
  );
}

export default Home;
