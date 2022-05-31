import React, { useRef, useState } from "react";

import {
  PermMedia,
  Cancel,
  Label,
  Room,
  EmojiEmotions,
} from "@mui/icons-material";

import axios from "axios";

import "./share.css";
import { useGlobalContext } from "../../context/AuthContext";
function Share() {
  const { user } = useGlobalContext();
  const desc = useRef();
  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name; //  this is use to give the file diffrent_name to avoid conflict
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://127.0.0.1:5000/api/upload", data);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }

      console.log(newPost);
    }

    try {
      console.log(newPost);
      await axios.post("http://127.0.0.1:5000/api/post", newPost);
      // window.location.reload();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            {/* this label will help input the image onclick that why the input is display none */}
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
                if
                we
                dont
                add
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
}

export default Share;
