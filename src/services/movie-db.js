// import { format } from 'date-fns';

export default class MovieDB {
  constructor() {
    this._baseURL = 'https://api.themoviedb.org'
    this._apiKey = '50be6c1926cdc86bdc533b4152aac740'
    this.addRating = this.addRating.bind(this)
  }

  async getResourse(url, options = null) {
    const response = await fetch(`${this._baseURL}${url}`, options)

    if (!response.ok) {
      throw new Error(`Couldn't fetch ${url}, recieved ${response.status}`)
    }

    return await response.json()
  }

  async getAllMovies(keyWord, page = '1') {
    if (!keyWord) {
      keyWord = 'friend'
    }
    const params = `/3/search/movie?api_key=${this._apiKey}&query=${keyWord}&%3F&language=en-US&include_adult=false&page=${page}`
    const response = await this.getResourse(params)
    return this._transformMovieData(response)
  }

  async createGuestSession() {
    const params = `/3/authentication/guest_session/new?api_key=${this._apiKey}`
    const response = await this.getResourse(params)

    return response
  }

  async addRating(value, guestId, movieId) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: value }),
    }
    const params = `/3/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`
    const response = await this.getResourse(params, options)

    return response
  }

  async getRatedMovies(guestId, page = 1) {
    const params = `/3/guest_session/${guestId}/rated/movies?api_key=${this._apiKey}&&page=${page}`
    const response = await this.getResourse(params)
    return this._transformMovieData(response)
  }

  async getGenres() {
    const params = `/3/genre/movie/list?api_key=${this._apiKey}`
    const response = await this.getResourse(params)

    return response.genres
  }

  _transformMovieData(movies) {
    const totalPages = movies.total_pages
    const totalResults = movies.total_results
    const page = movies.page
    const moviesData = {}
    const results = movies.results.map((movie) => {
      return {
        title: movie.title,
        description: movie.overview,
        posterPath: movie.poster_path,
        release: movie.release_date,
        avgRate: movie.vote_average,
        movieId: movie.id,
        genreIds: movie.genre_ids,
        rating: movie.rating ? movie.rating : null,
      }
    })
    moviesData.totalPages = totalPages
    moviesData.totalResults = totalResults
    moviesData.results = results
    moviesData.page = page

    return moviesData
  }
}
