import React from 'react';
import MyButton from "./UI/Button/MyButton";
import ServerService from "../API/ServerService";

const FilmItem = ({children, film, setFilms, films}) => {
  return (
    <div className='film-card__item navbar bg-danger' style={{padding: '10px', color: 'white', marginTop: '10px'}}>
      <div>{children}</div>
      <MyButton btnType='light btn-close' onClick={() => {
        setFilms(films.filter(f => f.text !== film.text))
        ServerService.get('/films.json').then((resp) => {
          ServerService.get(`/films/${Object.keys(resp.data)[0]}.json`).then((resp) => {
            console.log(resp)
            let newFilmsArr
            if (resp.data) {
              newFilmsArr = resp.data.filter(f => f.text !== film.text)
            } else {
              newFilmsArr = ''
            }
            ServerService.delete(`/films.json`).then(() => {
              ServerService.post('/films.json', newFilmsArr).then(() => {}).catch((e) => {
                console.log(e)
              })
            }).catch((e) => {
              console.log(e)
            })
          }).catch((e) => {
            console.log(e)
          })
        }).catch((e) => {
          console.log(e)
        })
      }}></MyButton>
    </div>
  );
};

export default FilmItem;