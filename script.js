/* =============================================
   LA TANITA — Pastelería y Cafetería
   Interactive Scripts
   ============================================= */

(function() {
    'use strict';

    // ============================================
    // HEADER — Scroll Behavior
    // ============================================
    const header = document.getElementById('header');
    let lastScrollY = 0;

    function handleHeaderScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
    }

    // ============================================
    // MOBILE MENU
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = mainNav ? mainNav.querySelectorAll('.header__nav-link') : [];

    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(function(link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // ============================================
    // HERO — Initial Animation
    // ============================================
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(function() {
            hero.classList.add('loaded');
        }, 100);
    }

    // ============================================
    // INTERSECTION OBSERVER — Scroll Animations
    // ============================================
    function createScrollObserver() {
        var observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing once visible
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        var animatableElements = [
            '.differential-card',
            '.experience__image-container',
            '.experience__text',
            '.testimonial-card',
            '.moment-card',
            '.story__text',
            '.story__images',
            '.fade-in-up',
            '.fade-in-left',
            '.fade-in-right'
        ];

        animatableElements.forEach(function(selector) {
            var elements = document.querySelectorAll(selector);
            elements.forEach(function(el, index) {
                // Add stagger delay to cards
                if (selector === '.differential-card' || 
                    selector === '.testimonial-card' || 
                    selector === '.moment-card') {
                    el.style.transitionDelay = (index * 0.1) + 's';
                }
                observer.observe(el);
            });
        });
    }

    // ============================================
    // FORM — WhatsApp Integration
    // ============================================
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            var name = document.getElementById('name').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var date = document.getElementById('date').value;
            var guests = document.getElementById('guests').value;
            var service = document.getElementById('service').value;
            var message = document.getElementById('message').value.trim();

            // Validate required fields
            if (!name || !phone || !date || !guests || !service) {
                // Find first empty required field and focus it
                var fields = form.querySelectorAll('[required]');
                for (var i = 0; i < fields.length; i++) {
                    if (!fields[i].value.trim()) {
                        fields[i].focus();
                        fields[i].style.borderColor = '#E52D27';
                        setTimeout(function() {
                            fields[i].style.borderColor = '';
                        }, 2000);
                        break;
                    }
                }
                return;
            }

            // Format date for display
            var dateObj = new Date(date + 'T12:00:00');
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var formattedDate = dateObj.toLocaleDateString('es-AR', options);

            // Map service values to display names
            var serviceNames = {
                'merienda-libre': 'Merienda Libre',
                'desayuno': 'Desayuno',
                'almuerzo': 'Almuerzo',
                'tabla-dulce-salada': 'Tabla Dulce-Salada',
                'otro': 'Otra consulta'
            };
            var serviceName = serviceNames[service] || service;

            // Build WhatsApp message
            var whatsappMessage = 'Hola La Tanita! 🍰\n\n';
            whatsappMessage += 'Me comunico para hacer una reserva:\n\n';
            whatsappMessage += '👤 Nombre: ' + name + '\n';
            whatsappMessage += '📱 Teléfono: ' + phone + '\n';
            whatsappMessage += '📅 Fecha: ' + formattedDate + '\n';
            whatsappMessage += '👥 Personas: ' + guests + '\n';
            whatsappMessage += '☕ Servicio: ' + serviceName + '\n';
            
            if (message) {
                whatsappMessage += '\n💬 Mensaje: ' + message + '\n';
            }

            whatsappMessage += '\n¡Gracias!';

            // Encode message for URL
            var encodedMessage = encodeURIComponent(whatsappMessage);

            // Open WhatsApp
            var whatsappUrl = 'https://wa.me/5491126756944?text=' + encodedMessage;
            window.open(whatsappUrl, '_blank');

            // Optional: Show success feedback
            var button = form.querySelector('.contact-form__button');
            var originalText = button.innerHTML;
            button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg> ¡Mensaje enviado!';
            button.style.background = '#25D366';
            
            setTimeout(function() {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 3000);
        });
    }

    // ============================================
    // SMOOTH SCROLL — Anchor Links
    // ============================================
    function initSmoothScroll() {
        var anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#') return;
                
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    var headerHeight = header ? header.offsetHeight : 0;
                    var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // ACTIVE NAV LINK — Scroll Spy
    // ============================================
    function initScrollSpy() {
        var sections = document.querySelectorAll('section[id]');
        
        function updateActiveLink() {
            var scrollY = window.scrollY + 150;
            
            sections.forEach(function(section) {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.offsetHeight;
                var sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    }

    // ============================================
    // GALLERY — Lightbox (optional enhancement)
    // ============================================
    function initGalleryInteraction() {
        var galleryItems = document.querySelectorAll('.gallery__item');
        
        galleryItems.forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.zIndex = '';
            });
        });
    }

    // ============================================
    // NUMBER COUNTER — Animated Stats
    // ============================================
    function initCounterAnimation() {
        var counters = document.querySelectorAll('.experience__feature-number');
        var counterAnimated = false;
        
        function animateCounters() {
            if (counterAnimated) return;
            
            var featuresSection = document.querySelector('.experience__features');
            if (!featuresSection) return;
            
            var rect = featuresSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                counterAnimated = true;
                
                counters.forEach(function(counter) {
                    var text = counter.textContent;
                    var match = text.match(/^(\d+)/);
                    
                    if (match) {
                        var target = parseInt(match[1]);
                        var suffix = text.replace(match[1], '');
                        var current = 0;
                        var increment = Math.ceil(target / 50);
                        var duration = 1500;
                        var stepTime = duration / (target / increment);
                        
                        var timer = setInterval(function() {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            counter.textContent = current + suffix;
                        }, stepTime);
                    }
                });
            }
        }

        window.addEventListener('scroll', animateCounters, { passive: true });
    }

    // ============================================
    // WHATSAPP FLOAT — Show after scroll
    // ============================================
    function initWhatsAppFloat() {
        var whatsappFloat = document.getElementById('whatsappFloat');
        if (!whatsappFloat) return;

        // Initial state handled by CSS animation
        // Add scroll-based visibility enhancement
        var isVisible = false;
        
        function checkVisibility() {
            if (window.scrollY > 400 && !isVisible) {
                isVisible = true;
                whatsappFloat.style.animationPlayState = 'running';
            }
        }

        window.addEventListener('scroll', checkVisibility, { passive: true });
    }

    // ============================================
    // PAGE LOAD — Initialize Everything
    // ============================================
    function init() {
        // Header scroll effect
        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        handleHeaderScroll(); // Initial check

        // Scroll animations
        createScrollObserver();

        // Contact form
        initContactForm();

        // Smooth scrolling
        initSmoothScroll();

        // Scroll spy for navigation
        initScrollSpy();

        // Gallery interactions
        initGalleryInteraction();

        // Counter animations
        initCounterAnimation();

        // WhatsApp float
        initWhatsAppFloat();

        console.log('La Tanita - Landing page initialized ✓');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();