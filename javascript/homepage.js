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


$(document).ready(function () {
    var lastScrollTop = 0; // Ruaj scroll-in e mëparshëm
    var navbar = $('header'); // Zgjidh header-in

    $(window).scroll(function () {
        var st = $(this).scrollTop(); // Marr scroll-in aktual

        if (st > lastScrollTop) {
            // Scroll poshtë
            navbar.slideUp(200); // fsheh header-in
        } else {
            // Scroll lart
            navbar.slideDown(200); 
        }
        lastScrollTop = st; 
    });
});


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
