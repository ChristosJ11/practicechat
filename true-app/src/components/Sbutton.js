import React, { Component } from "react";
import { useState } from "react";
const Sbutton = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  function Clicked() {
    setIsClicked(!isClicked);
    onClick(isClicked);
  }
  return (
    <div className="log-in-button">
      <button className="tb" onClick={Clicked}>
        {isClicked ? "Back" : "Sign in"}
      </button>
    </div>
  );
};

export default Sbutton;
