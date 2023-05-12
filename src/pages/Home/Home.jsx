import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import Venues from "../../components/Venues/Venues.jsx";
import Search from "../../components/Search/Search.jsx";

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
      <Box
        sx={{
          height: 300,
          backgroundImage:
            'url("https://images.unsplash.com/photo-1489721775296-bd64cd2c4ddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 1,
          mb: 5,
        }}></Box>
      <Search handleChange={handleChange} searchInput={searchInput} />
      <Venues searchInput={searchInput} />
    </Container>
  );
}

export default Home;
