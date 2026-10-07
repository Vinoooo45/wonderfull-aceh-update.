// Fade-out sebelum pindah halaman
(function () {
    document.addEventListener('click', function (e) {
        var a = e.target.closest('a');
        if (!a) return;

        var href = a.getAttribute('href');
        if (!href || href.charAt(0) === '#') return;                  // link anchor dalam halaman
        if (/^(mailto|tel|javascript):/i.test(href)) return;
        if (a.target === '_blank' || a.hasAttribute('download')) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

        var url = new URL(a.href, location.href);
        if (url.origin !== location.origin) return;                   // link ke situs lain
        if (url.pathname === location.pathname) return;               // halaman yang sama (hash)

        e.preventDefault();
        document.body.classList.add('page-leaving');
        setTimeout(function () { location.href = url.href; }, 300);   // samakan dengan durasi CSS
    });

    // Tombol Back: pastikan halaman tidak tertinggal dalam keadaan transparan
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) document.body.classList.remove('page-leaving');
    });
})();

// Navbar selalu terlihat, hanya di halaman wisata & kuliner
(function () {
    if (!document.body.classList.contains('page-wk')) return;
    var header = document.querySelector('.header-area');
    if (!header) return;

    function keepVisible() { header.classList.add('background-header'); }
    keepVisible();
    window.addEventListener('scroll', keepVisible);
    window.addEventListener('load', keepVisible);
})();