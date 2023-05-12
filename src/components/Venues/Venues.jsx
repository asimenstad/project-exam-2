import React from "react";
import { Grid, Link } from "@mui/material";
import VenueCard from "../VenueCard/VenueCard.jsx";
import { useApi } from "../../hooks/useApi.jsx";
import { useAuth } from "../../hooks/useAuth";

function Venues({ searchInput }) {
  const { user } = useAuth();
  const { data, isLoading, isError } = useApi(
    "https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true&sort=created&sortOrder=desc"
  );

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const filteredProducts = [...data].filter((venue) => {
    return searchInput === ""
      ? venue
      : venue.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          (venue.location.city && venue.location.city.toLowerCase().includes(searchInput.toLowerCase()));
  });

  return (
    <Grid container columns={6} rowGap={6} columnSpacing={3}>
      {filteredProducts.map(
        ({ id, name: title, location, media, price, rating, meta: { wifi, parking, breakfast, pets } }) => (
          <Grid key={id} item xs={6} sm={3} md={2}>
            <Link to={id}>
              <VenueCard
                title={title}
                media={media[0]}
                wifi={wifi}
                location={location}
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
