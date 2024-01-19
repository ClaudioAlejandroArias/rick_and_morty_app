import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./action-types";

const initialState = {
  myFavorites: [],
  allCharacters: [],
  errors: {}
}

export default function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case ADD_FAV: 
      return { 
        ...state,
        myFavorites:[payload, ...state.allCharacters],
        allCharacters:[payload, ...state.allCharacters]
      };
    case REMOVE_FAV: 
      return {
        ...state,
        myFavorites: state.myFavorites.filter(char => char.id !== payload),
        allCharacters: state.allCharacters.filter(char => char.id !== payload)
        }
    
    case FILTER:{
      if(payload === "All") return {
        ...state,
        myFavorites: state.allCharacters
      }
      const filteredFavs = state.allCharacters.filter(
        char => char.gender === payload
      )
      return {
        ...state,
        myFavorites: filteredFavs
      }
    }
    case ORDER:
      const orderCopy = [...state.myFavorites];
      if(payload === "A")
        orderCopy.sort((a, b) => a.id - b.id);
      if(payload === "D")
        orderCopy.sort((a, b) => b.id - a.id);
      return {
        ...state,
        myFavorites: orderCopy
      }
    default:
      return { ...state }
  }
}