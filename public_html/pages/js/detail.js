function loadFilm() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    if (!id) {
        console.error("⚠️ ERROR: No se encontró un ID en la URL.");
        alert("Error: No se ha encontrado un ID de película.");
        return;
    }

    fetch(apiUrl + "/api/films/get_film.php?id=" + id, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("📡 Respuesta de la API:", data);
        if (data.status === "OK") {
            let film = data.data;
            document.getElementById("name").innerText = film.name;
            document.getElementById("director").innerText = film.director;
            document.getElementById("classification").innerText = film.classification;
            document.getElementById("img").src = film.img;
            document.getElementById("plot").innerText = film.plot;
        } else {
            alert("⚠️ Error en la respuesta de la API: " + data.message);
        }
    })
    .catch(error => console.error("❌ Error al cargar el detalle de la película:", error));
}

//-------------------------------------

document.addEventListener("DOMContentLoaded", function() { 
    console.log("📌 Página de detalles cargada. Cargando película...");
    loadFilm();
});
