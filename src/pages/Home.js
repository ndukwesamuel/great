import React from "react";
import Feed from "../components/feed/Feed";
import Rightbar from "../components/rightbar/Rightbar";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import { useGlobalContext } from "../context/AuthContext";

import "./home.css";
function Home() {
  const {} = useGlobalContext();
  return (
    <>
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}

export default Home;
