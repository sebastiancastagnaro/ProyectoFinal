
// Endpoint de la API para obtener información de los álbumes de los Beatles
const apiUrl = 'https://the-beatles-api.herokuapp.com/api/v1/albums';

// Función para obtener los datos de la API utilizando fetch
async function getDataFromApi() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }
}

// Función para crear una card de álbum en el DOM
function createAlbumCard(album) {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');
    card.innerHTML = `
        <div class="card">
            <img src="${album.cover_url}" class="card-img-top" alt="${album.title}">
            <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">Año: ${album.year}</p>
                <p class="card-text">Género: ${album.genere}</p>
            </div>
        </div>
    `;
    return card;
}

// Función para mostrar los álbumes en el DOM
function renderAlbums(albums) {
    const container = document.getElementById('albums-container');
    container.innerHTML = ''; // Limpiamos el contenedor antes de mostrar los álbumes
    albums.forEach((album) => {
        const card = createAlbumCard(album);
        container.appendChild(card);
    });
}

// Función principal para inicializar la aplicación
async function init() {
    try {
        const albumsData = await getDataFromApi();
        renderAlbums(albumsData);
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
}

// Llamamos a la función principal para iniciar la aplicación
init();
