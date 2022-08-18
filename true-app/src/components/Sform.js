import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const baseURL = process.env.BASEURL || "http://localhost:3001";
const Sform = ({ changr }) => {
  const [user, typedUser] = useState("");
  const [pass, typedPass] = useState("");
  const history = useHistory();
  const onTurnin = (e) => {
    e.preventDefault();
    if (!user || !pass) {
      alert("no Username or Password entered");
      return;
    }

    //
    axios
      .get("/signIne", {
        params: {
          userId: user,
          password: pass,
        },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data == null) {
          alert("this user does not exist");
        } else if (response.data == "no user") {
          alert("The username or password is incorrect");
        } else {
          changr(user);
          localStorage.setItem("uid", user);
          history.push("/creator");
        }
      });

    //
    typedUser("");
    typedPass("");
  };
  return (
    <div className="Sform" onSubmit={onTurnin}>
      <form>
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
        <input className="tb" type="submit" value="Sign In"></input>
      </form>
    </div>
  );
};

export default Sform;
