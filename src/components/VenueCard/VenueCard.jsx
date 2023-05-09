import React from "react";
import { Card, CardContent, Typography, CardMedia, Chip, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteVenue from "../DeleteVenue/DeleteVenue";
import EditVenue from "../EditVenue/EditVenue";

function VenueCard(props) {
  const { media, name: title, wifi, parking, pets, breakfast, price, rating, venueManager } = props;
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
        <Typography variant="h2">{props.title}</Typography>
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
          <StarIcon />
          {rating}
        </Typography>
        <Typography variant="body1" fontWeight="600">
          {price} NOK
        </Typography>
      </CardContent>
      {venueManager && (
        <CardContent sx={{ mt: "auto", display: "flex", justifyContent: "space-between" }}>
          <DeleteVenue />
          <EditVenue />
        </CardContent>
      )}
    </Card>
  );
}

export default VenueCard;
