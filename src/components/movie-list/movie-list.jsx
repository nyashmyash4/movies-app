import React from 'react'

import MovieItem from '../movie-item/movie-item'

import './movie-list.css'

const MovieList = (props) => {
  const { movies } = props
  const elements = movies.map((el) => {
    const { id } = el
    return <MovieItem data={el} key={id} />
  })
  return <ul className="movies__list">{elements}</ul>
}

export default MovieList
