import {SEARCH_MOVIE, FETCH_MOVIES, FETCH_MOVIE, LOADING, LOGGED} from './types';
import axios from 'axios';
import {APIKey} from '../APIkey'

export const searchMovie = text => dispatch => {
  dispatch({
      type: SEARCH_MOVIE,
      payload: text
  });
};

export const fetchMovies = text => dispatch => {
  axios.get(`http://www.omdbapi.com/?apikey=${APIKey}&s=${text}`)
    .then(response => dispatch({
      type: FETCH_MOVIES,
      payload: response.data 
    }))
    .catch(err => console.log(err))
}

export const fetchMovie = id => dispatch => {
  axios.get(`http://www.omdbapi.com/?apikey=${APIKey}&i=${id}`)
  .then(response => dispatch({
    type: FETCH_MOVIE,
    payload: response.data 
  }))
  .catch(err => console.log(err))
}

export const setLoading = () => {
  return {
    type: LOADING
  }
}

export const setLogged = (user) => {
  return {
    user: user,
    type: LOGGED
  }
}

export const signIn = (email, password) => dispatch => {
  return axios.post(`http://localhost:3001/signin`, {
  email: email,
  password: password
})
  .then(response => dispatch(setLogged(response.data)))
}

