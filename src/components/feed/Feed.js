import React, { useEffect, useState } from "react";
import { Posts } from "../../dummyData";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { useGlobalContext } from "../../context/AuthContext";

// this username is coming from profile

function Feed({ username, profile }) {
  const { user } = useGlobalContext();

  console.log(profile);

  const [posts, setPosts] = useState([]);
  // const [user, setUser] = useState({});
  // profile/:username

  const Data = async () => {
    const res = username
      ? await axios.get("http://127.0.0.1:5000/api/post/profile/" + username)
      : await axios.get("http://127.0.0.1:5000/api/post/timeline/" + user._id);
    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  useEffect(() => {
    Data();
    return () => {};
  }, [user._id, username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}

        {/* <Share /> */}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
