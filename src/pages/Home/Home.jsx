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

  const heroImage = [
    "https://images.unsplash.com/photo-1618064541372-289bdb6f5b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2233&q=80",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1794&q=80",
    "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1808&q=80",
    "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  ];

  const getIndex = Math.floor(Math.random() * heroImage.length);

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
          height: 350,
          backgroundImage: `url(${heroImage[getIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 1,
          mb: 5,
        }}
      />
      <Search handleChange={handleChange} searchInput={searchInput} />
      <Venues searchInput={searchInput} />
    </Container>
  );
}

export default Home;
