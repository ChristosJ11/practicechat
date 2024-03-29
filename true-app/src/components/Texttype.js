import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";

const Texttype = ({ addText, uid, rid }) => {
  const [mytext, typedText] = useState("");

  const onTurnin = (e) => {
    e.preventDefault();
    if (!mytext) {
      alert("no message entered");
      return;
    }
    const newMessage = {
      title: mytext,
      userId: uid,
      roomId: rid,
    };

    axios.post("/create", newMessage);
    const updateMessage = {
      room: rid,
      lastMessage: mytext,
    };
    axios.post("/lastMessage", updateMessage);
    addText(mytext);
    typedText("");
  };

  return (
    <div>
      <div className="Texttype" onSubmit={onTurnin}>
        <form className="typer">
          <input
            className="tt"
            type="text"
            placeholder={"what's on your mind?"}
            value={mytext}
            onChange={(e) => typedText(e.target.value)}
          ></input>
          <input type="submit" className="tb"></input>
        </form>
      </div>
    </div>
  );
};

export default Texttype;
