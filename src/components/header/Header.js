import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>Quiz App</h1>
    </div>
  );
}

export default Header;
