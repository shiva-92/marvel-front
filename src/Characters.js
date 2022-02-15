import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Characters = ({ tab, setTab }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState("");
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [tabdetailperso, setTabdetailperso] = useState([]);

  const handleTabfavori = (character) => {
    const newtabdetailperso = [...tabdetailperso];

    //si tu met croixvalue en state, ca va faire ca pour toutes les cases
    //si tu met conditonelle et croixvalue ca va le faire pour chacun qui se trouve dans le tableau
    //pour cibler un particulièrement, récupérer index issu du tableau et qu'on a mis ds le map, modifier contenu de cet index, quand on va le maper, ca va être différent, map il reflete uniquement
    //tu vas grefer à chaque truc ajouté, une clé

    //ca tu vas le faire à chaque case
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
          {/* //chaque element il va faire toutes les instructions qu'il y a dedans */}
          {/* //n'oublie pas de penser en json tt le temps, tu dois reconsiderer chaque chaque case et check la conditionnelle */}

          {data.results.map((character, index) => {
            return (
              <>
                {/* //groupe = chaque case avec un perso */}
                <div className="group">
                  <div className="charactercontainer">
                    <div className="charactertext">
                      <button
                        className="favoritebouton"
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
                        <FontAwesomeIcon
                          className="coeur"
                          icon={faHeart}
                          size="2x"
                        ></FontAwesomeIcon>
                      </button>

                      <span className="charactername">{character.name}</span>

                      {character.description && (
                        <button
                          className="ensavoirplus"
                          onClick={() => {
                            //tu alimentes tableaufavori state (variable) avec id du perso favori
                            handleTabfavori(character);
                          }}
                        >
                          En savoir plus
                          {/* //en cliquant en savoir plus sur le character tu alimtes un tableau et tu map dessus */}
                        </button>
                      )}

                      {/* //chaque case (group en jaune) va faire instructions en bas */}

                      {/* //la on se fie a ce qu'il y a dans le tableau tabdetailperso qu'on a alimenté, valeur des clés  */}
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
                                close
                              </button>
                            </>
                          );
                      })}
                    </div>
                  </div>

                  {/* //tu vas faire ca à chaque case */}
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
