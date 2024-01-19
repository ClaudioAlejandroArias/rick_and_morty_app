import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const URL = "https://rym2.up.railway.app/api/character/";
const API_KEY = "henrystaff";

export default function Detail(props) {

   const { id } = useParams(); 
   const [character, setCharacter] = useState({});
   useEffect(()=>{ // 1era vez sería el montaje
      axios.get(`${URL}${id}?key=${API_KEY}`)
      .then(({ data })=>{
          if(data.name) setCharacter(data)
          else alert('No hay personajes con ese ID')
      })

      return setCharacter({}) // etapa de desmontaje
  }, [id]) //actualización

  return (
     <div style={{backgroundColor:"darkslategray", padding: "20px", borderRadius:"20px"}} >
        <h1>Detail</h1>
        <h2>{character.name}</h2>
        <img src={character.image} alt={character.name} />
        <h3>Status: {character.status}</h3>
        <h3>Specie: {character.species}</h3>
        <h3>Gender: {character.gender}</h3>
        <h3>Origin: {character.origin?.name}</h3>
        <h3>Location: {character.location?.name}</h3>
     </div>
  );
}