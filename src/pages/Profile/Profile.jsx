import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";
import { Button, Container, Grid, Typography, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VenueCard from "../../components/VenueCard/VenueCard";

function Profile() {
  const { user } = useAuth();
  const options = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };
  const { data, isLoading, isError } = useApi(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}?_owner=true&_bookings=true`,
    options
  );

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const { name, email, avatar, venueManager, bookings, _count } = data;

  return (
    <Container component="main" sx={{ minHeight: "90vh" }}>
      {user && (
        <Grid container gap={4}>
          <Grid
            xs={1}
            md={3}
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
              bgcolor: "white",
              borderRadius: 1,
            }}>
            {avatar ? (
              <Avatar sx={{ width: 80, height: 80 }} src={avatar} />
            ) : (
              <Avatar sx={{ width: 80, height: 80 }}></Avatar>
            )}
            <Typography component="h1" variant="h2" sx={{ marginTop: 2 }}>
              {name}
            </Typography>
            <Typography variant="body2">{email}</Typography>
            {venueManager && <Typography variant="body1">Venue manager</Typography>}
            <Button startIcon={<EditIcon />} sx={{ marginTop: 2 }}>
              Edit avatar
            </Button>
          </Grid>
          {venueManager ? (
            <Grid item xs={1} md={9}>
              Create venue form
            </Grid>
          ) : (
            <Grid item>View bookings calendar</Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h2">Upcoming bookings</Typography>
            {bookings.length > 0 ? (
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
              )
            ) : (
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                You have no upcoming bookings
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Profile;
