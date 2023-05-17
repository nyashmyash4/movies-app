// import { format } from 'date-fns';

export default class MovieDB {
  _baseURL = 'https://api.themoviedb.org'

  async getResourse(url) {
    const response = await fetch(`${this._baseURL}${url}`, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGJlNmMxOTI2Y2RjODZiZGM1MzNiNDE1MmFhYzc0MCIsInN1YiI6IjY0NjNlODczZGJiYjQyMDBlMjJlODI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NAst_wNV2zuLq7L8UUthD8O3Hflcet8ixe0eSkDjl-E',
      },
    })

    if (!response.ok) {
      throw new Error(`Couldn't fetch ${url}, recieved ${response.status}`)
    }

    return await response.json()
  }

  async getAllMovies() {
    const keyWord = 'return'
    const response = await this.getResourse(`/3/search/movie?query=${keyWord}&%3F&language=en-US&include_adult=false`)

    return response.results
  }

  async getMoviePoster(path) {
    const url = `https://image.tmdb.org/t/p/original${path}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGJlNmMxOTI2Y2RjODZiZGM1MzNiNDE1MmFhYzc0MCIsInN1YiI6IjY0NjNlODczZGJiYjQyMDBlMjJlODI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NAst_wNV2zuLq7L8UUthD8O3Hflcet8ixe0eSkDjl-E',
      },
    })
    console.log(response.status)
    const imageBlob = await response.blob()
    const imageObjectURL = URL.createObjectURL(imageBlob)
    return imageObjectURL
  }
}
