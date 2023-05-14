import React, { useState, useRef } from "react";
import { useApi } from "../../hooks/useApi";
import { Container, Grid, Typography, Link, Breadcrumbs } from "@mui/material";
import VenueCard from "../../components/VenueCard/VenueCard";
import VenueForm from "../../components/VenueForm/VenueForm";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import { withFormik } from "formik";
import { useAuth } from "../../hooks/useAuth";
import Bookings from "../../components/Bookings/Bookings";

function Profile() {
  const { authFetch } = useAuth();
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

  const AddVenueForm = withFormik({
    mapPropsToValues: () => ({
      venueName: "",
      description: "",
      price: 0,
      maxGuests: 0,
      mediaArray: [],
      mediaString: "",
      address: "",
      city: "",
      country: "",
      continent: "",
      zip: "",
      wifi: false,
      parking: false,
      pets: false,
      breakfast: false,
    }),
    handleSubmit: (values, { setSubmitting }) => {
      const data = {
        name: values.venueName,
        description: values.description,
        price: parseInt(values.price),
        maxGuests: parseInt(values.maxGuests),
        media: values.mediaArray,
        location: {
          address: values.address,
          city: values.city,
          country: values.country,
          continent: values.continent,
          zip: values.zip,
        },
        meta: {
          wifi: values.wifi,
          parking: values.parking,
          pets: values.pets,
          breakfast: values.breakfast,
        },
      };

      authFetch(data, "POST", "https://api.noroff.dev/api/v1/holidaze/venues");
    },
  })(VenueForm);

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
          {venueManager && (
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
              <AddVenueForm />
            </Grid>
          )}
          {venueManager && (
            <Grid item xs={12}>
              <Typography variant="h2" sx={{ mb: 1 }}>
                Your venues
              </Typography>
              <Grid container columns={6} rowGap={6} columnSpacing={3}>
                {venues &&
                  venues.map(
                    ({ id, name: title, location, media, price, rating, meta: { wifi, parking, breakfast, pets } }) => (
                      <Grid key={id} item xs={6} sm={3} md={2}>
                        <Link to={`../${id}`}>
                          <VenueCard
                            title={title}
                            media={media[0]}
                            wifi={wifi}
                            location={location}
                            parking={parking}
                            breakfast={breakfast}
                            pets={pets}
                            rating={rating}
                            price={price}
                          />
                        </Link>
                      </Grid>
                    )
                  )}
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              Your upcoming bookings
            </Typography>
            <Bookings />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Profile;
