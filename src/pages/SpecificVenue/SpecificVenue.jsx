import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.jsx";
import { Avatar, Box, Button, Container, Divider, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PetsIcon from "@mui/icons-material/Pets";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import BedIcon from "@mui/icons-material/Bed";
import Calendar from "../../components/Calendar/Calendar.jsx";
import TextField from "@mui/material/TextField";

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
    location: { city, country } = {},
    meta: { pets, parking, breakfast, wifi } = {},
    owner: { name, avatar } = {},
    bookings,
  } = data;

  if (!media || media.length === 0) {
    media = [
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    ];
  }

  const cols = media.length <= 4 ? media.length : 2;
  const rows = Math.ceil(media.length / cols);

  return (
    <Container component="main">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="h2">{city}</Typography>
      <Typography></Typography>
      <ImageList variant="quilted" cols={cols} rows={rows}>
        {media.map((image, index) => (
          <ImageListItem key={image + index}>
            <img width="100%" src={image} alt={`${title}`} />
          </ImageListItem>
        ))}
      </ImageList>
      <Grid container columns={2} spacing={4} justifyContent="space-between">
        <Grid item xs={2} md={1}>
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <BedIcon /> <Typography variant="body1"> {maxGuests} guest(s) allowed</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, textDecoration: !wifi && "line-through" }}>
              <WifiIcon /> <Typography variant="body1">Wifi</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, textDecoration: !parking && "line-through" }}>
              <DirectionsCarIcon /> <Typography variant="body1">Parking</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, textDecoration: !pets && "line-through" }}>
              <PetsIcon /> <Typography variant="body1">Pets allowed</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, textDecoration: !breakfast && "line-through" }}>
              <FreeBreakfastIcon /> <Typography variant="body1">Breakfast included</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2} md="auto" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h2">Book your stay</Typography>
          {bookings && <Calendar bookedDates={bookings} />}
          <TextField
            id="filled-number"
            label="Guests"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            size="small"
            inputProps={{ min: 1, max: maxGuests }}
          />
          <Button variant="contained" disableElevation fullWidth>
            Book
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SpecificVenue;
