import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import axios from "axios";

const UpdateMovie = props => {
  const {refresh, setRefresh} = props;  
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const changeHandler = ev => {
    ev.persist();
    //let value = ev.target.value;
    setMovie({
      ...movie,
      [ev.target.name]: ev.target.value
    });
  };

  const handleSubmit = e => {
    console.log(movie);
    e.preventDefault();
    // make a PUT request to edit the movie
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        // res.data is the FULL array with the updated item
        // That's not always the case. Sometimes you need to build your
        // own updated array
        props.setMovies(res.data);
        props.history.push(`/item-list/${id}`);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = () => {
    axios
        .delete(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            props.history.push(`/`)
        })
        .catch(err => console.log(err))
        .finally(()=>{
            setRefresh(!refresh);
        })
  }
  
  
  return (
    <div>
      <h2>Update Movie</h2>

      <form onSubmit={handleSubmit}>
        <label>Movie Title:</label>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="name"
          value={movie.title}
        />
        <div className="baseline" />
        <label>Director:</label>
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />
        <label>MetaScore:</label>
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Meta Score"
          value={movie.metascore}
        />
        <div className="baseline" />

        {/* <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Description"
          value={movie.description}
        /> */}
        <div className="baseline" />

        <div className="baseline" />

        <button className="md-button form-button">Update Movie</button>
        
      </form>

      <button onClick={handleDelete} className="md-button form-button">Delete Movie</button>
    </div>
  );
};

export default withRouter(UpdateMovie);
