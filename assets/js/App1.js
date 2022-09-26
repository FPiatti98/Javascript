const peliculas= [
    {
        id: 1,
        nombre: "Matrix",
        imagen: "./img/matrix 1.png",
    },
    {
        id: 2,
        nombre: "El Origen",
        imagen: "./img/elOrigen 1.png",
    },
    {
        id: 3,
        nombre: "Bastardos Sin Gloria",
        imagen: "./img/bastardos sin gloria 1.png",
    },
    {
        id: 4,
        nombre: "El Club De La Pelea",
        imagen: "./img/fightclub 1.png",
    },
    {
        id: 5,
        nombre: "Troya",
        imagen: "./img/troya 1.png",
    },
]

const sucursales= [
    {
        id: 1,
        nombre: "Nortcenter",
    },
    {
        id: 2,
        nombre: "Showcenter",
    },
    {
        id: 3,
        nombre: "Cinemark",
    }
]

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
        opcion.innerHTML = `<option value="${item.nombre}" selected>${item.nombre}</option>`;
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
        div.innerHTML= `<img class="card-img-top" src="${pelicula.imagen}" alt="Card image cap">
                    <div class="card-body"> ${pelicula.nombre} </div>`;
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
    let boton = document.createElement("div");
    boton.innerHTML= `<button type="button" class="btn btn-primary">Buscar</button>`;
    boton.addEventListener("click", buscar);

    contenido.appendChild(boton);

}

function buscar(){

    let peliculaElegida = document.getElementById("peliculas disponibles").value;
    let sucursalElegida = document.getElementById("sucursales disponibles").value;

    const peliculasucursal = {
        pelicula: peliculaElegida,
        sucursal: sucursalElegida
    };

    const peliculasucursalJSON = JSON.stringify(peliculasucursal);
    localStorage.setItem('input', peliculasucursalJSON);


    let cartelera = document.getElementById("cartelera");
    cartelera.innerHTML= "";

    let contenedor = document.createElement("div");
    contenedor.className = "horariosEntradas";

    let horariosDisponibles= document.createElement("div");
    horariosDisponibles.className = "horarios custom-control custom-radio"
    horariosDisponibles.innerHTML= `<h4>Por favor elija un horario</h4>` 

    contenedor.appendChild(horariosDisponibles);

    agregarHorario(doblado, "Doblado",horariosDisponibles);
    agregarHorario(subtitulado,"subtitulado",horariosDisponibles);

    //crea una lista pra las entradas

    let entradas = document.createElement("div");
    entradas.innerHTML = `
                        <label for="">Selecciona la cantidad de entradas:</label>
                        <select id="cines" name="cine">
                            <option value="" selected></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>`

    //crea un boton para acceder al formulario

    let boton = document.createElement("div");
    boton.innerHTML= `<button type="button" class="btn btn-primary">Siguiente</button>`;
    boton.addEventListener('click', Formulario);

    contenedor.appendChild(entradas);
    contenedor.appendChild(boton);

    cartelera.appendChild(contenedor);
}

//esta funcion agrega los horarios de las arrays doblado y subtitulado
//array es la array de la que se van a tomar los horarios, array name es el titulo que se le va a poner y appendWhere es para que todo se pueda appendear al div creado con la funcion buscar
function agregarHorario(array,arrayname,appendWhere){

    let titulo = document.createElement("h4");
    titulo.innerHTML = `${arrayname}`
    appendWhere.appendChild(titulo);

    //el for each agrega los horarios y los appendea al div que contiene la variable titulo
    array.forEach((elemento)=>{     
        let opcion = document.createElement("div");
        opcion.className= "custom-control custom-radio"
        opcion.innerHTML=`
                        <input type="radio" id="${elemento}" name="customRadio" class="custom-control-input" value="${elemento}">
                        <label class="custom-control-label" for="${elemento}">${elemento}</label>`
        appendWhere.appendChild(opcion);
    })

    //el div que contiene titulo se appendea al div creado en la funcion Buscar
};

function Formulario(){

    //Esta funcion crea un formulario para que el usuario lo llene con sus datos

    //buscar el horario elegido
    let horarios = document.getElementsByName("customRadio");
    let horarioElegido = ""
        for (i = 0; i < horarios.length; i++){
            if (horarios[i].checked){
               horarioElegido = horarios[i].value
            };
        };

    
    //busca la cantidad de entradas

    let entradas = document.getElementById('cines');
    let entradaElegida = entradas.options[entradas.selectedIndex].value;
    
    //guarda en el locastorage un json de el hoario y las entradas elegidas

    const input = localStorage.getItem('input');
    const newinput = JSON.parse(input);

    newinput.horario = horarioElegido;
    newinput.entradas = entradaElegida;

    const newinputJSON = JSON.stringify(newinput);
    localStorage.setItem ('input', newinputJSON);

    let cartelera = document.getElementById("cartelera");
    cartelera.innerHTML= "";

    let formulario = document.createElement("div");
    formulario.innerHTML=
    `
    <h4>Por favor complete los siguientes datos</h4>
    <form>
        <div class="form-group">
            <label for="formGroupExampleInput">Nombre y Apellido</label>
            <input type="text" class="form-control" id="Nombre" placeholder="Nombre y Apellido">
        </div>
        <div class="form-group">
            <label for="formGroupExampleInput2">Mail</label>
            <input type="text" class="form-control" id="Mail" placeholder="mail">
        </div>
        <div class="form-group">
            <label for="formGroupExampleInput2">Telefono o Celular</label>
            <input type="text" class="form-control" id="Celular" placeholder="Telefono o Celular">
        </div>
    </form>
    `

    let boton = document.createElement("div");
    boton.innerHTML = `<button type="button" class="btn btn-primary">Siguiente</button>`;
    boton.addEventListener("click", Resultado);
    
    cartelera.appendChild(formulario);
    cartelera.appendChild(boton);
}

function Resultado(){

    //Esta funcion es para mostrar todos los datos que fue completando el usuario

    //busca los inputs del form
    let nombre = document.getElementById("Nombre").value
    let mail = document.getElementById("Mail").value
    let celular = document.getElementById("Celular").value

    //busca el json, lo convierte en objeto y agrega los inputs del form

    const input = localStorage.getItem('input');
    const newinput = JSON.parse(input);

    newinput.nombre = nombre;
    newinput.mail = mail;
    newinput.celular = celular;

    let cartelera = document.getElementById("cartelera");
    cartelera.innerHTML= "";

    //muestra los inputs que fue introduciendo el usuario.

    let mostrar = document.createElement("div");
    mostrar.innerHTML=`<h2>${newinput.nombre}, usted a comprado ${newinput.entradas} entradas para la pelicula ${newinput.pelicula} en la sucursal ${newinput.sucursal} a las ${newinput.horario} </h2>
    <h4>Se ha enviado un mail con todos los detalles de la compra a la casilla de mail: ${newinput.mail}. Gracias por su compra y que disfrute de la funcion.</h4>`

    let boton = document.createElement("div");
    boton.innerHTML = `<button type="button" class="btn btn-primary">Volver a incio</button>`;
    boton.addEventListener("click", volverInicio);
    
    cartelera.appendChild(mostrar);
    cartelera.appendChild(boton);
}

function volverInicio(){
    //Esta fucion  vuelve a completar el html con la cartelera del principio
    let cartelera = document.getElementById("cartelera");
    cartelera.innerHTML= "";
    agregarCartelera(peliculas);
};

agregarBuscadorPelicula();
agregarCartelera(peliculas);




