//La funcion principal que realiza el fetch y se lo pasa como parametro a la funcion que contiene todo el codigo
async function App() {
    let peliculas;
    
    //realiza el fetch del array de objetos que contiene las peliculas

    const res = await fetch('data.json')
  
    peliculas = await res.json();
    
    subApp(peliculas);
    
};

async function subApp(peliculas){

//define los horarios y las sucursales

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

const doblado= ["20:00 hs", "22:00 hs", "00:00 hs"];

const subtitulado = ["14:00 hs", "16:00 hs","18:00 hs"];

// La funcion va a crear un div que contenga un selector de opciones para las peliculas y para las sucursales.
//para eso necesita el array y el nombre del id para la tag select.
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

};

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

//esta funcion le da a elegir al usuario un horario y una cantidad de entradas

    let peliculaElegida = document.getElementById("peliculas disponibles").value;
    let sucursalElegida = document.getElementById("sucursales disponibles").value;

    //valida si el ussuario selecciono una pelicula y una sucursal

    if(peliculaElegida == "" || sucursalElegida == ""){
        Swal.fire({
            title: 'Por favor seleccione una pelicula y una sucursal',
            icon: 'info'
        });
        return
    }

    //crea el objeto que se va a usar como JSON.

    const peliculasucursal = {
        pelicula: peliculaElegida,
        sucursal: sucursalElegida
    };

    //guarda el JSON en el localstorage.

    const peliculasucursalJSON = JSON.stringify(peliculasucursal);
    localStorage.setItem('input', peliculasucursalJSON);

    //vacia el div con el id "cartelera".

    let cartelera = document.getElementById("cartelera");
    cartelera.innerHTML= "";

    //crea un div donde se va a generar los horarios disponibles

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
//el parametro array es la array de la que se van a tomar los horarios, array name es el titulo que se le va a poner y appendWhere es para que todo se pueda appendear al div creado con la funcion buscar
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

//esta funcion valida si es subtitulada o doblada
function validarSubDob(data){
    let subDob =""
    //usa un for para ver a que array pertenece el hortario elegido
    for (let i = 0; i < 3; i++){
        if (data == subtitulado[i]){
            subDob = "Subtitulada"
        }else if(data == doblado[i]){
            subDob = "Doblada"
        }
    }
    return subDob
}

function Formulario(){

    //Esta funcion crea un formulario para que el usuario lo llene con sus datos

    //buscar el horario elegido
    let horarios = document.getElementsByName("customRadio");
    let horarioElegido = "";
    let subDobElegido = "";

        for (i = 0; i < horarios.length; i++){

            if (horarios[i].checked){
               horarioElegido = horarios[i].value
            };
        };

        //llama a la funcion par validar si es subtitulada o doblada.

        subDobElegido = validarSubDob(horarioElegido);
    
    //busca la cantidad de entradas

    let entradas = document.getElementById('cines');
    let entradaElegida = entradas.options[entradas.selectedIndex].value;

    //valida que el usuario haya elegido un horario y una cantidad de entradas

    if (horarioElegido == "" || entradaElegida == ""){
        Swal.fire({
            title: 'Por favor seleccione un horario y una cantidad de entradas',
            icon: 'info'
        });
        return
    };
    
    //guarda en el locastorage un json de el hoario y las entradas elegidas

    const input = localStorage.getItem('input');
    const newinput = JSON.parse(input);

    newinput.horario = horarioElegido;
    newinput.entradas = entradaElegida;
    newinput.subDob = subDobElegido;

    const newinputJSON = JSON.stringify(newinput);
    localStorage.setItem ('input', newinputJSON);

    //vacia el div con el id "cartelera" para crear el formulario

    let cartelera = document.getElementById("cartelera");
    cartelera.innerHTML= "";

    let formulario = document.createElement("div");
    formulario.className = 'FormularioID'
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

    //añade un boton para llamar a la funcion que va a validar los datos del formulario

    let boton = document.createElement("div");
    boton.innerHTML = `<button type="button" class="btn btn-primary">Siguiente</button>`;
    boton.addEventListener("click", validarInputs);
    
    cartelera.appendChild(formulario);
    cartelera.appendChild(boton);
}

function validarInputs(){

    let nombre = document.getElementById("Nombre").value
    let mail = document.getElementById("Mail").value
    let celular = document.getElementById("Celular").value

    //validacion de nombre

    function testnuminstr(str){
        return /\d/.test(str);
    };

    //validacion de celular

    let regExp = /[a-zA-Z]/g;

    //validar mail

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }

    //validacion de datos erroneos o vacios

    if (testnuminstr(nombre) == true || regExp.test(celular) == true || validateEmail(mail) == false){
        Swal.fire({
            title: 'Por favor ingrese los datos correctamente',
            icon: 'error'
        });
        return
    } else if(nombre == "" || celular == "" || mail == ""){
        Swal.fire({
            title: 'Por favor complete todos los datos',
            icon: 'error'
        });
        return
    }

    //guardar el json

    const input = localStorage.getItem('input');
    const newinput = JSON.parse(input);

    newinput.nombre = nombre;
    newinput.mail = mail;
    newinput.celular = celular;

    const newinputJSON = JSON.stringify(newinput);
    localStorage.setItem ('input', newinputJSON);

    Resultado()
}

function Resultado(){

    //esta funcion dispara un sweertalert para informarle al usuario que realizo su compra

    //busca el localstorage

    const input = localStorage.getItem('input');
    const newinput = JSON.parse(input);

    let cartelera = document.getElementById("cartelera");
    cartelera.innerHTML= "";

    //muestra los inputs que fue introduciendo el usuario.

    Swal.fire(
        'gracias por su compra',
        `${newinput.nombre}, usted a comprado ${newinput.entradas} entradas para la pelicula ${newinput.pelicula} ${newinput.subDob} al español, en la sucursal ${newinput.sucursal} a las ${newinput.horario}.
        Se ha enviado un mail con todos los detalles de la compra a la casilla de mail: ${newinput.mail}. Que disfrute de la funcion! `,
        'success'
      )

    //crea un boton para volver al inicio

    let boton = document.createElement("div");
    boton.innerHTML = `<button type="button" class="btn btn-primary">Volver a incio</button>`;
    boton.addEventListener("click", volverInicio);
    
    cartelera.appendChild(boton);
}

function volverInicio(){
    //Esta funcion  vuelve a completar el html con la cartelera del principio
    agregarPeliculas(peliculas);
};

agregarBuscadorPelicula();
}

App();
