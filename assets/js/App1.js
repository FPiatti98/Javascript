const peliculas= ["Matrix","El Origen","Bastardos sin gloria","Fightclub","Troya"];

const sucursales= ["Nortcenter","Showcenter","Cinemark"]

const doblado= ["20:00 hs", "22:00 hs", "00:00 hs"];//armar funcion para que genere un array que contenga un horario cada 2 horas a partir de las 12 am

const subtitulado = ["14:00 hs", "16:00 hs","18:00 hs"];

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

//esta funcion agrega las slectores de pelicula y el boton para buscar los horarios
function agregarBuscadorPelicula(){

    agregarSelector(peliculas,"peliculas disponibles", "pelicula");
    agregarSelector(sucursales, "sucursales disponibles", "sucursal");

    //busca el div creado en el html
    let contenido= document.getElementById("selectores");
    
    //agrega un boton para que con el evento onClick ejecute la funcion Buscar
    let boton = document.createElement("button");
    boton.innerHTML= `<button type="button" class="btn btn-primary" onClick="buscar()">Primary</button>`

    contenido.appendChild(boton);
}
 
//esta funcion agrega los horarios de las arrays doblado y subtitulado
//array es la array de la que se van a tomar los horarios, array name es el titulo que se le va a poner y appendWhere es para que todo se pueda appendear al div creado con la funcion buscar
function agregarHorario(array,arrayname,appendWhere){
    let iterador= 0
    //el iterador es para el correcto funcionamiento del input de bootstrap (id=customRadio1,2,3,etc)
    let titulo = document.createElement("div");
    titulo.innerHTML = `<h4>${arrayname}<h4>`

    //el for each agrega los horarios y los appendea al div que contiene la variable titulo
    array.forEach((elemento)=>{
        iterador += 1
        let opcion = document.createElement("div");
        opcion.innerHTML=`
                          <div class="custom-control custom-radio">
                          <input type="radio" id="customRadio${iterador}" name="customRadio" class="custom-control-input">
                          <label class="custom-control-label" for="customRadio${iterador}">${elemento}</label>
                          </div>`
        titulo.appendChild(opcion);
    })

    //el div que contiene titulo se appendea al div creado en la funcion Buscar
    appendWhere.appendChild(titulo);
}

function buscar(){

    //crea un div que va a contener los horarios dependiendo de si son doblados al español o si son subtitulados

    let cartelera = document.getElementById("cartelera");//agregar clase para que los horarios no queden centrados
    cartelera.innerHTML= "";

    let horariosDisponibles= document.createElement("div");
    horariosDisponibles.innerHTML= `<h4>Por favor elija un horario<h4>` 

    cartelera.appendChild(horariosDisponibles);

    agregarHorario(doblado, "Doblado",horariosDisponibles);
    agregarHorario(subtitulado,"subtitulado",horariosDisponibles);

}

agregarBuscadorPelicula();
agregarCartelera(peliculas);




