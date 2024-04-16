import { state } from "./State.mjs"
import { renderfavorites, renderMovies } from "./render.mjs"
import { toggleFavorite } from "./State.mjs"
export function addEventMovies() {
    const selectNode = document.getElementById('gene')
    const inputNode = document.getElementById('buscador')
    const main = document.getElementById("main")
    selectNode.disabled = false
    inputNode.disabled = false
    selectNode.addEventListener('change', setFilter)
    inputNode.addEventListener('input', setFilter)
    main.addEventListener("click", clickHeartMovie, true)

}


export function addEventFavorites() {
    const main = document.getElementById("main")
    main.addEventListener("click", clickHeartFavorite, true)
}
function clickHeartMovie(event) {

    if (event.target.tagName !== "BUTTON") return
    const isFavorite = toggleFavorite(event.target.dataset.movie)
    if (isFavorite)
        return event.target.classList.add('liked')
    event.target.classList.remove('liked')
}
function clickHeartFavorite(event) {
    if (event.target.tagName !== "BUTTON") return
    toggleFavorite(event.target.dataset.movie)
    renderfavorites()

}

function setFilter(event) {
    const { value, dataset } = event.target
    state.filters = state.filters.map(filter => filter.field === dataset.filter ? ({ field: filter.field, value }) : filter)
    renderMovies()
}

