// Script para manejar el envío de formularios usando FormSubmit.co

document.addEventListener('DOMContentLoaded', function() {
    // Configuración de FormSubmit.co
    const FORMSUBMIT_EMAIL = 'Multiserviciosxpress911@gmail.com'; // Email donde se recibirán los formularios
    
    // Manejar el formulario de presupuesto
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        // Configurar el formulario para FormSubmit.co
        quoteForm.setAttribute('action', `https://formsubmit.co/${FORMSUBMIT_EMAIL}`);
        quoteForm.setAttribute('method', 'POST');
        
        // Agregar campos ocultos necesarios para FormSubmit.co
        addHiddenFields(quoteForm, 'Nuevo Presupuesto de Reforma');
        
        // Agregar validación y manejo de envío
        quoteForm.addEventListener('submit', function(e) {
            // Validación básica
            const service = document.getElementById('service');
            if (service.value === '') {
                e.preventDefault();
                alert('Por favor, selecciona un tipo de servicio.');
                return;
            }
            
            // Mostrar indicador de carga
            const submitButton = quoteForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
        });
    }
    
    // Manejar el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Configurar el formulario para FormSubmit.co
        contactForm.setAttribute('action', `https://formsubmit.co/${FORMSUBMIT_EMAIL}`);
        contactForm.setAttribute('method', 'POST');
        
        // Agregar campos ocultos necesarios para FormSubmit.co
        addHiddenFields(contactForm, 'Nuevo Mensaje de Contacto');
        
        // Agregar validación y manejo de envío
        contactForm.addEventListener('submit', function(e) {
            // Validación básica
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            if (name && name.value === '' || email.value === '' || phone.value === '' || (message && message.value === '')) {
                e.preventDefault();
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }
            
            // Mostrar indicador de carga
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
        });
    }
    
    // Función para agregar campos ocultos necesarios para FormSubmit.co
    function addHiddenFields(form, subject) {
        // Campo para el asunto
        let subjectField = document.createElement('input');
        subjectField.type = 'hidden';
        subjectField.name = '_subject';
        subjectField.value = subject;
        form.appendChild(subjectField);
        
        // Campo para redirección después del envío
        let redirectField = document.createElement('input');
        redirectField.type = 'hidden';
        redirectField.name = '_next';
        redirectField.value = window.location.origin + '/gracias.html';
        form.appendChild(redirectField);
        
        // Campo para evitar captcha
        let captchaField = document.createElement('input');
        captchaField.type = 'hidden';
        captchaField.name = '_captcha';
        captchaField.value = 'false';
        form.appendChild(captchaField);
        
        // Campo para formato de respuesta
        let formatField = document.createElement('input');
        formatField.type = 'hidden';
        formatField.name = '_format';
        formatField.value = 'plain';
        form.appendChild(formatField);
        
        // Campo para evitar spam
        let honeypotField = document.createElement('input');
        honeypotField.type = 'text';
        honeypotField.name = '_honey';
        honeypotField.style.display = 'none';
        form.appendChild(honeypotField);
    }
});