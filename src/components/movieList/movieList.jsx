import React from 'react'
import { Spin, Alert } from 'antd'

import MovieItem from '../movieItem/movieItem'

import './movieList.css'

// const errorText = 'Oops, something gone wrong, refresh your page or try again later'
// const errorName = 'Error'
// const noMoviestText = 'No movies found'

const MovieList = (props) => {
  const { movies, loading, error, errorInfo } = props

  const elements = movies.map((el) => {
    const { id } = el
    return <MovieItem data={el} key={id} />
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

export default MovieList
