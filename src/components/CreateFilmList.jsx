import React from 'react';
import CreateFilmItem from "./CreateFilmItem";
import FilmItem from "./FilmItem";

const CreateFilmList = ({input, setInput, filmList, setFilmList}) => {
  return (
    <div>
      <CreateFilmItem input={input} setInput={setInput} filmList={filmList} setFilmList={setFilmList}></CreateFilmItem>
      <p style={{margin: '0 0 0 40px', width: '320px', color: 'white'}}>To watch List:</p>
      <div className='films-card__list'>
        {filmList.map((film, index) => {
          return <FilmItem film={film} key={film.text + index} setFilms={setFilmList} films={filmList}>{film.text}</FilmItem>
        })}
      </div>
    </div>
  );
};

export default CreateFilmList;