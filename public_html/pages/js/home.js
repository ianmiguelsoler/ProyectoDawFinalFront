// Mostrar / Ocultar el formulario de nueva película
function showHideAddForm() {
    var tag = document.getElementById("new-form");
    if (tag.style.display === "none") 
        tag.style.display = "block";
    else 
        tag.style.display = "none";
}

// Verificar que apiUrl está definido
if (typeof apiUrl === "undefined") {
    console.error("⚠️ ERROR: apiUrl no está definido en urls.js");
}

//------- Gestión de la tabla de películas -------
function loadRow(film, tableBody) {
    let row = '<tr>';
    row += '<th scope="row">' + film.id + '</th>';
    row += '<td>' + film.name + '</td>';
    row += '<td>' + film.director + '</td>';
    row += '<td>' + film.classification + '</td>';

    let detailBtn = '<td>';
    detailBtn += '<a href="/pages/detail.html?id=' + film.id + '" role="button" class="btn btn-primary btn-sm">Ver detalle</a>';
    detailBtn += '</td>';

    row += detailBtn;
    row += '</tr>';

    tableBody.innerHTML += row;
}

function loadDataInTable(filmsJSON, tableBody) {
    if (filmsJSON.length <= 0) {
        document.getElementById("no-films-message").style.display = "block";
    } else {
        for (let film of filmsJSON) {
            loadRow(film, tableBody);
        }
    }
}

function loadFilms() {
    let tableBody = document.getElementById("tbody-container");
    tableBody.innerHTML = "";

    fetch(apiUrl + "/films/get_films.php", { method: 'GET' })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("📡 Respuesta de la API:", data);
        if (data.status === "OK") {
            loadDataInTable(data.data, tableBody);
        } else {
            alert("⚠️ Error en la respuesta de la API: " + data.message);
        }
    })
    .catch(error => console.error("❌ Error al cargar las películas:", error));
}

//-------------------------------------

function addNewFilm() {
    let jsonData = {
        name: document.getElementById("name").value,
        director: document.getElementById("director").value,
        classification: document.getElementById("classification").value,
        img: document.getElementById("img").value,
        plot: document.getElementById("plot").value
    };

    fetch(apiUrl + "/films/add_film.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("📡 Respuesta de la API al añadir película:", data);
        if (data.status === "OK") {
            loadFilms();
            showHideAddForm();
            document.getElementById("form-new-tag").reset();
            alert("✅ Película añadida correctamente");
        } else {
            alert("⚠️ Error al añadir película: " + data.message);
        }
    })
    .catch(error => console.error("❌ Error al añadir película:", error));

    return false;
}

document.addEventListener("DOMContentLoaded", function() { 
    console.log("📌 Página cargada. Cargando películas...");
    loadFilms();
});
