//  page favoris
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favoris = ({ tab, setTab }) => {
  const saved = localStorage.getItem("favorite");
  const initialValue = JSON.parse(saved);
  console.log(saved);

  return (
    <>
      <div className="divfavori">
        {initialValue.map((elem, index) => {
          return (
            <>
              <div className="favori">
                {elem.character ? (
                  <span>{elem.character}</span>
                ) : (
                  <span>{elem.caractereok}</span>
                )}
                {elem.picturepath ? (
                  <img src={elem.picturepath + `.` + elem.picturextension} />
                ) : (
                  <img
                    src={elem.picturepathok + `.` + elem.picturextensionok}
                  />
                )}
                {elem.description ? (
                  <span>{elem.description}</span>
                ) : (
                  <span>{elem.descriptionok}</span>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Favoris;
