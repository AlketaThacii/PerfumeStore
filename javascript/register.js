document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".wrapper");
    const closeBtn = document.querySelector(".icon-close");

 
      if (closeBtn && wrapper) {
        closeBtn.addEventListener("click", () => {
            wrapper.style.display = "none"; 
        });
    }


    document.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", e => {
        if (link.getAttribute("href").includes(".html")) return;
        e.preventDefault();
      });
    });
});