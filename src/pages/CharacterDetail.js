import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";
import Header from "../components/Header/Header";

function CharacterDetail() {
  const [character, setCharacter] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }
  const type = () => {
    if (character.type === "") {
      return <p className="person-info__text">Unknown</p>;
    } else {
      return <p className="person-info__text">{character.type}</p>;
    }
  };

  return (
    <>
      <Header />
      <main className="section">
        <div className="person">
          <img src={character.image} alt={character.name} />
          <h1 className="person__name">{character.name}</h1>
        </div>
        <div className="person__title">Informations</div>
        <div className="container">
          <div className="person-info">
            <h4 className="person-info__subtitle">Gender:</h4>
            <p className="person-info__text">{character.gender}</p>
            <hr />
          </div>
          <div className="person-info">
            <h4 className="person-info__subtitle">Status:</h4>
            <p className="person-info__text">{character.status}</p>
            <hr />
          </div>
          <div className="person-info">
            <h4 className="person-info__subtitle">Species:</h4>
            <p className="person-info__text">{character.species}</p>
            <hr />
          </div>
          <div className="person-info">
            <h4 className="person-info__subtitle">Origin:</h4>
            <p className="person-info__text">{character.origin.name}</p>
            <hr />
          </div>
          <div className="person-info">
            <h4 className="person-info__subtitle">Type:</h4>
            {type()}
            <hr />
          </div>
        </div>
      </main>
    </>
  );
}

export default CharacterDetail;