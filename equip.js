// ===== Gestión del equipo - JavaScript =====

// Referencias a elementos del DOM
const teamList = document.getElementById('team-list');
const addMemberForm = document.getElementById('add-member-form');
const toggleFormBtn = document.getElementById('toggle-form-btn');
const clearFormBtn = document.getElementById('clear-form-btn');
const addMemberSection = document.querySelector('.add-member-section');
const memberRoleSelect = document.getElementById('member-role');
const customRoleGroup = document.getElementById('custom-role-group');

// Estado del formulario (visible/oculto)
let isFormVisible = false;

// Array para almacenar los miembros del equipo
let teamMembers = [
    { name: 'Javier', role: 'Piloto', experience: 10, description: 'certificado con más de 10 años de experiencia' },
    { name: 'Jesús', role: 'Atención al cliente', experience: 5, description: 'Experto en atención al cliente y logística' },
    { name: 'Pepi', role: 'Técnico', experience: 8, description: 'Técnica en mantenimiento de globos aerostáticos' },
    { name: 'Ana', role: 'Seguridad', experience: 6, description: 'Coordinadora de seguridad y emergencias' }
];

// ===== Funciones principales =====

// Función para mostrar/ocultar el formulario
function toggleForm() {
    isFormVisible = !isFormVisible;
    
    if (isFormVisible) {
        addMemberSection.style.display = 'block';
        toggleFormBtn.textContent = '➖ Ocultar formulario';
        toggleFormBtn.classList.add('active');
        // Smooth scroll al formulario
        addMemberSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        addMemberSection.style.display = 'none';
        toggleFormBtn.textContent = '➕ Postularme al equipo';
        toggleFormBtn.classList.remove('active');
    }
}

// Función para mostrar/ocultar campo de rol personalizado
function toggleCustomRole() {
    if (memberRoleSelect.value === 'Otro') {
        customRoleGroup.style.display = 'block';
    } else {
        customRoleGroup.style.display = 'none';
        document.getElementById('custom-role').value = '';
    }
}

// Función para crear elemento de lista de miembro
function createMemberElement(member) {
    const li = document.createElement('li');
    li.className = 'team-member-item';
    
    const experienceText = member.experience === 1 ? '1 año' : `${member.experience} años`;
    
    li.innerHTML = `
        <strong>${member.name}</strong> - ${member.role} con ${experienceText} de experiencia.
        ${member.description ? ` ${member.description}` : ''}
        <button class="remove-member-btn" onclick="removeMember('${member.name}')">🗑️ Eliminar</button>
    `;
    
    return li;
}

// Función para añadir un miembro al equipo
function addMember(memberData) {
    // Verificar si el miembro ya existe
    if (teamMembers.some(member => member.name.toLowerCase() === memberData.name.toLowerCase())) {
        alert('Ya existe un miembro con ese nombre en el equipo.');
        return false;
    }
    
    // Añadir al array
    teamMembers.push(memberData);
    
    // Crear y añadir elemento al DOM
    const memberElement = createMemberElement(memberData);
    teamList.appendChild(memberElement);
    
    // Animación de entrada
    memberElement.style.opacity = '0';
    memberElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
        memberElement.style.transition = 'all 0.3s ease';
        memberElement.style.opacity = '1';
        memberElement.style.transform = 'translateY(0)';
    }, 10);
    
    return true;
}

// Función para eliminar un miembro del equipo
function removeMember(memberName) {
    if (confirm(`¿Estás seguro de que quieres eliminar a ${memberName} del equipo?`)) {
        // Eliminar del array
        teamMembers = teamMembers.filter(member => member.name !== memberName);
        
        // Eliminar del DOM
        const memberElements = teamList.querySelectorAll('li');
        memberElements.forEach(element => {
            if (element.textContent.includes(memberName)) {
                element.style.transition = 'all 0.3s ease';
                element.style.opacity = '0';
                element.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    element.remove();
                }, 300);
            }
        });
        
        console.log(`${memberName} ha sido eliminado del equipo.`);
    }
}

// Función para limpiar el formulario
function clearForm() {
    addMemberForm.reset();
    customRoleGroup.style.display = 'none';
}

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(addMemberForm);
    const name = formData.get('name').trim();
    const role = formData.get('role') === 'Otro' ? formData.get('customRole').trim() : formData.get('role');
    const experience = parseInt(formData.get('experience'));
    const description = formData.get('description').trim();
    
    // Validaciones
    if (!name) {
        alert('Por favor, introduce un nombre.');
        return;
    }
    
    if (!role) {
        alert('Por favor, selecciona o especifica un rol.');
        return;
    }
    
    if (isNaN(experience) || experience < 0) {
        alert('Por favor, introduce un número válido de años de experiencia.');
        return;
    }
    
    // Crear objeto del miembro
    const newMember = {
        name: name,
        role: role,
        experience: experience,
        description: description
    };
    
    // Intentar añadir el miembro
    if (addMember(newMember)) {
        alert(`¡${name} ha sido añadido al equipo exitosamente!`);
        clearForm();
        
        // Opcional: ocultar el formulario después de añadir
        // toggleForm();
    }
}

// ===== Event Listeners =====

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar formulario inicialmente
    addMemberSection.style.display = 'none';
    
    // Event listeners
    toggleFormBtn.addEventListener('click', toggleForm);
    clearFormBtn.addEventListener('click', clearForm);
    addMemberForm.addEventListener('submit', handleFormSubmit);
    memberRoleSelect.addEventListener('change', toggleCustomRole);
    
    console.log('Sistema de gestión de equipo inicializado correctamente.');
});

// ===== Funciones auxiliares =====

// Función para obtener estadísticas del equipo
function getTeamStats() {
    const totalMembers = teamMembers.length;
    const totalExperience = teamMembers.reduce((sum, member) => sum + member.experience, 0);
    const averageExperience = totalMembers > 0 ? (totalExperience / totalMembers).toFixed(1) : 0;
    
    return {
        total: totalMembers,
        totalExperience: totalExperience,
        averageExperience: averageExperience
    };
}

// Función para exportar la lista de miembros (opcional)
function exportTeamList() {
    const teamData = teamMembers.map(member => 
        `${member.name} - ${member.role} (${member.experience} años)${member.description ? ': ' + member.description : ''}`
    ).join('\n');
    
    console.log('Lista del equipo:\n' + teamData);
    return teamData;
}

// Hacer funciones disponibles globalmente para onclick
window.removeMember = removeMember;
window.getTeamStats = getTeamStats;
window.exportTeamList = exportTeamList;