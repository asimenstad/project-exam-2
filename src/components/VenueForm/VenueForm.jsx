import React from "react";
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
} from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

function VenueForm() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Box component="form">
      <Typography variant="h2">Add venue</Typography>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <TextField name="name" required fullWidth id="name" label="Name of venue" autoFocus size="small" />
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
            />
          </Box>
          <Box>
            <TextField name="price" required fullWidth id="price" label="Price" autoFocus size="small" />
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
            />
          </Box>
          <Box>
            <FormControl variant="outlined">
              <InputLabel size="small" htmlFor="media">
                Media
              </InputLabel>
              <OutlinedInput
                name="media"
                fullWidth
                id="media"
                label="Media"
                autoFocus
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
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
                  <TextField fullWidth name="address" id="address" label="Address" autoFocus size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="city" id="city" label="City" autoFocus size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="country" id="country" label="Country" autoFocus size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="continent" id="continent" label="Continent" autoFocus size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="zip" id="zip" label="Zip" autoFocus size="small" />
                </Grid>
              </Grid>
            </FormGroup>
          </Box>
          <Box>
            <FormControl component="fieldset">
              <FormLabel>Amenities</FormLabel>
              <FormGroup row>
                <FormControlLabel control={<Checkbox name="wifi" color="primary" />} label="Wifi" />
                <FormControlLabel control={<Checkbox name="parking" color="primary" />} label="Parking" />
                <FormControlLabel control={<Checkbox name="pets" color="primary" />} label="Pets" />
                <FormControlLabel control={<Checkbox name="breakfast" color="primary" />} label="Breakfast" />
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained">Add venue</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VenueForm;
