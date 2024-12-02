const apiUrl = 'https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json';
let votos = JSON.parse(localStorage.getItem('votos')) || {};
function contadorvotos(ficha, nombre) {
    const confirmar = confirm(`¿desea votar por ${nombre}?`);
    if (confirmar) {
        if (!votos[ficha]) {
            votos[ficha] = { nombre: nombre, cantidad: 0 };
            // console.log(`Registrando voto para: ${nombre} (Ficha: ${ficha})`);
            // console.log(votos);
        }
        votos[ficha].cantidad += 1;
        localStorage.setItem('votos', JSON.stringify(votos));
        document.getElementById(`votos-${ficha}`).textContent = votos[ficha].cantidad;
        alert(`Su voto para ${nombre} registrado exitosamente .`);
    } else {
        alert(`No se ha registrado el voto para ${nombre}.`);
    }
}
async function ApiCandidatos() {
    try {
        const response = await fetch(apiUrl);
        const votantes = await response.json();
        const primeros4Votantes = votantes.slice(0, 4);
        const listavotantes = document.getElementById('listavotantes');
        listavotantes.innerHTML = '';
        primeros4Votantes.forEach(user => {
            const lista = document.createElement('div');
            lista.classList.add('usuario');
            lista.innerHTML = `
    <a href="javascript:void(0);" onclick="contadorvotos('${user.ficha}', '${user.nombre} ${user.apellido}')">
        <img src="${user.foto}" alt="${user.nombre}" class="foto">
        <div class="info">
            <h3>${user.nombre} ${user.apellido}</h3>
            <p><strong>Ficha:</strong> ${user.ficha}</p>
            <p><strong>Curso:</strong> ${user.curso}</p>
        </div>
    </a>`;

            listavotantes.appendChild(lista);
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}
window.onload = ApiCandidatos;


{/* <p><strong>Votos:</strong> <span class="voto" id="votos-${user.ficha}">${votos[user.ficha] || 0}</span></p> */}