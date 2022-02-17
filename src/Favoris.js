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

                <div className="rightblocfavorite">
                  {elem.character ? (
                    <div className="favoritecharactername">
                      {elem.charactername}
                    </div>
                  ) : (
                    <div className="favoritecomictitle">{elem.comicname}</div>
                  )}

                  {elem.description ? (
                    <div className="favoritecharacterdescription">
                      {elem.description}
                    </div>
                  ) : (
                    <div className="favoritecomicdescription">
                      {elem.descriptionok}
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Favoris;
