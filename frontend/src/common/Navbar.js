import React from "react";
import "../assets/css.css";
import { CgNotes } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <CgNotes className="logo-icon" />
      <h1 className="logo" onClick={() => navigate("/")} style={{cursor:"pointer"}}>
        {" "}
        NOTES
      </h1>
      
    </div>
  );
};

export default Navbar;
