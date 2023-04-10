import React, { useState, useEffect } from "react";
import axios from "axios";
import leading_icon from "../img/leading_icon.svg";
import useLocalStorage from "./../util/useLocalStorage";
import useUpdateLogger from "./../util/useUpdateLogger";
import "../styles/main.css";

function Main() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", "");
  useUpdateLogger(searchTerm);

  useEffect(() => {
    const fetchCharacters = async () => {
      const BASE_URL = "https://rickandmortyapi.com/api";
      let allCharacters = [];
      let pageNum = 1;
      let totalPages = 1;

      // Fetch all pages of characters from API
      while (pageNum <= totalPages) {
        const response = await axios.get(
          BASE_URL + `/character/?page=${pageNum}&limit=20`
        );
        allCharacters = allCharacters.concat(response.data.results);
        pageNum++;
        totalPages = response.data.info.pages;
      }

      // Sort characters by name in ascending order
      const sortedCharacters = allCharacters.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      setCharacters(sortedCharacters);
    };

    fetchCharacters();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCharacters = filteredCharacters.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [isOpen, setIsOpen] = useState(true);

  const itemClickHandler = (e) => {
    setSearchTerm(e.target.textContent);
    setIsOpen(!isOpen);
  };

  const inputClickHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="logo"></div>

      <form className="field search-input">
        <img
          src={leading_icon}
          className="field__lead"
          width="24"
          height="24"
          alt=""
        />
        <input
          type="text"
          name="name"
          placeholder=" "
          value={searchTerm}
          onChange={handleSearch}
          onClick={inputClickHandler}
        />

        <label htmlFor="name">Filter by name...</label>
        <ul className="field__autocomplete">
          {searchTerm && isOpen
            ? sortedCharacters.map((character) => (
                <li
                  className="field__autocomplete-item"
                  key={character.id}
                  onClick={itemClickHandler}
                >
                  {character.name}
                </li>
              ))
            : null}
        </ul>
      </form>

      <div className="container">
        <ul className="heros">
          {sortedCharacters.map((character) => (
            <li className="hero" key={character.id}>
              <a href={`/character/${character.id}`}>
                <img
                  src={character.image}
                  alt={character.image}
                  className="hero__img"
                />
                <h3 className="hero__title">{character.name}</h3>
                <p className="hero__description">{character.species}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Main;