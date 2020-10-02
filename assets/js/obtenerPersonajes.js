// Obtenemos la API por medio de promesas

/** 
 * fecth() a 2015 es una funcionalidad nueva de JS
 * permite controlar errores mas facilmente
 * trabaja por medio de http o https y se basa en "promesas"
 * se basa en un sistema de peticiones y respuestas (cliente-servidor)
*/

// URL de la API
const API= 'https://rickandmortyapi.com/api/character';

// Obtener el retorno de la API
const obtenerData = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json); 
            paginacion(json.info);
        })
        .catch((error) => {
            console.log('Error: ', error)
        });
}

// llenar datos en nuestra página
const llenarDatos = (data)=> {
    let html= '';
    data.results.forEach((item) => {
        html += '<div class="col-sm-12 col-md-6 col-lg-3">';
        html += '<div class="card" style="width: 15rem">';
        html += `<img src="${item.image}" class="card-img-top" alt="">`;
        html += '<div class="card-body">';
        html += `<h5 class="card-title">${item.name}</h5>`;
        html += `<p class="card-text">Estado: ${item.status}</p>`;
        html += `<p class="card-text">Especie: ${item.species}</p>`;
        html += `<p class="card-text">Genero: ${item.gender}</p>`;
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });
    // Imprimer datos en html
    document.getElementById('datosPersonajes').innerHTML= html;
}

const paginacion = (data) => {
    let html= '';
    html += `<li class="page-item ${data.prev==null?'disabled':''}"><a class="page-link" onclick="obtenerData('${data.prev}')">Previo</a></li>`;
    html += `<li class="page-item ${data.next==null?'disabled':''}"><a class="page-link" onclick="obtenerData('${data.next}')">Siguiente</a></li>`;
    document.getElementById('paginacion').innerHTML = html;
}

// Activo o invoco la función
obtenerData(API);



