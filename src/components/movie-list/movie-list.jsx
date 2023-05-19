import React from 'react'
import { Spin, Alert } from 'antd'

import MovieItem from '../movie-item/movie-item'

import './movie-list.css'

const errorText = 'Oops, something gone wrong, refresh your page or try again later'
const errorName = 'Error'

const MovieList = (props) => {
  const { movies, loading, error } = props

  const elements = movies.map((el) => {
    const { id } = el
    return <MovieItem data={el} key={id} />
  })

  const hasData = !(loading || error)
  const errorMessage = error ? (
    <Alert message={errorName} type="error" showIcon description={errorText} className="movies__error" />
  ) : null
  const loader = loading ? <Spin size="large" className="movies__loader" /> : null
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
