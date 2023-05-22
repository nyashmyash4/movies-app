import React from 'react'
import { format } from 'date-fns'

import './movieItem.css'

const POSTER_HEIGHT = '281px'
const POSTER_WIDTH = '183px'
const POSTER_URL = 'https://image.tmdb.org/t/p/original'
const DEFAULT_POSTER = 'https://via.placeholder.com/183x281'

export default class MovieItem extends React.Component {
  formatDate(date) {
    if (!date) return 'unknown release date'
    const newDate = date.split('-')
    let [year, month, day] = newDate
    month = month - 1

    return format(new Date(year, month, day), 'MMMM q, yyyy')
  }

  formatText(text, limit) {
    if (text.length <= limit) return text
    text = text.slice(0, limit)
    const lastSpace = text.lastIndexOf(' ')
    if (lastSpace > 0) {
      text = text.substr(0, lastSpace)
    }
    return text + '...'
  }

  render() {
    const { title, overview: description, poster_path: posterPath, release_date: release } = this.props.data

    const poster = posterPath ? `${POSTER_URL}${posterPath}` : DEFAULT_POSTER

    const text = description ? this.formatText(description, 220) : 'Here is no overview for this movie'

    return (
      <li className="movie">
        <img src={poster} width={POSTER_WIDTH} height={POSTER_HEIGHT} alt="poster"></img>
        <div className="movie__details">
          <h5 className="movie__name">{title}</h5>
          <p className="movie__release">{this.formatDate(release)}</p>
          <div className="movie__genre">
            <a href="/#">Action</a>
            <a href="/#">Drama</a>
          </div>
          <p className="movie__description">{text}</p>
        </div>
      </li>
    )
  }
}
