import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import Venues from "../../components/Venues/Venues.jsx";
import Search from "../../components/Search/Search.jsx";
import Filter from "../../components/Filter/Filter.jsx";

function Home() {
  const [searchInput, setSearchInput] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  return (
    <Container component="main">
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}>
        Venues
      </Typography>
      <Filter />
      <Search handleChange={handleChange} searchInput={searchInput} />
      <Venues searchInput={searchInput} />
    </Container>
  );
}

export default Home;
