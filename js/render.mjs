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


export function renderMovies() {
    const filters = state.filters.filter(({ value }) => (value && value !== ""))
    const filterMovies = filters.reduce((listadoFiltrado, { field, value }) => {
        const result = aplicarFiltro[field](listadoFiltrado, value)
        return result
    }, state.moviesSelected)
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
    const { id, image, genres, overview } = dataMovie
    const template = document.getElementById('MovieCard').content
    const cloneMovieCard = template.cloneNode(true)
    templateFields.forEach((field) => replaceElement[field](dataMovie[field], cloneMovieCard))
    return cloneMovieCard
}

const replaceElement = {
    title: (text, template) => {
        const node = template.querySelector(`[data-attribute='title']`)
        node.innerText = text
    },
    id: (id, template) => {
        const node = template.querySelector(`[data-attribute='id']`)
        node.id = id
        const nodeLink = template.querySelector(`[data-attribute='link']`)
        nodeLink.href = `/details/?movie=${id}`
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
    }
}
