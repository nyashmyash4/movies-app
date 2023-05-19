import React from 'react'
import { Online, Offline } from 'react-detect-offline'
import { Alert } from 'antd'

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
    loading: true,
    error: false,
    errorInfo: '',
  }

  onError = () => {
    this.setState({ error: true, loading: false })
  }

  getMovies() {
    this.movieServise
      .getAllMovies()
      .then((movies) => {
        this.setState({ movies: movies, loading: false })
      })
      .catch(this.onError)
  }
  render() {
    const { movies, loading, error } = this.state

    return (
      <>
        <Online>
          <div className="wrapper">
            <section className="movies">
              <MovieList movies={movies} error={error} loading={loading} />
            </section>
          </div>
        </Online>
        <Offline>
          <Alert
            message="No connection"
            type="error"
            description="Something wrong, please, check your internet connection"
            className="no-internet"
          />
        </Offline>
      </>
    )
  }
}
