let content = document.getElementById("main")
main.innerHTML += "<div id='contenedor' class='flex justify-center flex-wrap gap-3'> </div>"


let crearTarjeta = function ( peliculas ) {
    return `
    <div class="w-60 h-52 w-1/5 p-2 flex flex-col border-solid border-2 m-2 border-gray-400 rounded-lg items-center max-md:w-4/5 bg-[#F2D8C2]">
        <img class="w-full h-28" src= ${peliculas.image} />
        <h3>${peliculas.title}</h3>
        <p class="text-xs line-clamp-4">${peliculas.overview}</p>
        <a href="./details.html?id=${peliculas.id}">Ver mas</a>
    </div>`
}

console.log(crearTarjeta);
for (const iterator of peliculas) {
    contenedor.innerHTML += crearTarjeta(iterator)
}




//CREANDO BUSCADOR DE PELICULAS

function buscarPeliculasPorTitulo(titulo) {
    return peliculas.filter(pelicula =>
        pelicula.title.toLowerCase().includes(titulo.toLowerCase())
    );
}

function mostrarResultados(resultados) {
    const contenedorResultados = document.getElementById('resultados');
    contenedorResultados.innerHTML = ''; 

    if (resultados.length === 0) {
        contenedorResultados.innerHTML = '<p>No se encontraron películas.</p>';
        return;
    }

    resultados.forEach(pelicula => {
        const elemento = document.createElement('div');
        elemento.innerHTML = `
        <div class="w-60 h-52 w-1/5 p-2 flex flex-col border-solid border-2 m-2 border-gray-400 rounded-lg items-center max-md:w-4/5 bg-[#F2D8C2]">
        <img class="w-full h-28" src= ${pelicula.image} />
        <h3>${pelicula.title}</h3>
        <p class="text-xs line-clamp-4">${pelicula.overview}</p>
        <a href="./details.html?id=${pelicula.id}">Ver mas</a>
    </div>
        `;
        contenedorResultados.appendChild(elemento);
    });
}

document.getElementById('buscador').addEventListener('input', function() {
    const textoBusqueda = this.value;
    const resultados = buscarPeliculasPorTitulo(textoBusqueda);
    mostrarResultados(resultados);
});
