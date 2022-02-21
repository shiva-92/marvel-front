import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "./logo.png";

const Header = ({ token, setUser, title, setTitle }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="globalheader">
        <button
          className="boutonlogo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="imagelogo" src={logo} />
        </button>

        <div className="boutonsheader">
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
