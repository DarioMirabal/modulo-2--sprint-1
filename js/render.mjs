import { state } from "./State.mjs"
const aplicarFiltro = {
    title: (moviesList, value) => {
        const sentence = value.toLowerCase()
        return moviesList.filter(({ title }) => title.toLowerCase().includes(sentence))
    },
    genres: (moviesList, value) => {

        return moviesList.filter(({ genres }) => genres.includes(value))
    },
}

export function renderfavorites() {

    const nodesMovies = Object.values(state.favorites).map(movie => renderMovieCard(movie))

    document.getElementById("main").replaceChildren(...nodesMovies)
}

export function renderMovies() {

    // filtro los filtros para evitar tener que realizar operacion de filtra innecesarias
    const filters = state.filters.filter(({ value }) => (value && value !== ""))

    // he usado reducer porque asi puedo aplicar cualquier numero de filtros
    // los resultados de un filtro se pasan al siguiente usando el acumulador del reduce
    // como datos iniciales uso el array de todas las peliculas
    const filterMovies = filters.reduce((listadoFiltrado, { field, value }) => {
        const result = aplicarFiltro[field](listadoFiltrado, value)
        return result
    }, state.movies)

    // pinto todas las cards
    const nodesMovies = filterMovies.map(movie => renderMovieCard(movie))
    document.getElementById("main").replaceChildren(...nodesMovies)

}


export function renderGenresOptions() {
    const genresList = state.genres.map((genre) => createElement({ type: 'option', text: genre }))
    const genOptions = [createElement({ type: "option", text: "------", value: "" }), ...genresList]
    const selectNode = document.getElementById('gene')
    selectNode.replaceChildren(...genOptions)

}



function createElement({ type, text, className, value }) {
    const newNode = document.createElement(type)
    if (type === "option") {
        const finalValue = value !== "" ? text : value
        newNode.value = finalValue
    }

    newNode.innerText = text
    return newNode
}

export function renderMovieCard(dataMovie) {
    const templateFields = ["title", "id", "image", "overview"]

    const template = document.getElementById('MovieCard').content
    const cloneMovieCard = template.cloneNode(true)
    templateFields.forEach((field) => replaceElement[field](dataMovie[field], cloneMovieCard))
    return cloneMovieCard
}

const replaceElement = {
    title: (text, template) => {
        const node = template.querySelector(`[data-attribute='title']`)
        // const textNode=document.createTextNode(text)
        // node.addChild(textNode)
        node.innerText = text
    },
    id: (id, template) => {
        const node = template.querySelector(`[data-attribute='id']`)
        node.id = id
        const nodeLink = template.querySelector(`[data-attribute='link']`)
        nodeLink.href = `/details/?movie=${id}`
        const heart = template.querySelector(`[data-attribute='like']`)
        heart.dataset.movie = id
        if (state.favorites[id])
            heart.classList.add("liked")
    },
    image: (src, template) => {
        const nodeImage = template.querySelector(`[data-attribute='image']`)
        nodeImage.src = `https://moviestack.onrender.com/static/${src}`
    },
    overview: (text, template) => {
        const node = template.querySelector(`[data-attribute='overview']`)
        node.innerText = text
    },
    genres: (genresList, template) => {
        const node = template.querySelector(`[data-attribute='genres']`)
        node.innerText = genresList.join(',')
    },

}
