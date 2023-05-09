import React from "react";
import { useApi } from "../../hooks/useApi";
import { Container, Grid, Typography, Link, Breadcrumbs } from "@mui/material";
import VenueCard from "../../components/VenueCard/VenueCard";
import VenueForm from "../../components/VenueForm/VenueForm";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };
  const { data, isLoading, isError } = useApi(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}?_venues=true&_bookings=true`,
    options
  );

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  const { name, email, avatar, venueManager, bookings, venues } = data;
  return (
    <Container component="main" sx={{ minHeight: "90vh" }}>
      {user && (
        <Grid container gap={4}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumbs">
              <Link to="/" color="inherit">
                Home
              </Link>
              <Typography color="text.primary">Profile</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid xs={12} md={3} item>
            <ProfileInfo avatar={avatar} name={name} email={email} venueManager={venueManager} />
          </Grid>
          <Grid
            item
            xs={12}
            md={8.5}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 4,
              bgcolor: "white",
              borderRadius: 1,
            }}>
            {venueManager ? <VenueForm /> : <Typography>View bookings calendar</Typography>}
          </Grid>
          {venueManager && (
            <Grid item xs={12}>
              <Typography variant="h2">Your venues</Typography>
              <Grid container columns={6} rowGap={6} columnSpacing={3}>
                {venues &&
                  venues.map(
                    ({
                      id,
                      name: title,
                      location: { city },
                      media,
                      price,
                      rating,
                      meta: { wifi, parking, breakfast, pets },
                    }) => (
                      <Grid key={id} item xs={6} sm={3} md={2}>
                        <Link to={`../${id}`}>
                          <VenueCard
                            title={title}
                            media={media[0]}
                            location={city}
                            wifi={wifi}
                            parking={parking}
                            breakfast={breakfast}
                            pets={pets}
                            rating={rating}
                            price={price}
                            venueManager={venueManager}></VenueCard>
                        </Link>
                      </Grid>
                    )
                  )}
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h2">Upcoming bookings</Typography>
            {bookings &&
              bookings.map(
                ({
                  id,
                  name: title,
                  location: { city },
                  media,
                  price,
                  rating,
                  meta: { wifi, parking, breakfast, pets },
                }) => (
                  <Grid key={id} item xs={6} sm={3} md={2}>
                    <Link to={id}>
                      <VenueCard
                        title={title}
                        media={media[0]}
                        location={city}
                        wifi={wifi}
                        parking={parking}
                        breakfast={breakfast}
                        pets={pets}
                        rating={rating}
                        price={price}></VenueCard>
                    </Link>
                  </Grid>
                )
              )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Profile;
