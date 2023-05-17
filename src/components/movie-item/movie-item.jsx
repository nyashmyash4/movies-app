import React from 'react'
import { format } from 'date-fns'

import './movie-item.css'

export default class MovieItem extends React.Component {
  static defaultProps = {
    data: {
      release: '2020-02-02',
    },
  }
  formatDate(date) {
    if (!date) return 'unknown release date'
    const newDate = date.split('-')
    const year = +newDate[0]
    const month = +newDate[1] - 1
    const day = +newDate[2]

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
    const { title, overview: description, poster_path: image, release_date: release } = this.props.data

    const posterPath = image ? `https://image.tmdb.org/t/p/original${image}` : 'https://via.placeholder.com/183x281'

    const text = description ? this.formatText(description, 220) : 'Here is no overview for this movie'
    // const date = release ? this.formatDate(release) : 'unknown release date';

    return (
      <li className="movie">
        <img src={posterPath} width="183px" height="281px" alt="poster"></img>
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
