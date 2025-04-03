document.addEventListener('DOMContentLoaded', function() {
    // Tracking de carga de página
    if (typeof trackSectionView === 'function') {
        trackSectionView('home_page');
    }
    
    // Configurar observador de intersección para rastrear secciones visibles
    setupSectionObserver();
    
    // Configurar rastreo de navegación
    setupNavigationTracking();
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('hidden');
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuButton.setAttribute('aria-expanded', isExpanded);
            // Add overflow hidden to body when menu is open to prevent scrolling
            document.body.style.overflow = isExpanded ? 'hidden' : '';
            // Update icon to indicate menu state
            const menuIcon = mobileMenuButton.querySelector('i');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
            
            // Tracking de apertura/cierre del menú móvil
            if (typeof gtag === 'function') {
                gtag('event', mobileMenu.classList.contains('hidden') ? 'close_mobile_menu' : 'open_mobile_menu', {
                    'event_category': 'ui_interaction',
                    'event_label': 'mobile_menu'
                });
            }
        });
    }

    // Before/After slider functionality
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        const beforeImage = slider.querySelector('.before-image');
        const sliderHandle = slider.querySelector('.slider-handle');
        let isResizing = false;

        // Mouse events
        sliderHandle.addEventListener('mousedown', startResize);
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);

        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', startResize);
        window.addEventListener('touchmove', resize);
        window.addEventListener('touchend', stopResize);

        function startResize(e) {
            e.preventDefault();
            isResizing = true;
        }

        function resize(e) {
            if (!isResizing) return;
            
            let clientX;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }

            const sliderRect = slider.getBoundingClientRect();
            const position = (clientX - sliderRect.left) / sliderRect.width;
            
            // Limit position between 0 and 1
            const limitedPosition = Math.max(0, Math.min(1, position));
            
            // Update position
            beforeImage.style.width = `${limitedPosition * 100}%`;
            sliderHandle.style.left = `${limitedPosition * 100}%`;
        }

        function stopResize() {
            isResizing = false;
        }
    });

    // Form validation
    const quoteForm = document.getElementById('quote-form');
    const contactForm = document.getElementById('contact-form');

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic validation
            const service = document.getElementById('service');
            const area = document.getElementById('area');
            
            if (service.value === '' || area.value === '') {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }
            
            // Here you would normally send the data to a server
            // For demo purposes, we'll just show a success message
            const formContainer = quoteForm.parentElement;
            formContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-green-500 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-primary mb-2">¡Presupuesto Enviado!</h3>
                    <p class="text-dark/70 mb-4">Te hemos enviado el presupuesto aproximado a tu email. Un asesor se pondrá en contacto contigo en menos de 2 horas.</p>
                    <a href="#" class="text-primary hover:text-accent transition-colors font-medium">Volver al inicio</a>
                </div>
            `;
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            if (name.value === '' || email.value === '' || phone.value === '' || message.value === '') {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }
            
            // Here you would normally send the data to a server
            // For demo purposes, we'll just show a success message
            const formContainer = contactForm.parentElement;
            formContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-green-500 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-primary mb-2">¡Mensaje Enviado!</h3>
                    <p class="text-dark/70 mb-4">Gracias por contactarnos. Un asesor se pondrá en contacto contigo en menos de 2 horas.</p>
                    <a href="#" class="text-primary hover:text-accent transition-colors font-medium">Volver al inicio</a>
                </div>
            `;
        });
    }

    // Popup functionality
    setTimeout(function() {
        const popup = document.getElementById('discount-popup');
        if (popup) {
            popup.classList.remove('hidden');
        }
    }, 5000); // Show popup after 5 seconds

    const closePopup = document.getElementById('close-popup');
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            const popup = document.getElementById('discount-popup');
            popup.classList.add('hidden');
        });
    }
});