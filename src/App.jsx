import React from "react";
import { Navigate, Route, Routes, redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import SpecificVenue from "./pages/SpecificVenue/SpecificVenue.jsx";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<SpecificVenue />} />
          <Route path="profile" element={user ? <Profile /> : <Navigate replace to={"/login"} />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<h1>Page not found</h1>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
