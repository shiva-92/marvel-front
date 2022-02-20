import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Comics = ({ tab, setTab }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comic, setComic] = useState("");
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [tabdetailcomic, setTabdetailcomic] = useState([]);

  const handleTabcomic = (comic) => {
    const newtabdetailcomic = [...tabdetailcomic];

    newtabdetailcomic.push({
      comicidentifiant: comic._id,
      comicdetail: comic.description,
      croixvalue: true,
    });

    setTabdetailcomic(newtabdetailcomic);
  };

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
  }, [comic, limit, skip]); //y'a une valeur qui prends dans le state, execute ce qu'il a l'interieur de useeffect, t

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="soussection">
        <div className="centersoussection">
          {skip - 100 >= 0 && (
            <>
              <button
                className="previouspage"
                onClick={() => {
                  setSkip(skip - 100);
                  console.log(skip);
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} size="3x" />
              </button>
              <span className="textpreviouspage">PAGE PRECEDENTE</span>
            </>
          )}
          <input
            className="nopreviousinput"
            placeholder="Cherche ton comic favori !"
            onChange={(event) => {
              setComic(event.target.value);
            }}
          ></input>

          <>
            <button
              className="nextpageinitial"
              onClick={() => {
                setSkip(skip + 100);
              }}
            >
              <FontAwesomeIcon icon={faAngleRight} size="3x" />
            </button>
            <span className="firstpagetext">PAGE SUIVANTE</span>
          </>
        </div>
      </div>

      <div className="container">
        <>
          {data.results.map((comic, index) => {
            return (
              <>
                <div className="groupcomic">
                  <button
                    className="favoritebouton"
                    onClick={() => {
                      const newtab = [...tab];
                      newtab.push({
                        comicname: comic.title,
                        characterok: comic._id,
                        descriptionok: comic.description,
                        picturepathok: comic.thumbnail.path,
                        picturextensionok: comic.thumbnail.extension,
                      });
                      setTab(newtab);
                      console.log(newtab);
                    }}
                  >
                    <FontAwesomeIcon
                      className="coeur"
                      icon={faHeart}
                      size="2x"
                    ></FontAwesomeIcon>
                  </button>

                  <span className="comictitle">{comic.title}</span>

                  <button
                    className="ensavoirplus"
                    onClick={() => {
                      //tu alimentes tableaufavori state (variable) avec id du perso favori
                      handleTabcomic(comic);
                    }}
                  >
                    En savoir plus
                    {/* //en cliquant en savoir plus sur le character tu alimtes un tableau et tu map dessus */}
                  </button>

                  {tabdetailcomic.map((comiccharacter, index) => {
                    if (
                      comic._id === comiccharacter.comicidentifiant &&
                      tabdetailcomic[index].croixvalue
                    )
                      return (
                        <>
                          <div className="comicdescription">
                            {comic.description}
                          </div>

                          <button
                            className="closebutton"
                            onClick={() => {
                              const newtabdetailcomic = [...tabdetailcomic];
                              newtabdetailcomic[index].croixvalue =
                                !newtabdetailcomic[index].croixvalue;
                              setTabdetailcomic(newtabdetailcomic);
                            }}
                          >
                            Fermer
                          </button>
                        </>
                      );
                  })}

                  <img
                    className="imagecomic"
                    src={comic.thumbnail.path + `.` + comic.thumbnail.extension}
                  />
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
