import React from 'react'

import MovieList from '../movie-list/movie-list'
import MovieDB from '../../services/movie-db'

import './app.css'

export default class App extends React.Component {
  constructor() {
    super()

    this.getMovies()
  }
  movieServise = new MovieDB()
  state = {
    movies: [],
  }

  getMovies() {
    this.movieServise.getAllMovies().then((movies) => {
      this.setState({ movies: movies })
    })
  }
  render() {
    return (
      <div className="wrapper">
        <section className="movies">
          <MovieList movies={this.state.movies} />
        </section>
        ;
      </div>
    )
  }
}
