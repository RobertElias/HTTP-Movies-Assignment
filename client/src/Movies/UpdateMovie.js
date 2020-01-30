import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialItem);
  const { id } = useParams();

  useEffect(() => {
    const movieToUpdate = props.movies.find(thing => `${thing.id}` === id);

    if (movieToUpdate) {
        setMovie(movieToUpdate);
    }
  }, [props.movies, id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "price") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the movie
    axios
      .put(`http://localhost:5000/movies/${id}`, movie)
      .then(res => {
        // res.data is the FULL array with the updated item
        // That's not always the case. Sometimes you need to build your
        // own updated array
        props.setMovies(res.data);
        props.history.push(`/item-list/${id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Movie Title"
          onChange={changeHandler}
          placeholder="name"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="Movie Director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="Meta Score"
          onChange={changeHandler}
          placeholder="Meta Score"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={movie.description}
        />
        <div className="baseline" />

        
        <div className="baseline" />

        <button className="md-button form-button">Update Actors</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
