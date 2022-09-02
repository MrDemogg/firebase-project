import React from 'react';
import MyButton from "./UI/Button/MyButton";
import ServerService from "../API/ServerService";

const CreateFilmItem = ({input, setInput, filmList, setFilmList}) => {
  return (
    <div className='films-card__create'>
      <input value={input} type='text' className='form-control' placeholder='New Film Name' onChange={(e) => setInput(e.target.value)}/>
      {input.length > 0
        && <MyButton btnType='primary' onClick={() => {
          setFilmList([...filmList, {text: input}]);
          ServerService.delete('/films.json').then((resp) => {
            console.log(resp)
            ServerService.post('/films.json', [...filmList, {text: input}]).then((resp) => {
              console.log(resp)
            })
          })
          setInput('');
        }}>Add</MyButton>
      }
    </div>
  );
};

export default CreateFilmItem;