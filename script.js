// ── NAVBAR ──
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    toggle.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggle.classList.remove('open');
    });
});

document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        toggle.classList.remove('open');
    }
});

// ── VANTA NET ──
VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xDB2777,
    backgroundColor: 0x1a0a2e,
    points: 10.00,
    maxDistance: 20.00,
    spacing: 15.00,
    showDots: true
});

// ── FORMULARIO CON FORMSPREE ──
const formulario = document.getElementById('contacto-form');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre   = document.getElementById('nombre');
    const email    = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const mensaje  = document.getElementById('mensaje');
    const btn      = document.getElementById('btn-enviar');
    const btnTexto = document.getElementById('btn-texto');

    // Limpiar errores previos
    [nombre, email, telefono, mensaje].forEach(c => c.classList.remove('input-error'));

    // Config SweetAlert base
    const swalBase = {
        confirmButtonColor: '#ff3f81',
        background: '#1a0a2e',
        color: '#ffffff'
    };

    // ── VALIDAR NOMBRE ──
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (nombre.value.trim() === '') {
        nombre.classList.add('input-error');
        nombre.focus();
        Swal.fire({ ...swalBase, icon: 'warning', title: 'Nombre requerido', text: 'Por favor ingresa tu nombre.' });
        return;
    }
    if (!soloLetras.test(nombre.value.trim())) {
        nombre.classList.add('input-error');
        nombre.focus();
        Swal.fire({ ...swalBase, icon: 'warning', title: 'Nombre inválido', text: 'El nombre solo puede contener letras.' });
        return;
    }

    // ── VALIDAR EMAIL ──
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        email.classList.add('input-error');
        email.focus();
        Swal.fire({ ...swalBase, icon: 'warning', title: 'Email requerido', text: 'Por favor ingresa tu correo electrónico.' });
        return;
    }
    if (!regexEmail.test(email.value.trim())) {
        email.classList.add('input-error');
        email.focus();
        Swal.fire({ ...swalBase, icon: 'warning', title: 'Email inválido', text: 'Por favor ingresa un correo válido. Ejemplo: nombre@correo.com' });
        return;
    }

    // ── VALIDAR TELÉFONO (opcional) ──
    if (telefono.value.trim() !== '') {
        const regexTel = /^[\+]?[\d\s\-\(\)]{7,15}$/;
        if (!regexTel.test(telefono.value.trim())) {
            telefono.classList.add('input-error');
            telefono.focus();
            Swal.fire({ ...swalBase, icon: 'warning', title: 'Teléfono inválido', text: 'Si ingresas un teléfono, asegúrate de que sea válido. Ejemplo: +57 300 000 0000' });
            return;
        }
    }

    // ── VALIDAR MENSAJE ──
    if (mensaje.value.trim() === '') {
        mensaje.classList.add('input-error');
        mensaje.focus();
        Swal.fire({ ...swalBase, icon: 'warning', title: 'Mensaje requerido', text: 'Por favor escribe un mensaje antes de enviar.' });
        return;
    }
    if (mensaje.value.trim().length < 10) {
        mensaje.classList.add('input-error');
        mensaje.focus();
        Swal.fire({ ...swalBase, icon: 'warning', title: 'Mensaje muy corto', text: 'Tu mensaje debe tener al menos 10 caracteres.' });
        return;
    }

    // ── ENVIAR A FORMSPREE ──
    btn.disabled = true;
    btnTexto.textContent = 'Enviando...';

    const formData = new FormData(formulario);

    fetch(formulario.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
    })
    .then(res => {
        btn.disabled = false;
        btnTexto.textContent = 'Enviar mensaje';
        if (res.ok) {
            formulario.reset();
            Swal.fire({ ...swalBase, icon: 'success', title: '¡Mensaje enviado! 🎉', text: 'Gracias por escribirme. Te responderé lo antes posible.' });
        } else {
            Swal.fire({ ...swalBase, icon: 'error', title: 'Error al enviar', text: 'Hubo un problema. Inténtalo de nuevo o escríbeme por WhatsApp.' });
        }
    })
    .catch(() => {
        btn.disabled = false;
        btnTexto.textContent = 'Enviar mensaje';
        Swal.fire({ ...swalBase, icon: 'error', title: 'Error al enviar', text: 'Hubo un problema. Inténtalo de nuevo o escríbeme por WhatsApp.' });
    });
});

