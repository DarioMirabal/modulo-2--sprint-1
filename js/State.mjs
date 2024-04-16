export const state = {
    moviesShow: [],
    pathName: null,
    moviesFetched: [],
    filters: [{ field: "genres", value: null }, { field: "title", value: null }],
    movieCards: {},
    favorites: readFavorites()  ?? {}
}


function readFavorites() {
    return JSON.parse(localStorage.getItem("favorites"))

}
function saveFavorites() {
    return localStorage.setItem("favorites", JSON.stringify(state.favorites))
}
export function toggleFavorite(idMovie) {

    if (state.favorites[idMovie]) {
        //const { [idMovie]: removedFavorite, ...newFavorites } = state.favorites
        //state.favorites = newFavorites
        delete state.favorites[idMovie]
        saveFavorites()
        return false
    }
    const movieData = state.movies.find(({ id }) => id === idMovie)
    state.favorites = { ...state.favorites, [idMovie]: movieData }
    saveFavorites()
    return true
}
