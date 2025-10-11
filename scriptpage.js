function enviarFormulario() {
const submitBtn = document.getElementById('submitBtn');
submitBtn?.addEventListener('click', () => {
  alert('¡Has enviado el formulario!');
})
};

// Función para validar email
function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar teléfono (opcional pero si se proporciona debe ser válido)
function validarTelefono(telefono) {
    if (!telefono) return true; // Es opcional
    const telefonoRegex = /^[+]?[0-9\s\-\(\)]{9,}$/;
    return telefonoRegex.test(telefono);
}

function enviarReserva(event) {
    // Prevenir el envío del formulario
    if (event) {
        event.preventDefault();
    }
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const fecha = document.getElementById('fecha-preferida').value;
    const personas = document.getElementById('num-personas').value;
    const tipoVuelo = document.getElementById('tipo-vuelo').value;
    const telefono = document.getElementById('telefono').value;

    // Validación de campos obligatorios
    if (!nombre.trim()) {
        alert('Por favor, introduce tu nombre');
        document.getElementById('nombre').focus();
        return false;
    }

    if (!email.trim()) {
        alert('Por favor, introduce tu email');
        document.getElementById('email').focus();
        return false;
    }

    if (!validarEmail(email)) {
        alert('Por favor, introduce un email válido (ejemplo: nombre@dominio.com)');
        document.getElementById('email').focus();
        return false;
    }

    if (!fecha) {
        alert('Por favor, selecciona una fecha para el vuelo');
        document.getElementById('fecha-preferida').focus();
        return false;
    }

    if (!personas) {
        alert('Por favor, selecciona el número de personas');
        document.getElementById('num-personas').focus();
        return false;
    }

    if (!tipoVuelo) {
        alert('Por favor, selecciona el tipo de experiencia');
        document.getElementById('tipo-vuelo').focus();
        return false;
    }

    if (telefono && !validarTelefono(telefono)) {
        alert('Por favor, introduce un teléfono válido o déjalo vacío');
        document.getElementById('telefono').focus();
        return false;
    }
    
    // Mostrar mensaje de confirmación
    alert(`¡Solicitud enviada exitosamente! 
    
📧 Datos de contacto:
Nombre: ${nombre}
Email: ${email}
${telefono ? 'Teléfono: ' + telefono : ''}

🎈 Detalles del vuelo:
Fecha: ${fecha}
Personas: ${personas}
Tipo: ${tipoVuelo}
${mensaje ? 'Mensaje: ' + mensaje : ''}

Te contactaremos pronto para confirmar la disponibilidad.`);
    
    // Limpiar el formulario después del envío exitoso
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mensaje').value = '';
    document.getElementById('fecha-preferida').value = '';
    document.getElementById('num-personas').value = '';
    document.getElementById('tipo-vuelo').value = '';
    document.getElementById('telefono').value = '';
    
    return false; 
}

// ===== Modo oscuro para página de contacto =====

// Variables para el modo oscuro
let isDarkMode = false;
let darkModeBtn;

// Función para alternar modo oscuro
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '☀️ Modo claro';
        darkModeBtn.classList.add('active');
        // Guardar preferencia en localStorage
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        darkModeBtn.innerHTML = '🌙 Modo oscuro';
        darkModeBtn.classList.remove('active');
        // Guardar preferencia en localStorage
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Función para cargar preferencia guardada
function loadDarkModePreference() {
    const darkModePref = localStorage.getItem('darkMode');
    
    if (darkModePref === 'enabled') {
        toggleDarkMode();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar referencias a elementos del DOM
    darkModeBtn = document.getElementById('darkModeBtn');
    
    // Cargar preferencia guardada del modo oscuro
    loadDarkModePreference();
    
    // Event listener para el botón de modo oscuro
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }
    
    // Configurar el formulario de reserva
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            enviarReserva(event);
        });
    }
    
    // Event listener alternativo para el botón de reserva por si acaso
    const reservationBtn = document.getElementById('reservationBtn');
    if (reservationBtn) {
        reservationBtn.addEventListener('click', function(event) {
            event.preventDefault();
            enviarReserva(event);
        });
    }
    
    console.log('Sistema de contacto inicializado correctamente.');
});