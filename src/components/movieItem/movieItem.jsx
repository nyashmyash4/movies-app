import React from 'react'
import { format } from 'date-fns'
import { Rate } from 'antd'
import PropTypes from 'prop-types'

import { Consumer } from '../../context/context'
import './movieItem.css'

const POSTER_URL = 'https://image.tmdb.org/t/p/original'
const DEFAULT_POSTER = 'https://via.placeholder.com/183x281'
const DEFAULT_DESCRIPTION = 'Here is no overview for this movie'
const DEFAULT_RELEASE_DATE = 'Unknown release date'
const DEFAULT_GENRE = 'Unknown genre'
const MAX_DESCRIPTION_LENGTH = 165
const MAX_TITLE_LENGTH = 25

function formatDate(date) {
  const newDate = date.split('-')
  let [year, month, day] = newDate
  month = month - 1

  return format(new Date(year, month, day), 'MMMM q, yyyy')
}

function formatText(text, limit) {
  if (text.length <= limit) return text
  text = text.slice(0, limit)
  const lastSpace = text.lastIndexOf(' ')
  if (lastSpace > 0) {
    text = text.substr(0, lastSpace)
  }
  return text + '...'
}

function displayGenres(genresList, ids) {
  if (!ids.length) return DEFAULT_GENRE
  if (ids.length > 4) ids.length = 4
  const names = genresList.reduce((acc, el) => {
    if (ids.includes(el.id)) {
      acc.push(el.name)
    }
    return acc
  }, [])

  return names.map((el) => {
    return (
      <a href="/#" key={el}>
        {el}
      </a>
    )
  })
}

export default class MovieItem extends React.Component {
  render() {
    const { title, description, posterPath, release, avgRate, movieId, genreIds, rating } = this.props.data

    const poster = posterPath ? `${POSTER_URL}${posterPath}` : DEFAULT_POSTER
    const text = description ? formatText(description, MAX_DESCRIPTION_LENGTH) : DEFAULT_DESCRIPTION
    const rate = avgRate.toFixed(1)
    const releaseDate = release ? formatDate(release) : DEFAULT_RELEASE_DATE

    let rateClassNames = 'movie__avg-rate '

    if (avgRate < 3) {
      rateClassNames += 'rate-terrible'
    } else if (avgRate < 5 && avgRate >= 3) {
      rateClassNames += 'rate-bad'
    } else if (avgRate < 7 && avgRate >= 5) {
      rateClassNames += 'rate-normal'
    } else if (avgRate >= 7) {
      rateClassNames += 'rate-good'
    }

    return (
      <Consumer>
        {({ addRating, state: { guestId, genres } }) => (
          <li className="movie">
            <img src={poster} className="movie__poster" alt="poster"></img>
            <div className="movie__info">
              <div className="movie__header">
                <h4 className="movie__name">{formatText(title, MAX_TITLE_LENGTH)}</h4>
                <div className={rateClassNames}>{rate}</div>
              </div>

              <p className="movie__release">{releaseDate}</p>
              <div className="movie__genre">{displayGenres(genres, genreIds)}</div>
            </div>
            <p className="movie__description">{text}</p>
            <Rate
              allowHalf
              count={10}
              defaultValue={rating}
              className="movie__rate"
              onChange={(value) => addRating(value, guestId, movieId)}
            />
          </li>
        )}
      </Consumer>
    )
  }
}

MovieItem.defaultProps = {
  title: '',
  description: '',
  posterPath: '',
  release: '',
  avgRate: 0,
  movieId: 0,
  genreIds: [],
  rating: 0,
  addRating: () => {},
}

MovieItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  posterPath: PropTypes.string,
  release: PropTypes.string,
  avgRate: PropTypes.number,
  movieId: PropTypes.number,
  genreIds: PropTypes.array,
  rating: PropTypes.number,
  addRating: PropTypes.func,
}
