var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  
  $(document).ready(function () {

    $(".card4").on("mouseenter", function () {
      $(this).addClass("selected").siblings().removeClass("selected");
    });
  });



  $(function () {
    $('.brand-slider-only').hover(
        function () {
            $('.brand-slider-track').css('animation-play-state', 'paused');
        },
        function () {
            $('.brand-slider-track').css('animation-play-state', 'running');
        }
    );
});


const form = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email');
const alertBanner = document.getElementById('alert-banner');

form.addEventListener('submit', function(e){
    e.preventDefault();

    const email = emailInput.value.trim();

    if(validateEmail(email)){
        showAlert("Thank you! Email was successfully registered.", "green");
        emailInput.value = '';
    } else {
        showAlert("The email is incorrect. Please try again.", "red");
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAlert(message, color){
    alertBanner.textContent = message;
    alertBanner.style.backgroundColor = color;
    alertBanner.style.top = '20px'; 
    alertBanner.style.opacity = '1';

    setTimeout(() => {
        alertBanner.style.opacity = '0';
        alertBanner.style.top = '-60px';
    }, 3000);
}

