import { useApi } from "../../hooks/useApi";
import VenueCard from "../VenueCard/VenueCard";
import { Grid, Link, Typography, Skeleton, Stack, Box } from "@mui/material";
import { format } from "date-fns";
import { DateRangeRounded } from "@mui/icons-material";
import ChangeBooking from "../ChangeBooking/ChangeBooking";

function BookingsProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };
  const { data, isLoading } = useApi(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/bookings?_customer=true&_venue=true&_bookings=true&sort=dateFrom&sortOrder=asc`,
    options
  );

  return (
    <Grid container columns={6} rowGap={8} columnSpacing={3}>
      {data.map(
        ({
          id,
          dateFrom,
          dateTo,
          venue: {
            id: venueId,
            name: title,
            price,
            rating,
            location,
            meta: { wifi, parking, breakfast, pets },
            media,
            maxGuests,
            bookings,
          },
        }) => (
          <Grid key={id} item xs={6} sm={3} md={2}>
            {isLoading ? (
              <Stack spacing={1}>
                <Skeleton variant="text" sx={{ bgcolor: "#fff" }} />
                <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1, bgcolor: "#fff" }} />
              </Stack>
            ) : (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ display: "flex", alignItems: "center", my: 1 }}>
                    <DateRangeRounded /> {format(new Date(dateFrom), "PP")} - {format(new Date(dateTo), "PP")}
                  </Typography>
                  <ChangeBooking
                    title={title}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    id={id}
                    maxGuests={maxGuests}
                    bookings={bookings}
                  />
                </Box>
                <Link to={`../${venueId}`}>
                  <VenueCard
                    title={title}
                    media={media[0]}
                    wifi={wifi}
                    location={location}
                    parking={parking}
                    breakfast={breakfast}
                    pets={pets}
                    rating={rating}
                    price={price}
                  />
                </Link>
              </>
            )}
          </Grid>
        )
      )}
    </Grid>
  );
}

export default BookingsProfile;
