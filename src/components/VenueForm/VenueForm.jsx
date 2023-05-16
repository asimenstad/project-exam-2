import React from "react";
import {
  Box,
  TextField,
  Grid,
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
import { FieldArray } from "formik";

function VenueForm({ values, handleSubmit, handleChange }) {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
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
              value={values.venueName}
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
              value={values.description}
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
              value={values.price}
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
              value={values.maxGuests}
              onChange={handleChange}
            />
          </Box>
          <FieldArray name="mediaArray">
            {({ push, remove, form }) => (
              <>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel size="small" htmlFor="mediaArray">
                    Media (URL)
                  </InputLabel>
                  <OutlinedInput
                    name="mediaString"
                    type="url"
                    pattern="https://.*"
                    fullWidth
                    id="mediaArray"
                    label="Media (URL)"
                    autoFocus
                    size="small"
                    value={values.mediaString}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => {
                            push(values.mediaString);
                            form.setFieldValue("mediaString", "");
                          }}>
                          <AddPhotoAlternate />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {values.mediaArray && values.mediaArray.length > 0 ? (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {values.mediaArray.map((url, index) => (
                      <Box key={url + index} sx={{ position: "relative" }}>
                        <Avatar src={url} variant="square" />
                        <IconButton
                          onClick={() => remove(index)}
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
                ) : (
                  <Avatar variant="square">
                    <ImageIcon />
                  </Avatar>
                )}
              </>
            )}
          </FieldArray>
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
                    value={values.address}
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
                    value={values.city}
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
                    value={values.country}
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
                    value={values.continent}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="zip"
                    id="zip"
                    label="Zip"
                    autoFocus
                    size="small"
                    value={values.zip}
                    onChange={handleChange}
                  />
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
                  checked={values.wifi}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox name="parking" color="primary" />}
                  label="Parking"
                  checked={values.parking}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox name="pets" color="primary" />}
                  label="Pets"
                  checked={values.pets}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox name="breakfast" color="primary" />}
                  label="Breakfast"
                  checked={values.breakfast}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" disableElevation>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VenueForm;
