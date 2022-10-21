async function App() {
    let peliculas;
  
    const res = await fetch('/assets/js/data.json')
  
    peliculas = await res.json();
  
    agregarCartelera(peliculas);
    
}

function agregarCartelera(data){
        //al igual que la funcion agregarSelector usa el mismo principio de obtener un div del html y agregarle una card por cada elemento del array
    
        let container = document.getElementById("cartelera");
    
        data.forEach((pelicula)=>{
            let div = document.createElement("div");
            div.className= "card movies";
            div.innerHTML= `<img class="card-img-top" src="${pelicula.imagen}" alt="Card image cap">
                        <div class="card-body"> ${pelicula.nombre} </div>`;
            div.addEventListener("click", descripcion);
            container.appendChild(div);
        })
};

function descripcion(){
    
    let container = document.getElementById("contenido");
    container.innerHTML="";
}

App();


