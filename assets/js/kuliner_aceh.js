// Scroll halus ke section + tandai tombol yang aktif
(function () {
    var links = document.querySelectorAll('.wk-jump a');
    var sections = [];

    links.forEach(function (a) {
        var target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        sections.push({ link: a, el: target });
        a.addEventListener('click', function (e) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            sections.forEach(function (s) {
                s.link.classList.toggle('active', s.el === en.target);
            });
        });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s.el); });
})();