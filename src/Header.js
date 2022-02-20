import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "./logo.png";

const Header = ({ token, setUser, title, setTitle }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="globalheader">
        <div className="headerlogo">
          <img src={logo} />
        </div>

        <div className="headerrightpart">
          <button
            className="characters"
            onClick={() => {
              navigate("/");
            }}
          >
            PERSONNAGES
          </button>

          <button
            className="comics"
            onClick={() => {
              navigate("/comics");
            }}
          >
            COMICS
          </button>

          <button
            className="favorites"
            onClick={() => {
              navigate("/favoris");
            }}
          >
            FAVORIS
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
