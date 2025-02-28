document.addEventListener("DOMContentLoaded", function () {
    const teamSection = document.querySelector(".team-container");

    if (!teamSection) {
        console.error("Team section not found!");
        return; // Stop execution if the element is missing
    }

    function revealOnScroll() {
        const rect = teamSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            teamSection.classList.add("visible");
            window.removeEventListener("scroll", revealOnScroll); // Prevent unnecessary calls
        }
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger once on load
});
