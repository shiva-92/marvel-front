import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const Characters = ({ tab, setTab }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState("");
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [tabdetailperso, setTabdetailperso] = useState([]);

  const handleTabfavori = (character) => {
    const newtabdetailperso = [...tabdetailperso];

    newtabdetailperso.push({
      characteridentifiant: character._id,
      characterdetail: character.description,
      croixvalue: true,
    });

    setTabdetailperso(newtabdetailperso);
    console.log(tabdetailperso);
  };

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
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div className="search">
        {skip - 100 >= 0 && (
          <>
            <button
              className="previouspage"
              onClick={() => {
                setSkip(skip - 100);
              }}
            >
              <span>PAGE PRECEDENTE</span>
              <FontAwesomeIcon icon={faAngleLeft} size="2x" />
            </button>
          </>
        )}

        <input
          className="input"
          placeholder="Cherche ton super-héros favori !"
          onChange={(event) => {
            setCharacter(event.target.value);
          }}
        ></input>

        <>
          <button
            className="nextpage"
            onClick={() => {
              setSkip(skip + 100);
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} size="2x" />
            <span>PAGE SUIVANTE</span>
          </button>
        </>
      </div>

      <div className="container">
        <>
          {data.results.map((character, index) => {
            console.log(skip);

            return (
              <>
                <div className="group">
                  <div className="charactercontainer">
                    <div className="charactertext">
                      <button
                        className="favoritebouton"
                        onClick={() => {
                          const newtab = [...tab];
                          newtab.push({
                            charactername: character.name,
                            character: character._id,
                            description: character.description,
                            picturepath: character.thumbnail.path,
                            picturextension: character.thumbnail.extension,
                          });
                          setTab(newtab);
                          console.log(newtab);
                        }}
                      >
                        <FontAwesomeIcon
                          className="coeur"
                          icon={faHeart}
                          size="1x"
                        ></FontAwesomeIcon>
                      </button>

                      <span className="charactername">{character.name}</span>

                      {character.description && (
                        <button
                          className="ensavoirplus"
                          onClick={() => {
                            handleTabfavori(character);
                          }}
                        >
                          En savoir plus
                        </button>
                      )}

                      {tabdetailperso.map((detailcharacter, index) => {
                        if (
                          detailcharacter.characterdetail &&
                          character._id ===
                            detailcharacter.characteridentifiant &&
                          tabdetailperso[index].croixvalue
                        )
                          return (
                            <>
                              <div className="descriptioncharacter">
                                {character.description}
                              </div>

                              <button
                                className="closebutton"
                                onClick={() => {
                                  const newtabdetailperso = [...tabdetailperso];
                                  newtabdetailperso[index].croixvalue =
                                    !newtabdetailperso[index].croixvalue;
                                  setTabdetailperso(newtabdetailperso);
                                }}
                              >
                                Fermer
                              </button>
                            </>
                          );
                      })}
                    </div>
                  </div>

                  <Link to={`/id/${character._id}`}>
                    <img
                      className="picturecharacter"
                      src={
                        character.thumbnail.path +
                        `.` +
                        character.thumbnail.extension
                      }
                    />
                  </Link>
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
