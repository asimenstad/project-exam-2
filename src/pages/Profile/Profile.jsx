import React, { useState, useRef } from "react";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";
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
  const { authFetch } = useAuth();
  const [venueName, setVenueName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [zip, setZip] = useState("");
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  const [mediaString, setMediaString] = useState("");
  const [media, setMedia] = useState([]);
  const inputRef = useRef(null);

  function handleChange(e) {
    const inputValue = e.target.value;
    const checkedValue = e.target.checked;

    if (e.target.name === "venueName") {
      setVenueName(inputValue);
    }
    if (e.target.name === "description") {
      setDescription(inputValue);
    }
    if (e.target.name === "price") {
      setPrice(inputValue);
    }
    if (e.target.name === "maxGuests") {
      setMaxGuests(inputValue);
    }
    if (e.target.name === "media") {
      setMediaString(inputValue);
    }
    if (e.target.name === "address") {
      setAddress(inputValue);
    }
    if (e.target.name === "city") {
      setCity(inputValue);
    }
    if (e.target.name === "country") {
      setCountry(inputValue);
    }
    if (e.target.name === "continent") {
      setContinent(inputValue);
    }
    if (e.target.name === "zip") {
      setZip(inputValue);
    }
    if (e.target.name === "wifi") {
      setWifi(checkedValue);
    }
    if (e.target.name === "parking") {
      setParking(checkedValue);
    }
    if (e.target.name === "pets") {
      setPets(checkedValue);
    }
    if (e.target.name === "breakfast") {
      setBreakfast(checkedValue);
    }
  }

  function handleAddMedia() {
    if (mediaString !== "") {
      setMedia((prevMedia) => [...prevMedia, mediaString]);
      setMediaString("");
      inputRef.current.value = "";
    }
  }

  function handleRemoveMedia(index) {
    setMedia((prevMedia) => {
      return prevMedia.filter((_, i) => i !== index);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: venueName,
      description: description,
      price: parseInt(price),
      maxGuests: parseInt(maxGuests),
      media: media,
      location: {
        address: address,
        city: city,
        country: country,
        continent: continent,
        zip: zip,
      },
      meta: {
        wifi: wifi,
        parking: parking,
        pets: pets,
        breakfast: breakfast,
      },
    };
    authFetch(data, "POST", "https://api.noroff.dev/api/v1/holidaze/venues");
  }

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
            {venueManager ? (
              <VenueForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleAddMedia={handleAddMedia}
                handleRemoveMedia={handleRemoveMedia}
                inputRef={inputRef}
                media={media}
              />
            ) : (
              <Typography>View bookings calendar</Typography>
            )}
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
