document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".wrapper");
    const closeBtn = document.querySelector(".icon-close");

 
    const signupLink = document.querySelector(".signup-link");
    const loginLink = document.querySelector(".login-link");

    if (closeBtn && wrapper) {
        closeBtn.addEventListener("click", () => {
            wrapper.style.display = "none"; 
        });
    }
    if (signupLink && wrapper) {
        signupLink.addEventListener("click", (e) => {
            e.preventDefault(); 
            wrapper.style.display = "flex"; 
            wrapper.classList.add("active");
        });
    }

    if (loginLink && wrapper) {
        loginLink.addEventListener("click", (e) => {
            e.preventDefault(); 
            wrapper.style.display = "flex"; 
            wrapper.classList.remove("active"); 
        });
    }
});