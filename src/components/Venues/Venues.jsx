import React from "react";
import { Grid, Link } from "@mui/material";
import VenueCard from "../VenueCard/VenueCard.jsx";
import { useApi } from "../../hooks/useApi.jsx";

function Venues() {
  const { data, isLoading, isError } = useApi(
    "https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true&_sort=created&_sortOrder=desc"
  );

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Grid container columns={6} rowGap={6} columnSpacing={3}>
      {data.map(
        ({ id, name: title, location: { city }, media, price, rating, meta: { wifi, parking, breakfast, pets } }) => (
          <Grid key={id} item xs={6} sm={3} md={2}>
            <Link to={id}>
              <VenueCard
                title={title}
                media={media[0]}
                location={city}
                wifi={wifi}
                parking={parking}
                breakfast={breakfast}
                pets={pets}
                rating={rating}
                price={price}></VenueCard>
            </Link>
          </Grid>
        )
      )}
    </Grid>
  );
}

export default Venues;
