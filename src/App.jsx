import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import SpecificVenue from "./pages/SpecificVenue/SpecificVenue.jsx";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<SpecificVenue />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<h1>Page not found</h1>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
