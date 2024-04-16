import { renderfavorites, renderGenresOptions, renderMovieCard, renderMovies } from "./render.mjs"
import { state, toggleFavorite } from "./State.mjs"


export async function getMovies() {
    const moviesList = await fetchMovies({ page: state.page })
    state.movies = moviesList
    return
}
export function getGenresMovies() {
    const genres = state.movies.reduce((allGenres, { genres }) => allGenres.union(new Set(genres)), new Set([]))
    state.genres = Array.from(genres)
}
async function fetchMovies({ page, cached = true }) {
    const pageString = page ? `?page=${page}` : ''
    const headers = { "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd" }
    //const url = `https://moviestack.onrender.com/api/movies${pageString}`
    const url = `https://moviestack.onrender.com/api/movies`
    if (state.moviesFetched[url] && cached) return state.moviesFetched[url].movies
    try {

        const response = await fetch(url, { headers })

        const data = await response.json()
        state.moviesFetched[url] = data
        return data.movies
    }
    catch (error) {
        console.log(error)
        return []
    }


}


