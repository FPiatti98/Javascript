
function agregarPeliculas(){

//esta funcion contiene el array de objetos que se va a usar para mostrar la descripcion de la pelicula clickeada
//en este caso no pude usar el data,json porque para saber que peliucla clickea el usaurio tuevq ue trabajar con un evento y al ser una funcion sincronica no encontre la manera de incorporar el fetch correctamente

  let peliculas =[
    {
        "id": 1,
        "nombre": "Matrix",
        "imagen": "./img/matrix 1.png",
        "descripcion": "La película plantea que en el futuro, tras una dura guerra, casi todos los seres humanos han sido esclavizados por las máquinas y las inteligencias artificiales creadas. Estas los tienen en suspensión y con sus mentes conectadas a una realidad virtual llamada Matrix que representa el final del siglo XX. Los seres humanos son usados por las máquinas para obtener energía y las pocas personas que no están suspendidas, o que han sido liberados, viven en la ciudad Zion y tienen naves que se mueven por el subsuelo, entrando de forma clandestina a la Matrix para liberar otras personas conectadas."
    },
    {
        "id": 2,
        "nombre": "El Origen",
        "imagen": "./img/elOrigen 1.png",
        "descripcion": "Dom Cobb (Leonardo DiCaprio) es un ladrón, prófugo de la justicia estadounidense por el supuesto asesinato de su esposa, especializado en infiltrarse en los sueños para robar ideas, claves de bancos, etc. mientras sus víctimas duermen. Esto lo logra a través de un sueño inducido por un dispositivo de tecnología militar experimental, que administra un potente sedante a las víctimas y a los atacantes, creando un sueño compartido, ubicado en un escenario construido por la subconciencia de uno de los atacantes, y ocupado por proyecciones mentales (subconsciencia) del sujeto al que se le extrae la información, quien por lo mismo no sospecha estar soñando."
    },
    {
        "id": 3,
        "nombre": "Bastardos Sin Gloria",
        "imagen": "./img/bastardos sin gloria 1.png",
        "descripcion": "Segunda Guerra Mundial, durante la ocupación alemana de Francia. Shosanna Dreyfuss presencia la ejecución de su familia en manos del Coronel alemán Hans Landa. Shosanna se escapa milagrosamente y huye a París, donde asume una nueva identidad como dueña de una sala de cine."
    },
    {
        "id": 4,
        "nombre": "El Club De La Pelea",
        "imagen": "./img/fightclub 1.png",
        "descripcion": "El narrador (Edward Norton), que sufre de insomnio y cuyo nombre nunca se menciona, es un empleado de una empresa automovilística. Su médico se niega a recetarle medicación y, al quejarse de que está sufriendo, le replica que vaya a un grupo de apoyo para ver lo que es el sufrimiento de verdad. El narrador asiste a un grupo de apoyo de víctimas de cáncer testicular y, después de convencerlos de que él también está aquejado de la enfermedad, encuentra una liberación emocional que le cura el insomnio. Se convierte en un adicto a los grupos de terapia y a la farsa de hacerse pasar por víctima. Sin embargo, la presencia de Marla Singer (Helena Bonham Carter) le molesta, ya que se da cuenta de que ella busca el mismo paliativo para los problemas en su vida y teme que lo delate ante todos, por lo que negocia con ella para evitar encontrarse en las mismas reuniones."
    },
    {
        "id": 5,
        "nombre": "Troya",
        "imagen": "./img/troya 1.png",
        "descripcion": "La historia es narrada por Odiseo, rey de Ítaca, una de las tierras leales a la jerarquía que se forma en toda Grecia. Agamenón, el rey absoluto de esta jerarquía de Grecia, intenta conquistar todas las tierras para poder dominar, y en muchas ocasiones quiere contar con la ayuda de Aquiles, el mejor guerrero de Grecia. Sin embargo, siempre se surgen contratiempos de parte de Aquiles, tal como en una ocasión en que es llamado a pelear contra el mejor guerrero del último reino en el que Agamenón intenta conquistar. A pesar de todo, Aquiles acude al combate y logra ganar, pero no ha de pelear jurando ninguna lealtad a Agamenón, a quien odia por ser un arrogante, un megalómano y un tirano hambriento de territorio y sediento de poder, sino simplemente para poder salvar a miles de personas inocentes."
    }
    ];

//busca el div con el id "cartelera" y lo vacia

let container = document.getElementById("cartelera");
container.innerHTML="";

//muestra las peliculas y en el caso de que el usuario clickee en una de ellas usa eventr listener para disopara una funcion que muestre datos de la pelicula elegida

peliculas.forEach((pelicula)=>{
    let div = document.createElement("div");
    div.className= "card movies";
    div.innerHTML= `<img id="${pelicula.nombre}" class="card-img-top" src="${pelicula.imagen}" alt="Card image cap">
                <div class="card-body" id="${pelicula.nombre}"> ${pelicula.nombre} </div>`;
    //el siguiente evento es el que identifica que pelicula fue clickeada
    div.addEventListener("click", e => {
        //el for cilca entre los nombres de el array de objetos peliculas
        for(let i = 0; i < peliculas.length; i++){
            //el if verifica si el elemento clickeado corresponde a un objeto.nombre del array
            if(e.target.id == peliculas[i].nombre){
                let contenedor = document.getElementById("cartelera");
                contenedor.innerHTML="";
                //descPelicula es el contenedor que va a tener la descripcion y demas de la pelicula
                let descPelicula = document.createElement('div');
                descPelicula.className = 'Descripcion';
                descPelicula.innerHTML =`
                <div class= "titulo-img">
                <h1>${peliculas[i].nombre}</h1>
                <img id="${peliculas[i].nombre}" src="${peliculas[i].imagen}">
                </div>
                <div class= "desc-PG">
                <h4>PG-18</h4>
                <p>${peliculas[i].descripcion}</p>
                </div>
                `
                //crea un borton para mostrar las peliculas nuevamente

                let boton = document.createElement("div");
                boton.innerHTML = `<button type="button" class="btn btn-primary">Atras</button>`;
                boton.addEventListener("click", agregarPeliculas);
                contenedor.appendChild(descPelicula);
                contenedor.appendChild(boton);
            }
        }
    });
    container.appendChild(div);
});

};

agregarPeliculas();