//page id

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Id = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comicapparition, setComicapparition] = useState("");

  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://backendmarvelok.herokuapp.com/id?id=${id}`
      );
      setData(response.data);
      setIsLoading(false);
      console.log(response.data);
    };
    fetchData();
  }, [comicapparition]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <>
        {data.comics.map((comicapparition, index) => {
          return (
            <>
              <div className="containerid">
                <span>{comicapparition.title}</span>
                <img
                  src={
                    comicapparition.thumbnail.path +
                    `.` +
                    comicapparition.thumbnail.extension
                  }
                />
                <span>{comicapparition.description}</span>
              </div>
            </>
          );
        })}
      </>
    </>
  );
};
export default Id;
