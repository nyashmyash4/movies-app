// import { format } from 'date-fns';

export default class MovieDB {
  _baseURL = 'https://api.themoviedb.org'
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGJlNmMxOTI2Y2RjODZiZGM1MzNiNDE1MmFhYzc0MCIsInN1YiI6IjY0NjNlODczZGJiYjQyMDBlMjJlODI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NAst_wNV2zuLq7L8UUthD8O3Hflcet8ixe0eSkDjl-E',
    },
  }

  async getResourse(url) {
    const response = await fetch(`${this._baseURL}${url}`, this.options)

    if (!response.ok) {
      throw new Error(`Couldn't fetch ${url}, recieved ${response.status}`)
    }

    return await response.json()
  }

  async getAllMovies(keyWord, page = '1') {
    if (!keyWord) {
      keyWord = 'they'
    }
    const params = `/3/search/movie?query=${keyWord}&%3F&language=en-US&include_adult=false&page=${page}`
    const response = await this.getResourse(params)
    return response
  }

  // async getMoviePoster(path) {
  //   const url = `https://image.tmdb.org/t/p/original${path}`
  //   const response = await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGJlNmMxOTI2Y2RjODZiZGM1MzNiNDE1MmFhYzc0MCIsInN1YiI6IjY0NjNlODczZGJiYjQyMDBlMjJlODI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NAst_wNV2zuLq7L8UUthD8O3Hflcet8ixe0eSkDjl-E',
  //     },
  //   })
  //   console.log(response.status)
  //   const imageBlob = await response.blob()
  //   const imageObjectURL = URL.createObjectURL(imageBlob)
  //   return imageObjectURL
  // }
}
