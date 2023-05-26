import { Card, CardContent, Typography, CardMedia, Chip, Grid, Box } from "@mui/material";
import { PlaceRounded, StarRounded } from "@mui/icons-material";

/**
 * Displays single venue.
 * @param {Object} data - The venue data.
 * @param {string} data.media - The URL for the venue image.
 * @param {string} data.title - The title of the venue.
 * @param {Object} data.meta - A JSON object containing meta data about the venue. The object contains a boolean value for each of `wifi`, `parking`, `breakfast`, and `pets`.
 * @param {number} data.price - The price of the venue.
 * @param {number} data.rating - The rating of the venue.
 * @param {Object} data.location - A JSON object containing the location of the venue. The object contains `address`, `city`, `zip`, `country`, `continent`.
 * @returns Venue card.
 */
function VenueCard({
  media,
  title,
  wifi,
  parking,
  pets,
  breakfast,
  price,
  rating,
  location: { city, country, continent } = {},
}) {
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
          <Typography variant="h2">{title}</Typography>
        </Box>
        <Typography variant="overline" sx={{ display: "flex", alignItems: "center" }}>
          <PlaceRounded fontSize="small" /> {city ? city : country ? country : continent ? continent : "unknown"}
        </Typography>
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
              <Chip label="Breakfast included" />
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
