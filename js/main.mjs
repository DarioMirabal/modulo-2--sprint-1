import { state } from "./State.mjs"
import { getMovies, getGenresMovies } from "./getMovies.mjs"
import { renderfavorites, renderMovies, renderGenresOptions } from "./render.mjs"
import { addEventFavorites, addEventMovies } from "./eventListeners.mjs"





function init() {
    const initFunctions = {
        "/": initHome,
        "/movies/": initMovies,
        "/favorites/": initFavorites,
        "/details/": initDetails
    }
    state.pathName = getCurrentPathName()

    initFunctions[state.pathName]()

}
init()

function getCurrentPathName() {
    return window.location.pathname
}


async function initMovies() {
    await getMovies()
    renderMovies() 
    getGenresMovies()
    renderGenresOptions()

    addEventMovies()
}
function initHome() {

}
function initFavorites() {

    renderfavorites()
    addEventFavorites()
}
async function initDetails() {
    let url = new URLSearchParams(location.search)
    let movie = url.get("movie")
    await getMovies()
    console.log(state)
}


