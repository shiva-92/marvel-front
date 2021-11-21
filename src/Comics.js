import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Comics = ({ tab, setTab }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comic, setComic] = useState("");
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://backendmarvelok.herokuapp.com/comics?title=${comic}&limit=${limit}&skip=${skip}` //au lieu d'entrer en dur t'entre en stat
      );

      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    }; // on a definit fonction fetchdata dans laquelle on demande à executer l'interieur d'une fonction
    fetchData();
  }, [comic, limit, skip]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="soussection">
        <input
          placeholder="Cherche ton comic favori !"
          onChange={(event) => {
            setComic(event.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            setSkip(skip + 100);
          }}
        >
          page suivante
        </button>
      </div>

      <div className="container">
        <>
          {data.results.map((comic, index) => {
            return (
              <>
                <div className="group">
                  <button
                    className="okbutton"
                    onClick={() => {
                      const newtab = [...tab];
                      newtab.push({
                        characterok: comic._id,
                        descriptionok: comic.description,
                        picturepathok: comic.thumbnail.path,
                        picturextensionok: comic.thumbnail.extension,
                      });
                      setTab(newtab);
                      console.log(newtab);
                    }}
                  >
                    ajouter en favori
                  </button>
                </div>
                <div className="comic">
                  <span>{comic.title}</span>
                  <img
                    className="imagecomic"
                    src={comic.thumbnail.path + `.` + comic.thumbnail.extension}
                  />
                  <span>{comic.description}</span>
                </div>
              </>
            );
          })}
        </>
      </div>
    </>
  );
};

export default Comics;
