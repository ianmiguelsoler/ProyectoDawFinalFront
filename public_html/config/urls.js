const apiUrl = window.location.hostname.includes("localhost")
    ? "http://localhost:8080"  // Desarrollo
    : "http://peliculasian.chickenkiller.com";  // Producción

console.log(`🔹 API URL: ${apiUrl}`);
