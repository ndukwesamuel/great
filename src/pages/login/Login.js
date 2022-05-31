import React, { useRef } from "react";
import "./login.css";

import { loginCall } from "../../apiCalls";
import { useGlobalContext } from "../../context/AuthContext";

export default function Login() {
  const { user, dispatch, isFetching } = useGlobalContext();

  const email = useRef();
  const password = useRef();

  const handleClick = (e) => {
    console.log(isFetching);
    e.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );

    console.log(user + "login in part");
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form className="loginBox" onSubmit={handleClick}>
              <input placeholder="Email" className="loginInput" ref={email} />
              <input
                placeholder="Password"
                className="loginInput"
                ref={password}
              />
              <button className="loginButton">
                {isFetching ? "loading" : "log in"}
              </button>

              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
