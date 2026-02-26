const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Abrir / cerrar
toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    toggle.classList.toggle('open');
});

// Cerrar al hacer click en un enlace
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggle.classList.remove('open');
    });
});

// Cerrar al hacer click fuera
document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        toggle.classList.remove('open');
    }
});