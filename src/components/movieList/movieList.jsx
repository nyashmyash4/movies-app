import React from 'react'
import { Spin, Alert } from 'antd'
import PropTypes from 'prop-types'

import MovieItem from '../movieItem/movieItem'

import './movieList.css'

const MovieList = (props) => {
  const { movies, loading, error, errorInfo } = props

  const elements = movies.map((el) => {
    const { movieId } = el
    return <MovieItem data={el} key={movieId} />
  })

  const hasData = !(loading || error)
  const errorMessage =
    error && !loading ? <Alert type="info" description={errorInfo} className="movies__error" /> : null
  const loader = loading && !error ? <Spin size="large" className="movies__loader" /> : null
  const content = hasData ? elements : null

  return (
    <ul className="movies__list">
      {errorMessage}
      {loader}
      {content}
    </ul>
  )
}

MovieItem.defaultProps = {
  movies: [],
  loading: false,
  error: false,
  errorInfo: '',
}

MovieItem.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      posterPath: PropTypes.string,
      release: PropTypes.string,
      avgRate: PropTypes.number,
      movieId: PropTypes.number,
      genreIds: PropTypes.array,
      rating: PropTypes.number,
    })
  ),
  loading: false,
  error: false,
  errorInfo: '',
}

export default MovieList
