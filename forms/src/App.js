import React from 'react';
import './App.css';
import MoviesList from './MoviesList';
import { v4 as uuidv4 } from 'uuid';

const moviesData = [
  { 'hasOscars': false, 'title': 'The Shawshank Redemption', 'director': 'Frank Darabont', 'rate': '9.3', 'id': 0 },
  { 'hasOscars': true, 'title': 'The Godfather', 'director': 'Francis Ford Coppola', 'rate': '9.2', 'id': 1 },
  { 'hasOscars': true, 'title': 'The Godfather: Part II', 'director': 'Francis Ford Coppola', 'rate': '9.0', 'id': 2 },
  { 'hasOscars': true, 'title': 'The Dark Knight', 'director': 'Christopher Nolan', 'rate': '9.0', 'id': 3 },
  { 'hasOscars': false, 'title': '12 Angry Men', 'director': 'Sidney Lumet', 'rate': '8.9', 'id': 4 }
];

class App extends React.Component {

  state = {
    movies: moviesData,
    title: '',
    director: '',
    hasOscars: false
  }

  addMovie = () => {
    const newMovie = { 'hasOscars': true, 'title': 'Interstellar', 'director': 'Christopher Nolan', 'rate': '8.6', 'id': 31 };
    // this.state.movies.push(newMovie) ❌ - this would mutate the state directly
    // const moviesCopy = this.state.movies.slice();
    // moviesCopy.push(newMovie);
    // this.setState({
    //   movies: moviesCopy
    // });
    this.setState((state) => ({
      movies: [newMovie, ...state.movies]
    }))
  }

  handleSubmit = event => {
    event.preventDefault();
    const { title, director, hasOscars } = this.state;
    const newMovie = {
      title,
      director,
      hasOscars,
      id: uuidv4()
    }
    console.log(newMovie);
    this.setState((state) => ({
      movies: [newMovie, ...state.movies],
      director: '',
      title: '',
      hasOscars: false
    }))
  }

  // handleDirectorChange = event => {
  //   this.setState({
  //     director: event.target.value
  //   })
  // }

  // handleTitleChange = event => {
  //   this.setState({
  //     title: event.target.value
  //   })
  // }
  // handleChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   })
  // }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    })
  }

  // handleOscarsChange = event => {
  //   this.setState({
  //     hasOscars: event.target.checked
  //   })
  // }
  render() {
    // don't use index as a key prop
    const moviesList = this.state.movies.map(movie => (<li key={movie.id}>{movie.title}</li>));

    return (
      <div className="App" >
        <h1>Movies List 🎬 🍿</h1>

        <form onSubmit={this.handleSubmit}>

          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label htmlFor="director">Director: </label>
          <input
            type="text"
            name="director"
            id="director"
            value={this.state.director}
            onChange={this.handleChange}
          />

          <label htmlFor="hasOscars">Has Oscars? </label>
          <input
            type="checkbox"
            name="hasOscars"
            id="hasOscars"
            checked={this.state.hasOscars}
            onChange={this.handleChange}
          />

          <button type="submit">Add this movie</button>
        </form>

        {/* <ul>
          {moviesList}
        </ul> */}
        <MoviesList movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
