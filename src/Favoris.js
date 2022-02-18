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
                    className="imagefavorite"
                    src={elem.picturepathok + `.` + elem.picturextensionok}
                  />
                )}

                {elem.character ? (
                  <div className="favoritecharactername">
                    {elem.charactername}
                  </div>
                ) : (
                  <div className="favoritecomictitle">{elem.comicname}</div>
                )}
                <button
                  onClick={() => {
                    const newtab = [...tab];
                    newtab.splice(newtab.indexOf(newtab[index]), 1);
                    //tab[i]le contenu pris par i dans le tableau

                    setTab(newtab);
                    // console.log(tabdetailperso);
                  }}
                >
                  close
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Favoris;
