import React from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi.jsx";
import { Container, Typography } from "@mui/material";

function SpecificVenue() {
  const { id } = useParams();
  const { data, isLoading, isError } = useApi(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
  const { name, description, media, price, maxGuests, rating, created, updated } = data;
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Container>
      <Typography variant="h1">{name}</Typography>
    </Container>
  );
}

export default SpecificVenue;
