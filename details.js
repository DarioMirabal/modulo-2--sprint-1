let url = new URLSearchParams(location.search)
let id = url.get("id")
 console.log(id);

let pelis = (array, key) => array.find( obj => obj.id == key )

console.log(pelis(peliculas, id)) 

let crearDetalle = function ( peliculas ) {
    return `
    <div class="flex items-center flex-col gap-[20px]">
    <div class="flex gap-[40px]">
        <img class="w-[500px] p-6" src= ${peliculas.image} />
    <div class= "flex flex-col p-6">
        <h1 class="text-5xl">${peliculas.title}</h1>
        <h2 class="text-xl line-clamp-4">${peliculas.tagline}</h2>
        <h3>${peliculas.genres}</h3>  
    </div>
    </div>
    
   

    <div class="flex gap-[100px] p-[10px]">
    <table class="table-auto border-[1.5px] border-pink-100"> 
    <tr class="bg-gray-100"> 
      <td class="border border-gray-300 px-2 py-1 text-gray-600">original language</td> 
      <td class="border border-gray-300 px-2 py-1 text-gray-600">${peliculas.original_language}
    </tr>
    <tr>
      <td class="border border-gray-300 px-2 py-1">release date</td>
      <td class="border border-gray-300 px-2 py-1">${peliculas.release_date}</td>
    </tr>
    <tr class="bg-gray-50">
      <td class="border border-gray-300 px-2 py-1">runtime</td>
      <td class="border border-gray-300 px-2 py-1">${peliculas.runtime}</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-2 py-1">status</td>
      <td class="border border-gray-300 px-2 py-1">${peliculas.status}</td>
    </tr>
    </table>
    
    

    <table class="table-auto w-full border-collapse border-[1.5px] border-pink-100"> 
    <tr class="bg-gray-100"> 
      <td class="border border-gray-300 px-2 py-1 text-gray-600">Vote average</td> 
      <td class="border border-gray-300 px-2 py-1 text-gray-600">${peliculas.vote_average}
    </tr>
    <tr>
      <td class="border border-gray-300 px-2 py-1">budget</td>
      <td class="border border-gray-300 px-2 py-1">${peliculas.budget}</td>
    </tr>
    <tr class="bg-gray-50">
      <td class="border border-gray-300 px-2 py-1">revenue</td>
      <td class="border border-gray-300 px-2 py-1">${peliculas.revenue}</td>
    </tr>
    </table>
    </div>
</div>`
}

let conten = document.getElementById("main")
conten.innerHTML = crearDetalle(pelis(peliculas, id))