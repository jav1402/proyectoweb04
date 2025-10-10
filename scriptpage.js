function enviarFormulario() {
const submitBtn = document.getElementById('submitBtn');
submitBtn?.addEventListener('click', () => {
  alert('¡Has enviado el formulario!');
})
};

function enviarReserva() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const fecha = document.getElementById('fecha-preferida').value;
    const personas = document.getElementById('num-personas').value;
    const tipoVuelo = document.getElementById('tipo-vuelo').value;
    const telefono = document.getElementById('telefono').value;

    if (!fecha || !personas || !tipoVuelo || !nombre || !email || !mensaje || !telefono) {
        alert('Por favor, completa todos los campos obligatorios');
        return false;
    }
    
    alert(`¡Solicitud enviada! 
    
Fecha: ${fecha}
Personas: ${personas}
Tipo: ${tipoVuelo}
${telefono ? 'Teléfono: ' + telefono : ''}

Te contactaremos pronto para confirmar la disponibilidad.`);
    
    return false; 
}