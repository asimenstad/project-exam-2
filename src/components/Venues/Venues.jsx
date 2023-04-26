import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import VenueCard from "../VenueCard/VenueCard.jsx";
import useApi from "../../hooks/useApi.jsx";

function Venues() {
  const { data, isLoading, isError } = useApi(
    "https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true"
  );

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Grid container columns={6} rowSpacing={3} columnSpacing={3}>
      {data.map(
        ({ id, name, location: { address, city }, media, price, rating, meta: { wifi, parking, breakfast, pets } }) => (
          <Grid key={id} item xs={6} md={3} lg={2}>
            <Link>
              <VenueCard
                name={name}
                media={media[0]}
                location={city}
                wifi={wifi}
                parking={parking}
                breakfast={breakfast}
                pets={pets}
                price={price}></VenueCard>
            </Link>
          </Grid>
        )
      )}
    </Grid>
  );
}

export default Venues;
