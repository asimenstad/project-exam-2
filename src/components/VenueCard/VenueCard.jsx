import React from "react";
import { Card, CardContent, Typography, CardMedia, Chip, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function VenueCard(props) {
  const { media, name, wifi, parking, pets, breakfast, price, rating } = props;
  const defaultImage = "http://lorempixels.com/1600/900/nature/";

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {media !== undefined ? (
        <CardMedia image={media} title={name} sx={{ height: 250 }} />
      ) : (
        <CardMedia image={defaultImage} title="Could not load image" sx={{ height: 250 }} />
      )}
      <CardContent>
        <Typography variant="h2">{props.name}</Typography>
        <Typography variant="overline">{props.location}</Typography>
        <Grid container spacing={1}>
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
          <StarIcon />
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
