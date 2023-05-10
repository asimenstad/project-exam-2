import React from "react";
import { Card, CardContent, Typography, CardMedia, Chip, Grid, Box } from "@mui/material";
import { StarRounded } from "@mui/icons-material";

function VenueCard(props) {
  const { media, name: title, wifi, parking, pets, breakfast, price, rating } = props;
  const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";

  function handleImgError(e) {
    e.target.src = defaultImg;
  }
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="image"
        image={media !== undefined ? media : defaultImg}
        title={title}
        sx={{ height: 250 }}
        onError={handleImgError}
      />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h2">{props.title}</Typography>
        </Box>
        <Typography variant="overline">{props.location}</Typography>
        <Grid container spacing={1} sx={{ marginTop: 0.5 }}>
          {wifi && (
            <Grid item>
              <Chip label="Wifi" />
            </Grid>
          )}
          {parking && (
            <Grid item>
              <Chip label="Parking" />
            </Grid>
          )}
          {pets && (
            <Grid item>
              <Chip label="Pets allowed" />
            </Grid>
          )}
          {breakfast && (
            <Grid item>
              <Chip label="Breakfast" />
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardContent sx={{ mt: "auto", display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <StarRounded />
          {rating}
        </Typography>
        <Typography variant="body1" fontWeight="600">
          {price} NOK
        </Typography>
      </CardContent>
    </Card>
  );
}

export default VenueCard;
