import React, { useRef, useState } from "react";
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
import { AddPhotoAlternate, Delete } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";

function VenueForm() {
  const auth = useAuth();
  const [name, setName] = useState("");
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
      setName(inputValue);
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
      name: name,
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
    console.log(data);
    auth.createVenue(data, "https://api.noroff.dev/api/v1/holidaze/venues");
  }
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h2">Add venue</Typography>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <TextField
              name="venueName"
              required
              fullWidth
              id="venueName"
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
              name="maxGuests"
              id="maxGuests"
              required
              label="Max guests"
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
                Media (URL)
              </InputLabel>
              <OutlinedInput
                name="media"
                type="url"
                pattern="https://.*"
                fullWidth
                id="media"
                label="Media (URL)"
                autoFocus
                size="small"
                onChange={handleChange}
                inputRef={inputRef}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleAddMedia}>
                      <AddPhotoAlternate />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {media.length === 0 ? (
              <Avatar variant="square" sx={{ marginTop: 1 }}>
                <ImageIcon />
              </Avatar>
            ) : (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 1 }}>
                {media.map((url, index) => (
                  <Box key={url + index} sx={{ position: "relative" }}>
                    <Avatar src={url} variant="square" />
                    <IconButton
                      onClick={() => handleRemoveMedia(index)}
                      sx={{
                        position: "absolute",
                        top: 0,
                        color: "white",
                        backgroundColor: "#00033",
                      }}>
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
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
