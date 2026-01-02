//Map
const teg = [41.3059, 19.8216];

const map = L.map('map', { scrollWheelZoom: false }).setView(teg, 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker(teg)
  .addTo(map)
  .bindPopup('<b>Maison de Parfum</b><br>TEG – Tirana East Gate');



//Booking modal
function openBooking() {
  document.getElementById('bookingModal').style.display = 'flex';
}

function closeBooking() {
  document.getElementById('bookingModal').style.display = 'none';
}

function submitBooking(e) {
  e.preventDefault();
  closeBooking();
  alert("The reservation was successfully submitted! We will contact you soon.");
}

window.addEventListener('click', function (e) {
  const modal = document.getElementById('bookingModal');
  if (e.target === modal) {
    closeBooking();
  }
});

//Funksionni per rregullim te scroll te headerit
$(document).ready(function () {
    var lastScrollTop = 0;
    var navbar = $('header');
    $(window).scroll(function () {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            navbar.slideUp(200);
        } else {
            navbar.slideDown(200);
        }
        lastScrollTop = st;
    });
});
