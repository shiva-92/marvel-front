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
            onClick={() => {
              navigate("/");
            }}
          >
            Personnages
          </button>

          <button
            onClick={() => {
              navigate("/comics");
            }}
          >
            Comics
          </button>

          <button
            onClick={() => {
              navigate("/favoris");
            }}
          >
            Favoris
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
