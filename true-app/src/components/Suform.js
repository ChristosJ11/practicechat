import React, { Component, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
const baseURL = process.env.BASEURL || "http://localhost:3001";
const Suform = ({ changr }) => {
  const [user, typedUser] = useState("");
  const [pass, typedPass] = useState("");
  const signText = useRef(null);
  const history = useHistory();
  const onTurnin = (e) => {
    e.preventDefault();
    if (!user || !pass) {
      alert("no Username or Password entered");
      return;
    }
    var sendUser = {
      userId: user,
      password: pass,
    };

    //
    axios
      .get("/signUpe", {
        params: {
          userId: user,
          password: pass,
        },
      })
      .then(function (response) {
        if (response.data == "") {
          axios.post("/signUpe", sendUser).then(function (res) {
            changr(user);
            window.localStorage.setItem("uid", user);
            history.push("creator");
          });
        } else {
          alert("this user already exists");
        }
      });

    typedUser("");
    typedPass("");
  };
  return (
    <div className="Sform" onSubmit={onTurnin}>
      <form >
        <input
          className="tt"
          placeholder="Username"
          value={user}
          onChange={(e) => typedUser(e.target.value)}
        ></input>
        <input
          className="tt"
          placeholder="Password"
          value={pass}
          onChange={(e) => typedPass(e.target.value)}
        ></input>
        <input className="tb" type="submit" value="Sign Up"></input>
      </form>
    </div>
  );
};

export default Suform;
