import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./action-types";

export const addFav = (payload) => ({type:ADD_FAV, payload})

export const removeFav = (id) => {
    return {
        type: REMOVE_FAV,
        payload:id
    }
}

export function filterCards(gender) {
  return {
    type: FILTER,
    payload: gender
  }
}

export function orderCards(order) {
  return {
    type: ORDER,
    payload: order
  }
}