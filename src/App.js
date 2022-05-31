import React from "react";

import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Profiles from "./pages/profile/Profiles";
import Topbar from "./components/topbar/Topbar";
import Register from "./pages/register/Register";

import Login from "./pages/login/Login";
import { useGlobalContext } from "./context/AuthContext";

// import { useGlobalContext } from "../context/AuthContext";

function App() {
  const { user } = useGlobalContext();

  console.log(user);
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        <Route path="/profile/:username" element={<Profiles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
