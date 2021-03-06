import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

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
    };
    fetchData();
  }, [comic, limit, skip]);
  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="search">
        {skip - 100 >= 0 && (
          <>
            <button
              className="previouspage"
              onClick={() => {
                setSkip(skip - 100);
                console.log(skip);
              }}
            >
              <span className="previouspagetext">PAGE PRECEDENTE</span>

              <FontAwesomeIcon icon={faAngleLeft} size="2x" />
            </button>
          </>
        )}
        <input
          className="input"
          placeholder="Cherche ton comic favori !"
          onChange={(event) => {
            setComic(event.target.value);
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
            <span className="nextpagetext">PAGE SUIVANTE</span>
          </button>
        </>
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

                      const exist = newtab.find(
                        (element) => element.characterok === comic._id
                      );

                      if (exist) {
                        alert("Ce comic a d??j?? ??t?? ajout?? ?? vos favoris");
                      } else {
                        newtab.push({
                          comicname: comic.title,
                          characterok: comic._id,
                          descriptionok: comic.description,
                          picturepathok: comic.thumbnail.path,
                          picturextensionok: comic.thumbnail.extension,
                        });
                      }
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

                  <span className="comictitle">{comic.title}</span>

                  <button
                    className="ensavoirplus"
                    onClick={() => {
                      handleTabcomic(comic);
                    }}
                  >
                    En savoir plus
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
