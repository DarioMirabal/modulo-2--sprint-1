//CREANDO TODAS LAS CARDS

let content = document.getElementById("main")
main.innerHTML += "<div id='contenedor' class='flex justify-center flex-wrap gap-3'> </div>"
let contenedorPeliculas = document.getElementById("contenedor")

let crearTarjeta = function ( peliculas ) {
    return `
    <div class="w-60 h-52 w-1/5 p-2 flex flex-col border-solid border-2 m-2 border-gray-400 rounded-lg items-center max-md:w-4/5 bg-[#F2D8C2]">
        <img class="w-full h-28" src= ${peliculas.image} />
        <h3>${peliculas.title}</h3>
        <p class="text-xs line-clamp-4">${peliculas.overview}</p>
        <a href="./details.html?id=${peliculas.id}">Ver mas</a>
    </div>`
}

let crearTarjetas = function (pelicula , elemento){
    let movies = ""
    for (const iterator of pelicula) {
        movies += crearTarjeta(iterator)
    }
    elemento.innerHTML = movies
}

crearTarjetas(peliculas , contenedorPeliculas)



//CREANDO BUSCADOR DE PELICULAS

function buscarPeliculasPorTitulo(titulo) {
    console.log(generosPeliculas.value);
    const peliculasFiltrada = generosPeliculas.value === "todos" ? peliculas : filtrarPorGenero(peliculas, generosPeliculas.value)
   if (titulo === "")return peliculasFiltrada
    
   return peliculasFiltrada.filter(pelicula =>
        pelicula.title.toLowerCase().includes(titulo.toLowerCase())
    )
}

function mostrarResultados(resultados) {
    contenedor.innerHTML = '' 

    if (resultados.length === 0) {
        contenedor.innerHTML = '<p>no movies found.</p>'
       
    } 
    resultados.forEach(pelicula => {
        contenedor.innerHTML += crearTarjeta(pelicula)
    });
}

document.getElementById('buscador').addEventListener('input', function() {
    const textoBusqueda = this.value
        const resultados = buscarPeliculasPorTitulo(textoBusqueda.trim());
        mostrarResultados(resultados)
})





//FILTRO DE GENEROS 
let generosPeliculas = document.getElementById("gene")


function generoSinRepetir(peli) {
    let listagenero = peli.map(pelicula => pelicula.genres).flat()
    let sinRep = new Set(listagenero)
    let resultadogenero = Array.from(sinRep)
    return resultadogenero.toSorted()
}

function crearOptions(gen, elemento) {
    let gener = ""
    for (const iteradorgen of gen) {
        gener += `<option value="${iteradorgen}"> ${iteradorgen} </option>` 
    }
    elemento.innerHTML += gener
}

let generos = generoSinRepetir(peliculas)
crearOptions(generos , generosPeliculas)

generosPeliculas.addEventListener('change', () =>{
    const titulo = document.getElementById('buscador').value
    const filtroTitulos= peliculas.filter(pelicula =>
        pelicula.title.toLowerCase().includes(titulo.toLowerCase())
    )
    const peliculasfiltrada = generosPeliculas.value === "todos" ? filtroTitulos : filtrarPorGenero(filtroTitulos, generosPeliculas.value)
    crearTarjetas(peliculasfiltrada, contenedorPeliculas)
})

function filtrarPorGenero( listapeliculas, generoingresado){
    return listapeliculas.filter( pelicula => pelicula.genres.includes(generoingresado))
 }