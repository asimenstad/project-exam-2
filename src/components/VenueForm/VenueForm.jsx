import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  Avatar,
} from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

function VenueForm() {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [guests, setGuests] = useState(0);
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

  function handleChange(e) {
    const inputValue = e.target.value;
    const checkedValue = e.target.checked;

    switch (e.target.name) {
      case "name":
        setName(inputValue);
      case "description":
        setDescription(inputValue);
      case "price":
        setPrice(inputValue);
      case "guests":
        setGuests(inputValue);
      case "media":
        setMediaString(inputValue);
      case "address":
        setAddress(inputValue);
      case "city":
        setCity(inputValue);
      case "country":
        setCountry(inputValue);
      case "continent":
        setContinent(inputValue);
      case "zip":
        setZip(inputValue);
      case "wifi":
        setWifi(checkedValue);
      case "parking":
        setParking(checkedValue);
      case "pets":
        setPets(checkedValue);
      case "breakfast":
        setBreakfast(checkedValue);
    }
  }

  function handleAddMedia() {
    setMedia((prevMedia) => [...prevMedia, mediaString]);
    setMediaString("");
  }

  console.log(media);

  function handleRemoveMedia(index) {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      price: price,
      guests: guests,
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
    console.log(data);
    //  auth.createVenue(data, "https://api.noroff.dev/api/v1/holidaze/venues");
  }
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h2">Add venue</Typography>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <TextField
              name="name"
              required
              fullWidth
              id="name"
              label="Name of venue"
              autoFocus
              size="small"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              name="description"
              required
              fullWidth
              multiline
              rows={3}
              id="description"
              label="Description"
              autoFocus
              size="small"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              name="price"
              type="number"
              required
              fullWidth
              id="price"
              label="Price"
              autoFocus
              size="small"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              id="guests"
              required
              label="Guests"
              type="number"
              fullWidth
              size="small"
              inputProps={{ min: 1 }}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <FormControl variant="outlined" fullWidth>
              <InputLabel size="small" htmlFor="media">
                Media
              </InputLabel>
              <OutlinedInput
                name="media"
                type="url"
                fullWidth
                id="media"
                label="Media"
                autoFocus
                size="small"
                value={mediaString}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleAddMedia}>
                      <AddPhotoAlternate />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="address"
                    id="address"
                    label="Address"
                    autoFocus
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="city"
                    id="city"
                    label="City"
                    autoFocus
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="country"
                    id="country"
                    label="Country"
                    autoFocus
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="continent"
                    id="continent"
                    label="Continent"
                    autoFocus
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth name="zip" id="zip" label="Zip" autoFocus size="small" onChange={handleChange} />
                </Grid>
              </Grid>
            </FormGroup>
          </Box>
          <Box>
            <FormControl component="fieldset">
              <FormLabel>Amenities</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox name="wifi" color="primary" />}
                  label="Wifi"
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox name="parking" color="primary" />}
                  label="Parking"
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox name="pets" color="primary" />}
                  label="Pets"
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox name="breakfast" color="primary" />}
                  label="Breakfast"
                  onChange={handleChange}
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Add venue
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VenueForm;
