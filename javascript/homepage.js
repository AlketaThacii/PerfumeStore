//Pjesa "Our Brands"
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


//Pjesa "What makes us Special"
$(document).ready(function () {

    $(".card4").on("mouseenter", function () {
        $(this).addClass("selected").siblings().removeClass("selected");
    });
});


//Pjesa per me bo swip ne pjesen "What our Clients Say"
var swiper = new Swiper(".mySwiper", {
  loop: false,
  spaceBetween: 30,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    480: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 1,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3, 
    }
  }
});


//Pjesa e shfaqjes se alertit kur bejm subscribe
const form = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email');
const alertBanner = document.getElementById('alert-banner');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (validateEmail(email)) {
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

function showAlert(message, color) {
    alertBanner.textContent = message;
    alertBanner.style.backgroundColor = color;
    alertBanner.style.top = '20px';
    alertBanner.style.opacity = '1';

    setTimeout(() => {
        alertBanner.style.opacity = '0';
        alertBanner.style.top = '-60px';
    }, 3000);
}


//Funksioni per shfaqjen e njoftimit per cookies
$(document).ready(function () {

    setTimeout(function () {
        if (!sessionStorage.getItem("cookieShown")) {
            $("#cookie-overlay, #cookie-modal").fadeIn();
            sessionStorage.setItem("cookieShown", "true");
        }
    }, 3000);

    $("#cookie-accept").click(function () {
        $("#cookie-overlay, #cookie-modal").fadeOut();
    });

    $("#cookie-overlay").click(function () {
        $("#cookie-overlay, #cookie-modal").fadeOut();
    });

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

//Funksioni per butonin "Back to Top"
$(document).ready(function () {
    $('body').append('<div id="backToTop">&#8679;</div>');

    var backToTop = $('#backToTop');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn(300);
        } else {
            backToTop.fadeOut(300);
        }
    });
    backToTop.click(function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });
});
