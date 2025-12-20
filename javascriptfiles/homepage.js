const toggleSearch = () => {
  const searchForm = document.querySelector('.search-form');
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-input');

  searchButton.addEventListener('click', () => {
    searchForm.classList.toggle('active-search');
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchInput.value = '';
      searchForm.classList.remove('active-search');
    }
  });
};
toggleSearch();

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
