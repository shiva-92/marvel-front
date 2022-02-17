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
              <div className="favori" key={index}>
                {elem.picturepath ? (
                  <img
                    className="imagefavorite"
                    src={elem.picturepath + `.` + elem.picturextension}
                  />
                ) : (
                  <img
                    src={elem.picturepathok + `.` + elem.picturextensionok}
                  />
                )}

                {elem.character ? (
                  <span>{elem.character}</span>
                ) : (
                  <span>{elem.caractereok}</span>
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
