//  page favoris
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favoris = ({ tab, setTab }) => {
  const saved = localStorage.getItem("favorite");
  const initialValue = JSON.parse(saved);
  console.log(saved);
  console.log(tab.length);
  return (
    <>
      {tab.length == 0 && (
        <div className="testfavori">
          Vous n'avez actuellement aucun personnage ou comic en favori
        </div>
      )}

      <div className="divfavori">
        <div className="globalfavori">
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
                    className="deletefavorite"
                    onClick={() => {
                      const newtab = [...tab];
                      newtab.splice(newtab.indexOf(newtab[index]), 1);

                      setTab(newtab);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Favoris;
