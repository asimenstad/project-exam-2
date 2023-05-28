import { Navigate, useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.jsx";
import { Avatar, Box, Container, Divider, Grid, Typography, Breadcrumbs, Link, CircularProgress } from "@mui/material";
import {
  CoffeeRounded,
  DirectionsCarRounded,
  PetsRounded,
  PlaceRounded,
  StarRounded,
  WifiRounded,
} from "@mui/icons-material";
import ChangeVenue from "../../components/ChangeVenue/ChangeVenue.jsx";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";
import BookingsVenue from "../../components/BookingsVenue/BookingsVenue.jsx";
import MediaCarousel from "../../components/MediaCarousel/MediaCarousel.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";

function SpecificVenue() {
  const { user } = useAuth();
  const { id } = useParams();
  const { data, isLoading, isError } = useApi(
    `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
  );

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
    rating,
  } = data;

  if (!media || media.length === 0) {
    media = ["https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"];
  }

  return isLoading ? (
    <Container
      component="main"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      <CircularProgress />
    </Container>
  ) : isError ? (
    <Navigate replace to={"/"} />
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
      <MediaCarousel media={media} />
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar src={avatar} />
            <Typography sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
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
          <Box sx={{ marginBlock: 2 }}>
            <Typography sx={{ fontWeight: 600, display: "flex", gap: 1 }}>
              <Box component="span"> {price} KR night</Box> &#183; <Box component="span">{maxGuests} guest(s)</Box>{" "}
              &#183;
              <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
                <StarRounded />
                {rating}
              </Box>
            </Typography>
            <Typography mt={1}>{description}</Typography>
          </Box>
          <Divider />
          <Typography variant="h2" sx={{ marginBlock: 2 }}>
            This place offers
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: !wifi && "line-through",
                color: !wifi && "gray",
              }}>
              <WifiRounded sx={{ color: !wifi && "gray" }} /> <Typography>Wifi</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: !parking && "line-through",
                color: !parking && "gray",
              }}>
              <DirectionsCarRounded sx={{ color: !parking && "gray" }} /> <Typography>Parking</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: !pets && "line-through",
                color: !pets && "gray",
              }}>
              <PetsRounded sx={{ color: !pets && "gray" }} /> <Typography>Pets allowed</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: !breakfast && "line-through",
                color: !breakfast && "gray",
              }}>
              <CoffeeRounded sx={{ color: !breakfast && "gray" }} /> <Typography>Breakfast included</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs="auto" sx={{ mx: { xs: "auto", sm: 0 } }}>
          {user && user.name === name ? (
            <BookingsVenue bookings={bookings} />
          ) : (
            <BookingForm price={price} id={venueId} bookings={bookings} maxGuests={maxGuests} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default SpecificVenue;
