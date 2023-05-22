import React from 'react'
import { Online, Offline } from 'react-detect-offline'
import { Alert, Pagination } from 'antd'

import MovieList from '../movieList/movieList'
import SearchPannel from '../searchPannel/searchPannel'
import MovieDB from '../../services/movie-db'

import './app.css'

const offlineConsts = {
  message: 'No connection',
  description: 'Something wrong, please, check your internet connection',
}

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
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.getMovies(this.state.searchValue, this.state.currentPage)
    }
  }

  onError = (err) => {
    this.setState({ error: true, loading: false, errorInfo: err.message })
  }

  getInputValue = (evt) => {
    const value = evt.target.value.toLowerCase().trim()
    this.setState({ loading: true, searchValue: value })
  }

  getMovies = (key) => {
    this.movieServise
      .getAllMovies(key, this.state.currentPage)
      .then((movies) => {
        const { results, total_pages: totalPages } = movies
        if (!results.length) {
          throw new Error(noMoviesFound)
        }
        this.setState({ movies: results, loading: false, totalPages: totalPages })
      })
      .catch(this.onError)
  }

  setPage = (evt) => {
    // window.scrollTo({
    //   top: 0,
    //   left: 100,
    //   behavior: 'smooth',
    // })
    this.setState({ currentPage: evt })
  }

  render() {
    const { movies, loading, error, searchValue, totalPages, errorInfo, currentPage } = this.state

    return (
      <>
        <Online>
          <div className="wrapper">
            <section className="movies">
              <SearchPannel getInputValue={this.getInputValue} getMovies={this.getMovies} value={searchValue} />
              <MovieList movies={movies} error={error} errorInfo={errorInfo} loading={loading} />
              <Pagination
                current={currentPage}
                total={totalPages}
                pageSize={movies.length}
                showSizeChanger={false}
                onChange={(evt) => this.setPage(evt)}
                className="movies__pagination"
              />
            </section>
          </div>
        </Online>
        <Offline>
          <Alert
            message={offlineConsts.message}
            type="error"
            description={offlineConsts.description}
            className="no-internet"
          />
        </Offline>
      </>
    )
  }
}
