const apilogin = 'https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/administrador.json';
async function apiloginusuario() {
    try {
        const respuesta = await fetch(apilogin);
        const usuario = await respuesta.json();

        const usernameusuario = document.querySelector('input[placeholder="usuario"]');
        const contraseñausuario = document.querySelector('input[placeholder="contraseña"]');
        const mensajerespuesta = document.getElementById('mensajerespuesta');

        document.querySelector('button#iniciarsession').addEventListener('click', () => {
            const username = usernameusuario.value;
            const password = contraseñausuario.value;

            if (usuario.username === username && usuario.password === password) {
                localStorage.setItem('administrdor', 'true'); 
                mensajerespuesta.textContent = `Bienvenido, ${usuario.username}!`;
                mensajerespuesta.style.color = 'green';
                window.location.href = 'resultados.html';
            } else {
                mensajerespuesta.textContent = 'usuario o contraseña incorrectos';
                mensajerespuesta.style.color = 'red';
            }
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}
window.onload = apiloginusuario;
