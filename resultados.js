window.onload = function() {
    const administradorr = localStorage.getItem('administrdor');
    if (administradorr !== 'true') {
        alert('No se puede acceder ha esta pagina');
        window.location.href = 'login.html';
    } else {
        mostrarResultados();
    }
};
function mostrarResultados() {
    const votos = JSON.parse(localStorage.getItem('votos')) || {};
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
    if (Object.keys(votos).length === 0) {
        resultadosDiv.innerHTML = '<p>No hay votos</p>';
    } else {
        for (const ficha in votos) {
            const { nombre, cantidad } = votos[ficha];
            if (nombre && cantidad !== undefined) {
                const resultItem = document.createElement('p');
                resultItem.textContent = `Nombre: ${nombre} - Ficha: ${ficha} - Votos: ${cantidad}`;
                resultadosDiv.appendChild(resultItem);
            }
        }
    }
    console.log('Votos almacenados:', votos);

}
function cerrarSesion() {
    localStorage.removeItem('administrdor');
    window.location.href = 'login.html';
}
function reiniciarConteo() {
    localStorage.removeItem('votos');
    mostrarResultados();
}
