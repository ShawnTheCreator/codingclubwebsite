document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector(".about-container");

    function revealOnScroll() {
        const sectionPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            aboutSection.classList.add("show");
        }
    }

    window.addEventListener("scroll", revealOnScroll);
});
