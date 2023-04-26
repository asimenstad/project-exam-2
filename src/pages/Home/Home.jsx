import React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Venues from "../../components/Venues/Venues.jsx";

function Home() {
  return (
    <main>
      <Container>
        <Typography variant="h1" className="visuallyHidden">
          Venues
        </Typography>
        <Venues></Venues>
      </Container>
    </main>
  );
}

export default Home;
