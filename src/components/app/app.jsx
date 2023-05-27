import React from 'react'
import { Pagination, Tabs } from 'antd'

import { Provider } from '../../context/context'
import MovieList from '../movieList/movieList'
import SearchPannel from '../searchPannel/searchPannel'
import MovieDB from '../../services/movie-db'

import './app.css'

const noMoviesFoundError = 'No movies found'
const noRatedMoviesFountError = 'No rated movies found'

const TABS = [
  {
    key: 'search',
    label: 'Search',
  },
  {
    key: 'rated',
    label: 'Rated',
  },
]

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
    guestId: null,
    activeTab: 'search',
    ratedMovies: [],
    genres: [],
  }

  componentDidMount() {
    this.createGuestSession()
    this.getMovies()
    this.getGenres()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPage !== prevState.currentPage) {
      this.getMovies(this.state.searchValue, this.state.currentPage)
    }
    if (this.state.activeTab !== prevState.activeTab) {
      if (this.state.activeTab === 'search') {
        this.getMovies(this.state.searchValue, this.state.currentPage)
        return
      }
      this.getRatedMovies(this.state.guestId)
    }
  }

  createGuestSession = () => {
    this.movieServise.createGuestSession().then((user) => {
      this.setState((state) => {
        return {
          ...state,
          guestId: user.guest_session_id,
        }
      })
    })
  }

  getMovies = (key) => {
    this.movieServise
      .getAllMovies(key, this.state.currentPage)
      .then((movies) => {
        const { results, totalPages } = movies
        if (!results.length) {
          throw new Error(noMoviesFoundError)
        }
        let newMoviesList = results
        if (this.state.ratedMovies.length) {
          newMoviesList = results.map((movie) => {
            let item
            this.state.ratedMovies.forEach((ratedMovie) => {
              if (movie.movieId === ratedMovie.movieId) {
                item = { ...movie, rating: ratedMovie.rating }
              } else {
                item = movie
              }
            })
            return item
          })
        }

        this.setState((state) => {
          return {
            ...state,
            movies: newMoviesList,
            error: false,
            loading: false,
            totalPages: totalPages,
          }
        })
      })
      .catch(this.onError)
  }

  getRatedMovies = (id) => {
    this.movieServise
      .getRatedMovies(id)
      .then((movies) => {
        const { results, totalPages } = movies
        if (!results.length) {
          throw new Error(noRatedMoviesFountError)
        }

        const newMoviesList = this.state.movies.map((movie) => {
          let item
          results.forEach((ratedMovie) => {
            if (movie.movieId === ratedMovie.movieId) {
              item = { ...movie, rating: ratedMovie.rating }
            } else {
              item = movie
            }
          })
          return item
        })
        this.setState((state) => {
          return {
            ...state,
            ratedMovies: results,
            movies: newMoviesList,
            error: false,
            loading: false,
            totalPages: totalPages,
          }
        })
      })
      .catch(this.onError)
  }

  getGenres = () => {
    this.movieServise.getGenres().then((genres) => {
      this.setState((state) => {
        return {
          ...state,
          genres: genres,
        }
      })
    })
  }

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

  changePage = (evt) => {
    this.setState((state) => {
      return {
        ...state,
        currentPage: evt,
        loading: true,
      }
    })
  }

  changeTab = (tabKey) => {
    this.setState((state) => {
      return {
        ...state,
        activeTab: tabKey,
      }
    })
  }

  render() {
    const { movies, loading, error, searchValue, totalPages, errorInfo, currentPage, activeTab, ratedMovies } =
      this.state
    const movieList = activeTab === 'search' ? movies : ratedMovies
    return (
      <div className="wrapper">
        <section className="movies">
          <Tabs
            items={TABS}
            defaultActiveKey="search"
            centered={true}
            size={'large'}
            onChange={(activeKey) => this.changeTab(activeKey)}
          />
          {activeTab === 'search' ? (
            <SearchPannel getInputValue={this.getInputValue} getMovies={this.getMovies} value={searchValue} />
          ) : null}

          <Provider value={{ addRating: this.movieServise.addRating, state: this.state }}>
            <MovieList movies={movieList} error={error} errorInfo={errorInfo} loading={loading} />
          </Provider>

          <Pagination
            current={currentPage}
            total={totalPages}
            pageSize={movieList.length}
            showSizeChanger={false}
            onChange={(page) => this.changePage(page)}
            className={!movieList.length ? 'hidden' : ''}
          />
        </section>
      </div>
    )
  }
}
