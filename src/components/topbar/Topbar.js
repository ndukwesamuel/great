import React from "react";
import { Search, Person, Notifications, Chat } from "@mui/icons-material";

import "./topbar.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/AuthContext";

function Topbar() {
  const { user } = useGlobalContext();

  console.log(user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo">
            <Link to="/" style={{ textDecoration: "none" }}>
              Lamasocial
            </Link>
          </span>
        </div>

        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>

            <div></div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          {/* <Link to="/profile">
            <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
          </Link> */}

          {user ? (
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="topbarImg"
              />
            </Link>
          ) : (
            <img
              src={PF + "person/noAvatar.png"}
              alt=""
              className="topbarImg"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Topbar;
