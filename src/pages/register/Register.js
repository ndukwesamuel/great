import { useRef } from "react";
import {
  Link,
  Navigate,
  unstable_HistoryRouter,
  useNavigate,
} from "react-router-dom";
import "./register.css";

import axios from "axios";

export default function Register() {
  // const history = useHistory();
  // console.log(history);
  const navigate = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://127.0.0.1:5000/api/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
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
              <input
                placeholder="Username"
                className="loginInput"
                ref={username}
              />
              <input placeholder="Email" className="loginInput" ref={email} />
              <input
                placeholder="Password"
                className="loginInput"
                ref={password}
              />
              <input
                placeholder="Password Again"
                className="loginInput"
                ref={passwordAgain}
              />

              <button className="loginButton" type="submit">
                Sign Up
              </button>
              <button className="loginRegisterButton">Log into Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
