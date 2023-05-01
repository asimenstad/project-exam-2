import React from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi.jsx";
import { Avatar, Box, Container, Divider, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PetsIcon from "@mui/icons-material/Pets";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";

function SpecificVenue() {
  const { id } = useParams();
  const { data, isLoading, isError } = useApi(
    `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
  );
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  let {
    name: title,
    description,
    media,
    price,
    maxGuests,
    rating,
    created,
    updated,
    meta: { pets, parking, breakfast, wifi } = {},
    owner: { name, avatar } = {},
  } = data;

  if (!media || media.length === 0) {
    media = [
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    ];
  }

  const cols = media.length <= 4 ? media.length : 2;
  const rows = Math.ceil(media.length / cols);

  return (
    <Container>
      <Typography variant="h1">{title}</Typography>
      <Typography></Typography>
      <ImageList variant="quilted" cols={cols} rows={rows}>
        {media.map((image) => (
          <ImageListItem key={image}>
            <img width="100%" src={image} alt={`${name}`} />
          </ImageListItem>
        ))}
      </ImageList>
      <Grid container columns={2}>
        <Grid item xs={2} lg={1}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar src={avatar} />
            <Typography variant="body1" sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
              Owner
              <Box component="span" sx={{ fontWeight: "600" }}>
                {name}
              </Box>
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ marginBlock: 2 }}>
            {description}
          </Typography>
          <Divider />
          <Typography variant="h2" sx={{ marginBlock: 2 }}>
            This place offers
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {wifi && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <WifiIcon /> Wifi
              </Box>
            )}
            {parking && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <DirectionsCarIcon /> Parking
              </Box>
            )}
            {pets && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PetsIcon /> Pets allowed
              </Box>
            )}
            {breakfast && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FreeBreakfastIcon /> Breakfast
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={2} lg={1}></Grid>
      </Grid>
    </Container>
  );
}

export default SpecificVenue;
