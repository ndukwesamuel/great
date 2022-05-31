import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MoreVert } from "@mui/icons-material";

import "./post.css";
import axios from "axios";
import { format } from "timeago.js";
import { useGlobalContext } from "../../context/AuthContext";

// import { Users } from "../../dummyData";

function Post({ post }) {
  const { user: currentUser } = useGlobalContext();
  const [like, setLike] = useState(post.likes.length);

  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const DataUser = async () => {
    const res = await axios.get(
      `http://127.0.0.1:5000/api/user?userId=${post.userId}`
    );
    setUser(res.data);
  };

  useEffect(() => {
    DataUser();
    return () => {};
  }, [post.userId]);

  // this post user was added as a dependency becuse we want a rerender once that is change
  const likeHandler = () => {
    try {
      axios.put(
        `http://127.0.0.1:5000/api/post/${post._id}/like_dislike_post`,
        { userId: currentUser._id }
      );
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture || PF + "person/noAvatar.png"}
                alt=""
              />
            </Link>

            <span className="postUsername">
              {user.username}
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img
              className="likeIcon"
              src={`${PF}/like.png`}
              onClick={likeHandler}
              alt=""
            /> */}
            <img
              className="likeIcon"
              src={`${PF}/heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
