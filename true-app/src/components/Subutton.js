import React, { Component } from "react";
import { useState } from "react";
const Subutton = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  function Clicked() {
    setIsClicked(!isClicked);
    onClick(isClicked);
  }
  return (
    <div className="sign-up-button">
      <button className="tb" onClick={Clicked}>
        {isClicked ? "Back" : "Sign Up"}
      </button>
    </div>
  );
};

export default Subutton;
