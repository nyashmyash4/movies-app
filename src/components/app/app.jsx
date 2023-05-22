import React from 'react'
import { Pagination } from 'antd'

import MovieList from '../movieList/movieList'
import SearchPannel from '../searchPannel/searchPannel'
import MovieDB from '../../services/movie-db'

import './app.css'

const noMoviesFound = 'No movies found'

export default class App extends React.Component {
  movieServise = new MovieDB()
  state = {
    movies: [],
    loading: true,
    error: false,
    errorInfo: '',
    searchValue: '',
    currentPage: 1,
    totalPages: null,
  }

  componentDidMount() {
    this.getMovies()
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.currentPage !== this.state.currentPage) {
  //     this.setState({ loading: true })
  //     this.getMovies(this.state.searchValue, this.state.currentPage)
  //   }
  // }

  onError = (err) => {
    this.setState((state) => {
      return {
        ...state,
        movies: [],
        error: true,
        loading: false,
        errorInfo: err.message,
      }
    })
  }

  getInputValue = (evt) => {
    const value = evt.target.value.toLowerCase().trim()
    this.setState((state) => {
      return {
        ...state,
        currentPage: 1,
        loading: true,
        searchValue: value,
      }
    })
  }

  getMovies = (key) => {
    this.movieServise
      .getAllMovies(key, this.state.currentPage)
      .then((movies) => {
        const { results, total_pages: totalPages } = movies
        if (!results.length) {
          throw new Error(noMoviesFound)
        }
        this.setState((state) => {
          return {
            ...state,
            movies: results,
            error: false,
            loading: false,
            totalPages: totalPages,
          }
        })
      })
      .catch(this.onError)
  }

  changePage = (evt) => {
    this.setState((state) => {
      return {
        ...state,
        currentPage: evt,
        loading: true,
      }
    })
    this.getMovies(this.state.searchValue, this.state.currentPage)
  }

  render() {
    const { movies, loading, error, searchValue, totalPages, errorInfo, currentPage } = this.state
    return (
      <>
        <div className="wrapper">
          <section className="movies">
            <SearchPannel getInputValue={this.getInputValue} getMovies={this.getMovies} value={searchValue} />
            <MovieList movies={movies} error={error} errorInfo={errorInfo} loading={loading} />
            <Pagination
              current={currentPage}
              total={totalPages}
              pageSize={movies.length}
              showSizeChanger={false}
              onChange={(page) => this.changePage(page)}
              className={!movies.length ? 'hidden' : ''}
            />
          </section>
        </div>
      </>
    )
  }
}
