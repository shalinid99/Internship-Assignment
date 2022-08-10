import React from "react";
import "../assets/css.css";
import { BsPenFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="logo" onClick={() => navigate("/")} style={{cursor:"pointer"}}>
        {" "}
        One Note ..
      </h1>
      <BsPenFill className="logo-icon" />
      
    </div>
  );
};

export default Navbar;
