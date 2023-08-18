import { Grid, Link, Skeleton, Typography } from "@mui/material";
import VenueCard from "../VenueCard/VenueCard.jsx";
import { useApi } from "../../hooks/useApi.jsx";
import Loader from "../Loader/Loader.jsx";

/**
 * Displays venues.
 * @param {string} searchInput - The search input value.
 * @returns Grid with venue cards.
 */
function Venues({ searchInput }) {
  const { data, isLoading, isError } = useApi(
    "https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true&sort=created&sortOrder=desc"
  );

  if (isError) {
    return <div>Error</div>;
  }

  const filteredProducts = [...data].filter((venue) => {
    const {
      location: { city, address, country, continent },
      name,
    } = venue;
    const searchParams = [city, address, country, continent, name];
    return searchInput === ""
      ? venue
      : searchParams.some((param) => param && param.toLowerCase().includes(searchInput.toLowerCase()));
  });

  return isLoading ? (
    <Loader />
  ) : (
    <Grid id="venues" container columns={6} rowGap={6} columnSpacing={3}>
      {filteredProducts.map(
        ({ id, name: title, location, media, price, rating, meta: { wifi, parking, breakfast, pets } }) => (
          <Grid key={id} item xs={6} sm={3} md={2}>
            {isLoading ? (
              <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1, bgcolor: "#fff" }} />
            ) : (
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
            )}
          </Grid>
        )
      )}
      {filteredProducts.length === 0 && (
        <Typography mx="auto" my={6}>
          Sorry, we could not find any results for your search on &quot;{searchInput}&quot;.
        </Typography>
      )}
    </Grid>
  );
}

export default Venues;
