import React from "react";
import { Box, TextField, Grid, Typography } from "@mui/material";

function VenueForm() {
  return (
    <Box component="form">
      <Typography variant="h2">Add venue</Typography>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} sm={6}>
          <TextField name="name" required fullWidth id="name" label="Name of venue" autoFocus size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="price" required fullWidth id="price" label="Price" autoFocus size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="guests" required label="Guests" type="number" fullWidth size="small" inputProps={{ min: 1 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="media" fullWidth id="media" label="Media" autoFocus size="small" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default VenueForm;
