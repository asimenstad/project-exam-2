import { Box, CircularProgress } from "@mui/material";

function Loader() {
  return (
    <Box sx={{ position: "absolute", top: "40%", left: "45%" }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;
