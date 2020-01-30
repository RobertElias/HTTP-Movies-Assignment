import React from "react";
import MovieCard from "./MovieCard";
import {useParams} from 'react-router-dom';

const Movie = (props) => {
  const {id} = useParams();
  const movie = props.movies[id];
  
  const saveMovie = () => {
    props.addToSavedList(movie);
  };

    return (
      <div className="save-wrapper">
        <MovieCard movie={movie} />
        <div className="save-button" onClick={saveMovie}>
          Save
        </div>
      </div>
    );
  
}
export default Movie;