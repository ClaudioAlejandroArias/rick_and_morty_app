import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeFav } from './redux/actions.js';
import About from './components/about/About.jsx';
import Cards from './components/cards/Cards.jsx';
import Detail from './components/detail/Detail.jsx';
import Favorites from './components/favorites/Favorites.jsx';
import Form from './components/form/Form.jsx';
import Nav from './components/nav/Nav.jsx';
import NotFound from './components/notfound/NotFound.jsx';

const URL = "https://rym2.up.railway.app/api/character/";
const API_KEY = "henrystaff";

function App() {
   
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();

   const [characters, setCharacters] = useState([]);

   const onSearch = (id) => {
      if (!id) return alert("Ingresa un ID");
      if (characters.find((char) => char.id === parseInt(id)))
        return alert(`Ya existe el personaje con el id ${id}`);
      axios.get(`${URL}${id}?key=${API_KEY}`)
        .then(({ data }) => {
          if (data.name) {
            setCharacters([data, ...characters]);
          } else {
            alert("No hay personajes con ese ID!");
          }
        })
        .catch((err) => alert(err.message));
    };

   const onClose = (id) => {
      console.log(id);
      console.log(typeof id);
      setCharacters(characters.filter(char => char.id !== Number(id)));
      dispatch(removeFav(id));
   }

   const [access, setAccess] = useState(false);
   const EMAIL = 'claudio@mail.com';
   const PASSWORD = '39012080';

   const login = ({ email, password }) => {
      if(email === EMAIL && password === PASSWORD) {
         setAccess(true)
         navigate('/home')
      }
      else alert('usuario o contraseña incorrectos')
     }

   function logout() {
      setAccess(false);
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   return (
      <div className='App'>
         { 
            location.pathname !== "/" ? <Nav onSearch={onSearch} logout={logout} /> : null
         }
         <Routes>
            <Route
               path="/"
               element={<Form login={login} />}
            />
            <Route 
               path="/home"
               element={<Cards characters={characters} onClose={onClose} />}
            />
            <Route
               path="/about"
               element={<About />}
            />
            <Route
               path="/detail/:id"
               element={<Detail />}
            />
            <Route
               path="/favorites"
               element={<Favorites onClose={onClose} />} />
            <Route
               path="*"
               element={<NotFound />}
            />
         </Routes>
      </div>
   );
}

export default App;

