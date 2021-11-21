import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Characters = ({ tab, setTab }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState("");
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://backendmarvelok.herokuapp.com/characters?limit=${limit}&name=${character}&skip=${skip}`
      );

      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [character, limit, skip]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="soussection">
        <input
          placeholder="Cherche ton super-héros favori !"
          onChange={(event) => {
            setCharacter(event.target.value);
          }}
        ></input>

        <button
          onClick={() => {
            setSkip(skip + 100);
          }}
        >
          Page suivante
        </button>
      </div>

      <div className="container">
        <>
          {data.results.map((character, index) => {
            return (
              <>
                <div className="group">
                  <button
                    className="okbutton"
                    onClick={() => {
                      const newtab = [...tab];
                      newtab.push({
                        character: character._id,
                        description: character.description,
                        picturepath: character.thumbnail.path,
                        picturextension: character.thumbnail.extension,
                      });
                      setTab(newtab);
                      console.log(newtab);
                    }}
                  >
                    ajouter en favori
                  </button>

                  {/* perso */}

                  <div className="character">
                    <Link to={`/id/${character._id}`}>
                      <div>{character.name}</div>
                      <img
                        className="ok"
                        src={
                          character.thumbnail.path +
                          `.` +
                          character.thumbnail.extension
                        }
                      />
                      <div>{character.description}</div>
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
        </>
      </div>
    </>
  );
};

export default Characters;
