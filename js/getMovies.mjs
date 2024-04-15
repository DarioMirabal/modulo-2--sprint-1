import { renderGenresOptions, renderMovieCard, renderMovies } from "./render.mjs"
import { state } from "./State.mjs"


export async function getMovies({ page }) {
    const moviesList = await fetchMovies({ page })
    const genres = moviesList.reduce((allGenres, { genres }) => allGenres.union(new Set(genres)), new Set([]))
    state.genres = Array.from(genres)
    state.moviesSelected = moviesList
    const selectNode = document.getElementById('gene')
    const inputNode = document.getElementById('buscador')
    selectNode.disabled = false
    inputNode.disabled = false
    selectNode.addEventListener('change', setFilter)
    inputNode.addEventListener('input', setFilter)



    renderGenresOptions()
    renderMovies()
}


function setFilter(event) {
    const { value, dataset } = event.target
    
    state.filters = state.filters.map(filter => filter.field === dataset.filter ? ({ field: filter.field, value }) : filter)

    renderMovies()
}




async function fetchMovies({ page, cached = true }) {
    const pageString = page ? `?page=${page}` : ''
    const headers = { "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd" }
    const url = `https://moviestack.onrender.com/api/movies${pageString}`
    if (state.moviesFetched[url] && cached) return state.moviesFetched[url].movies

    const response = await fetch(url, { headers })
    const data = await response.json()
    state.moviesFetched[url] = data
    return data.movies
}
