// -------------- VARIABLES ----------------

// Menú de hamburguesa
const mobileMenu = document.querySelector('.mobile-menu');

// Navegación sticky
const navbar = document.querySelector('.header__barra');
const sticky = navbar.offsetTop;

// Galería modal
const imgs = [...document.querySelectorAll(".galeria__img")];
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const span = document.getElementsByClassName("close")[0];


// Formulario
const datosForm = {
    nombre: '',
    apellido: '',
    email: '',
    numero: '',
    mensaje: ''
}

const formulario = document.querySelector('#formulario')
const inputNombre = document.querySelector('#nombre');
const inputApellido = document.querySelector('#apellido');
const inputEmail = document.querySelector('#email');
const inputNumero = document.querySelector('#numero');
const inputMensaje = document.querySelector('#mensaje');
const btnSubmit = document.querySelector('#formulario button[type="submit"]');
const spinner = document.querySelector('#spinner');


// ---------------- Event Listener --------------
document.addEventListener('DOMContentLoaded', function() {

    eventListeners();
});


// Swiper de index.html galería
window.swiper = new Swiper({
    el: '.slider__cont',
    slideClass: 'slider__slide',
    createElements: true,
    autoplay: {
        delay: 5000
    },
    loop: true,
    spaceBetween: 20,
    pagination: true,
});


// ---------------- FUNCIONES -----------------

function eventListeners() {

    //Menú de hamburguesa
    mobileMenu.addEventListener('click', navegacionResponsive);

    // Navegacion sticky
    window.addEventListener('scroll', navSticky);

    // Galería modal
    imgs.forEach(img => {
        img.addEventListener('click', modalFunction)
    })

    // Validación del formulario
    inputNombre.addEventListener('blur', validarInput)
    inputApellido.addEventListener('blur', validarInput)
    inputEmail.addEventListener('blur', validarInput)
    inputNumero.addEventListener('blur', validarInput)
    inputMensaje.addEventListener('input', validarInput)
    
    formulario.addEventListener('submit', enviarForm)
}


// Menú de hamburguesa, se activa al dar click a la hamburguesa
function navegacionResponsive() {
    const navegacion = document.querySelector('.navegacion');

    if(navegacion.classList.contains('mostrar')) {
        navegacion.classList.remove('mostrar');
    } else {
        navegacion.classList.add('mostrar');
    }
}


// navSticky se activa onscroll en la window y añade o quita la clase sticky a la navbar
function navSticky() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}


// Galería Modal, se activa al dar click en una imagen
function modalFunction() {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt; 

    span.onclick = function() {
        modal.style.display = "none";
    }
}


// Validar formulario
function validarInput(e) { // validarInput se ejecuta en el evento blur en los input
    if(e.target.value.trim() === '') { // Trim elimina los espacios, validamos que haya contenido en el input sin contar los espacios vacíos
        mostrarAlerta(`El campo \'${e.target.id}\' es obligatorio`, e.target.parentElement);
        datosForm[e.target.id] = ''; // Borramos el valor del formulario solamente si el input está vacío también
        comprobarForm(); // Se ejecuta para validar el resto del form a pesar de que el cambio solo ocurrió en uno de los inputs
        return;
    }

    if(e.target.id === 'email' && !validarEmail(e.target.value)) { // Validamos el email, si es false mostramos alerta
        mostrarAlerta('El email no es válido', e.target.parentElement);
        datosForm[e.target.id] = '';
        comprobarForm();
        return;
    }   

    // Se ejecuta la limpieza de la alerta (si es que hay una) en el caso de que se pase la validación (es decir, en caso de que no entremos en el if)
    limpiarAlerta(e.target.parentElement); 

    // Asignamos los datos del formulario al objeto de datosForm, usando el e.target.id como el nombre de la llave y el value.trim() como el valor ya sin los espacios en blanco y en minúsculas
    datosForm[e.target.id] = e.target.value.trim().toLowerCase();

    // Comprobar que el objeto datosForm esté lleno
    comprobarForm();
}


// Mostrar alerta en el formulario
function mostrarAlerta(mensaje, input) {
    // Primero comprobamos si ya hay una alerta, y si es así la limpiamos
    limpiarAlerta(input);

    // Generar alerta en HTML
    const error = document.createElement('p');
    error.textContent = mensaje
    error.classList.add('error')

    // Inyectar el error al formulario
    input.appendChild(error);
}

function limpiarAlerta(input) {
    // Comprueba si ya existe una alerta en ese input, y si ya existe la elimina antes de insertar la nueva
    const alerta = input.querySelector('.error');
    if(alerta) {
        alerta.remove();
    }
}

// Validamos que sea un email valido usando la expresión regular y el método test y retornamos true or false
function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const resultado = regex.test(email);
    return resultado;
}

function comprobarForm() {
    // Si uno de los valores del objeto datosForm incluye un espacio vacío, añadimos la clase de opacity y el disabled true
    if( Object.values(datosForm).includes('') ) {
        btnSubmit.classList.add("agendar__btn--opacity");
        btnSubmit.disabled = true;
        return;
    } 

        btnSubmit.classList.remove("agendar__btn--opacity");
        btnSubmit.disabled = false;
}

function enviarForm(e) {
    e.preventDefault();

    spinner.classList.add('spinner__contenedor');
    spinner.classList.remove('hidden');

    // Quitamos el spinner 3.5s después y reiniciamos el formulario
    setTimeout(() => {
        spinner.classList.remove('spinner__contenedor');
        spinner.classList.add('hidden');

        datosForm.nombre = '';
        datosForm.apellido = '';
        datosForm.email = '';
        datosForm.numero = '';
        datosForm.mensaje = '';

        formulario.reset();

        const alertaExito = document.createElement('p');
        alertaExito.classList.add('exito');
        alertaExito.textContent = 'Tu mensaje se ha enviado correctamente';

        formulario.appendChild(alertaExito);

        setTimeout(() => {
            alertaExito.remove();
        }, 3500);
    }, 3500);
}

