import React, { useRef, useState } from "react";
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

function VenueForm({ handleSubmit, handleChange, handleAddMedia, handleRemoveMedia, inputRef, media }) {
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
          <Button type="submit" variant="contained" disableElevation>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VenueForm;
