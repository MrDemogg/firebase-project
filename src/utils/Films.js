import './Films.css';
import {useEffect, useState} from "react";
import CreateFilmList from "../components/CreateFilmList";
import ServerService from "../API/ServerService";

function Films() {
  const [input, setInput] = useState('')
  const [filmsList, setFilmList] = useState([])
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setFilmList(filmsList)
    const newFilmList = []
    ServerService.get(`/films.json`).then((response) => {
      console.log(response)
      if (response.data) {
        ServerService.get(`/films/${Object.keys(response.data)[0]}.json`).then((response) => {
          console.log(response)
          newFilmList.push(...response.data)
          console.log(newFilmList)
          console.log(response.data)
          setFilmList(newFilmList)
        }).catch(e => console.log(e))
      }
    }).catch((e) => {
      console.log(e)
      setIsError(true)
      setError(e)
    })
  }, [])


  return (
    <div className="films-card">
      {isError
        ? <h1>{error}</h1>
        : <CreateFilmList input={input} setInput={setInput} filmList={filmsList} setFilmList={setFilmList}></CreateFilmList>
      }
    </div>
  )
}

export default Films;
