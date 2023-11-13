export default function Card(props) {
   return (
      <div>
         <button onClick={props.onClose}>X</button>
         <p>nombre: {props.name}</p>
         <p>status: {props.status}</p>
         <p>species: {props.species}</p>
         <p>gender: {props.gender}</p>
         <p>origin: {props.origin}</p>
         <img src={props.image} alt={props.name} />
      </div>
   );
}
