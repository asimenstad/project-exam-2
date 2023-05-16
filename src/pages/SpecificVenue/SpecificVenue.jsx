import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.jsx";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@mui/material";
import {
  BedRounded,
  CoffeeRounded,
  DirectionsCarRounded,
  PetsRounded,
  PlaceRounded,
  WifiRounded,
} from "@mui/icons-material";
import ChangeVenue from "../../components/ChangeVenue/ChangeVenue.jsx";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";

function SpecificVenue() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const { data, isLoading, isError } = useApi(
    `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
  );

  if (isError) {
    return <div>Error</div>;
  }

  let {
    name: title,
    description,
    media,
    price,
    maxGuests,
    location: { city, country, address, continent, zip } = {},
    meta: { pets, parking, breakfast, wifi } = {},
    owner: { name, avatar } = {},
    bookings,
    id: venueId,
  } = data;

  if (!media || media.length === 0) {
    media = ["https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"];
  }
  const cols = media.length <= 4 ? media.length : 2;
  const rows = Math.ceil(media.length / cols);

  return isLoading ? (
    <Container
      component="main"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      <CircularProgress />
    </Container>
  ) : (
    <Container component="main">
      <Breadcrumbs aria-label="breadcrumbs">
        <Link to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="h2" sx={{ display: "flex", alignItems: "center" }}>
        <PlaceRounded /> {city ? city : country ? country : continent ? continent : "unknown"}
      </Typography>
      <ImageList variant="quilted" cols={cols} rows={rows} rowHeight={600}>
        {media.map((image, index) => (
          <ImageListItem key={image + index}>
            <img width="100%" src={image} alt={`${title}`} />
          </ImageListItem>
        ))}
      </ImageList>
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} sm={7}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar src={avatar} />
            <Typography variant="body1" sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
              Owner
              <Box component="span" sx={{ fontWeight: "600" }}>
                {name}
              </Box>
            </Typography>
            {user && user.name === name && (
              <>
                <Divider orientation="vertical" variant="middle" flexItem />
                <ChangeVenue
                  id={id}
                  venueName={title}
                  description={description}
                  price={price}
                  maxGuests={maxGuests}
                  mediaArray={media}
                  address={address}
                  city={city}
                  country={country}
                  continent={continent}
                  zip={zip}
                  wifi={wifi}
                  parking={parking}
                  pets={pets}
                  breakfast={breakfast}
                />
              </>
            )}
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
              <BedRounded /> <Typography variant="body1"> {maxGuests} guest(s) allowed</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, textDecoration: !wifi && "line-through" }}>
              <WifiRounded /> <Typography variant="body1">Wifi</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, textDecoration: !parking && "line-through" }}>
              <DirectionsCarRounded /> <Typography variant="body1">Parking</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, textDecoration: !pets && "line-through" }}>
              <PetsRounded /> <Typography variant="body1">Pets allowed</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, textDecoration: !breakfast && "line-through" }}>
              <CoffeeRounded /> <Typography variant="body1">Breakfast included</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs="auto">
          <BookingForm price={price} id={venueId} bookings={bookings} maxGuests={maxGuests} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SpecificVenue;
