import React from "react";
import { Card, CardContent, Typography, CardMedia, Chip, Grid } from "@mui/material";

function VenueCard(props) {
  return (
    <Card>
      <CardMedia image={props.media} title={props.name} sx={{ height: 200 }} />
      <CardContent>
        <Typography variant="h2">{props.name}</Typography>
        <Typography variant="p">{props.location}</Typography>
        <Grid container spacing={1}>
          {props.wifi && (
            <Grid item>
              <Chip label="Wifi" />
            </Grid>
          )}
          {props.parking && (
            <Grid item>
              <Chip label="Parking" />
            </Grid>
          )}
          {props.pets && (
            <Grid item>
              <Chip label="Pets allowed" />
            </Grid>
          )}
          {props.breakfast && (
            <Grid item>
              <Chip label="Breakfast" />
            </Grid>
          )}
        </Grid>
        <Typography>{props.price} Kr per night</Typography>
      </CardContent>
    </Card>
  );
}

export default VenueCard;
