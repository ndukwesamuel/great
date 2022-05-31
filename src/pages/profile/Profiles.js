import React, { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./profile.css";
import { useParams } from "react-router-dom";

function Profiles() {
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  console.log(username);

  const DataUser = async () => {
    const res = await axios.get(
      `http://127.0.0.1:5000/api/user/?username=${username}`
    );

    setUser(res.data);
  };

  useEffect(() => {
    DataUser();
    return () => {};
  }, [username]);
  // this post user was added as a dependency becuse we want a rerender once that is change

  return (
    <div className="profile">
      <Sidebar />

      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img
              className="profileCoverImg"
              src={user.coverPicture || `${PF}/post/3.jpeg`}
              alt=""
            />
            <img
              className="profileUserImg"
              src={user.profilePicture || `${PF}/post/3.jpeg`}
              alt=""
            />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
          </div>
        </div>
        <div className="profileRightBottom">
          <Feed profile username={username} />
          {/* we did this sso that we only get information and feeds of the specific user */}

          <Rightbar user={user} />
        </div>
      </div>
    </div>
  );
}

export default Profiles;
