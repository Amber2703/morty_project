import React from "react";
import arrow_back from "./arrow_back.svg";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const BtnBack = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")} className="btn-back">
      <img src={arrow_back} alt="arrow_back" className="btn-back__image" />
      <p className="btn-back__text">Go back</p>
    </button>
  );
};

export default BtnBack;