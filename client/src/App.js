import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  const [movies, setMovies] = useState([{
    id: -5,
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
  }]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log(res.data) 
        setMovies(res.data)
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" >
        <MovieList movies={movies}/>
      </Route>
      <Route 
        path="/movies/:id"
        >
          <Movie addToSavedList={addToSavedList} movies={movies}/>
        </Route>
      
      <Route
        path="/update-movie/:id"        
      >
        <UpdateMovie />
      </Route>
    </>
  );
};

export default App;
