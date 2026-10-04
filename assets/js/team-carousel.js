/* =========================================================
   TEAM CAROUSEL (Tim Pengembang)
   JS hanya mengatur: kartu aktif, nama & jabatan, tombol panah,
   dan posisi geser. Animasi lebar & warna diurus CSS (transition).
   ========================================================= */

(function () {
  var root = document.getElementById('team-carousel');
  if (!root) return;

  var viewport = root.querySelector('.tc-viewport');
  var track = root.querySelector('.tc-track');
  var cards = Array.prototype.slice.call(root.querySelectorAll('.tc-card'));
  var nameEl = root.querySelector('.tc-name');
  var roleEl = root.querySelector('.tc-role');
  var prevBtn = root.querySelector('.tc-prev');
  var nextBtn = root.querySelector('.tc-next');
  var index = 0;

  function cssNumber(name) {
    return parseFloat(getComputedStyle(root).getPropertyValue(name));
  }

  function go(i) {
    index = Math.max(0, Math.min(cards.length - 1, i));

    cards.forEach(function (card, n) {
      var active = n === index;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-current', active ? 'true' : 'false');
    });

    nameEl.textContent = cards[index].dataset.name;
    roleEl.textContent = cards[index].dataset.role;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === cards.length - 1;

    // hitung posisi geser dari ukuran di CSS (ikut berubah di tiap breakpoint)
    var narrow = cssNumber('--tc-narrow');
    var wide = cssNumber('--tc-wide');
    var gap = cssNumber('--tc-gap');
    var vw = viewport.clientWidth;
    var trackWidth = (cards.length - 1) * (narrow + gap) + wide;
    var offset;

    if (trackWidth <= vw) {
      // semua kartu muat: taruh di tengah, tidak perlu geser
      offset = (vw - trackWidth) / 2;
    } else {
      // tidak muat: kartu aktif di tengah, tapi jangan sampai ada ruang kosong di tepi
      offset = vw / 2 - (index * (narrow + gap) + wide / 2);
      offset = Math.min(0, Math.max(vw - trackWidth, offset));
    }
    track.style.transform = 'translateX(' + offset + 'px)';
  }

  prevBtn.addEventListener('click', function () { go(index - 1); });
  nextBtn.addEventListener('click', function () { go(index + 1); });

  cards.forEach(function (card, n) {
    card.addEventListener('click', function () { go(n); });
  });

  // swipe di HP
  var startX = null;
  viewport.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });
  viewport.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 40) go(index + (diff < 0 ? 1 : -1));
    startX = null;
  });

  window.addEventListener('resize', function () { go(index); });

  go(0);
})();