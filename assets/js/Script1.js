function validarInput (input, arrayLenght){

    while (isNaN(input) || input > arrayLenght || input < 1){
        input = Number(prompt("Por Favor, Ingrese un numero valido"))
    }

    return input
}

const peliculas = ["Matrix", "El Origen", "Bastardos Sin Gloria", "Fightclub", "Troya"];
const sucursales = ["Norcenter", "Shopping Dot", "Cinemark Palermo"];
const dias = ["Martes", "Jueves", "Viernes", "Sabado"];
const horarios = ["12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

let nombreUsuario = prompt("Bienvenido a Cines JS, por favor introduzca su nombre");

    while (!isNaN(nombreUsuario) || nombreUsuario == ""){
        nombreUsuario = prompt("Por favor, introduzca su nombre correctamente")
    }

let pelicula = Number(prompt(`Introduzca el numero correspondiente a la pelicula que desee ver:
1) ${peliculas[0]}
2) ${peliculas[1]}
3) ${peliculas[2]}
4) ${peliculas[3]}
5) ${peliculas[4]}
`));

pelicula = validarInput(pelicula, peliculas.length);

peliculaElegida = peliculas[pelicula-1];

let sucursal = Number(prompt(`Introduzca el numero correspondiente al cine que desee asistir:
1) ${sucursales[0]}
2) ${sucursales[1]}
3) ${sucursales[2]}
`));

sucursal = validarInput(sucursal, sucursales.length);

sucursalElegida = sucursales[sucursal-1];

console.log(sucursalElegida);

let dia = Number(prompt(`Introduzca el numero correspondiente al dia que desee asistir:
1) ${dias[0]}
2) ${dias[1]}
3) ${dias[2]}
4) ${dias[3]}
`));

dia = validarInput(dia, dias.length);

diaElegido = dias[dia-1];

let horario = Number(prompt(`Introduzca el numero correspondiente al horario que desee asistir:
1) ${horarios[0]}
2) ${horarios[1]}
3) ${horarios[2]}
4) ${horarios[3]}
5) ${horarios[4]}
6) ${horarios[5]}
`));

horario = validarInput(horario, horarios.length);

horarioElegido = horarios[horario-1];

let entradas = Number(prompt("Cuantas entradas desea reservar (recuerde que el maximo por reserva son 8"));

entradas = validarInput(entradas,8)

alert(`${nombreUsuario}, usted a reservado ${entradas} entradas, para la pelicula ${peliculaElegida}, el dia ${diaElegido}, a las ${horarioElegido} hs, en los cines de ${sucursalElegida}.
Gracias por su reserva y que disfrute de la funcion.`);