/* =========================================================================
   CAFRAN IDIOMAS — interações
   ========================================================================= */
document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Nav: sombra ao rolar ---------- */
    const nav = document.getElementById('nav');
    if (nav) {
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------- Menu mobile ---------- */
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    if (menuBtn && navLinks) {
        const toggle = (open) => {
            menuBtn.classList.toggle('open', open);
            navLinks.classList.toggle('open', open);
            menuBtn.setAttribute('aria-expanded', String(open));
        };
        menuBtn.addEventListener('click', () => toggle(!menuBtn.classList.contains('open')));
        navLinks.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', () => toggle(false))
        );
    }

    /* ---------- FAQ accordion ---------- */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const q = item.querySelector('.faq-q');
        const a = item.querySelector('.faq-a');
        if (!q || !a) return;
        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            faqItems.forEach(other => {
                other.classList.remove('active');
                const oa = other.querySelector('.faq-a');
                if (oa) oa.style.maxHeight = null;
            });
            if (!isOpen) {
                item.classList.add('active');
                a.style.maxHeight = a.scrollHeight + 'px';
            }
        });
    });

    /* ---------- Scroll reveal ---------- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('in'));
    }

    /* ---------- Departure board: duplica conteúdo para loop contínuo ---------- */
    const track = document.getElementById('boardTrack');
    if (track) track.innerHTML += track.innerHTML;

    /* ---------- Lead form -> WhatsApp ---------- */
    const form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = (form.nome.value || '').trim();
            const tel = (form.tel.value || '').trim();
            if (!nome || !tel) {
                if (!nome) form.nome.focus();
                else form.tel.focus();
                return;
            }
            const idioma = form.idioma.value;
            const aluno = form.aluno.value;
            const modal = form.modal.value;

            const msg =
                `Olá, Cafran Idiomas! Quero agendar minha aula experimental gratuita.\n\n` +
                `*Nome:* ${nome}\n` +
                `*WhatsApp:* ${tel}\n` +
                `*Idioma:* ${idioma}\n` +
                `*Para:* ${aluno}\n` +
                `*Modalidade:* ${modal}`;

            const url = `https://wa.me/5561999349507?text=${encodeURIComponent(msg)}`;

            const success = document.getElementById('formSuccess');
            if (success) success.classList.add('show');

            window.open(url, '_blank', 'noopener');
        });
    }

    /* ---------- Ano dinâmico (rodapé), se houver marcador ---------- */
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
});
