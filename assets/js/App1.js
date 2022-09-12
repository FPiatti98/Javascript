const peliculas= ["Matrix","El Origen","Bastardos sin gloria","Fightclub","Troya"];

const sucursales= ["Nortcenter","Showcenter","Cinemark"]


// La funcion va a crear un div que contenga un selector de opciones para las peliculas y para las sucursales
//para necesita el array y el nombre del id para la tag select ya que si les pusiera el mismo me pondria las 2 arrays en 1 solo div
function agregarSelector(array,idSelector,titulo){

//crea el div
    let div = document.createElement("div");
    div.innerHTML = `<label for="">Selecciona una ${titulo}:</label>
                    <select id="${idSelector}" name="item">
                        <option value="" selected></option>
                    </select>`;
    
//busca el div padre con el id #selectores que esta en el html
    let container = document.getElementById("selectores");
//hace un append con el padre para crear el div 
    container.appendChild(div);
//busca el tag select anteriormente creado con el id que recibe la funcion
    let selector = document.getElementById(`${idSelector}`);
//este foreach crea una opcion por cada elemento del array y hace un append con el tag select
    array.forEach((item)=>{
        let opcion = document.createElement("option");
        opcion.innerHTML = `<option value="${item}" selected>${item}</option>`;
        selector.appendChild(opcion);
    });

}

//la funcion es mpara agregar unas cards que en un furuto contengan la imagen y el nomlbre de cada pelicula
function agregarCartelera(array){

//al igual que la funcion agregarSelector usa el mismo principio de obtener un div del html y agregarle una card por cada elemento del array

    let container = document.getElementById("cartelera");

    array.forEach((pelicula)=>{
        let div = document.createElement("div");
        div.className= "card movies";
        div.innerHTML= `<img class="card-img-top" src="" alt="Card image cap">
                    <div class="card-body"> ${pelicula} </div>`;
        container.appendChild(div);
    })

}

agregarSelector(peliculas,"peliculas disponibles", "pelicula");
agregarSelector(sucursales, "sucursales disponibles", "sucursal");
agregarCartelera(peliculas);


