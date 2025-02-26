// Function to slide the container to the left
function slideLeft() {
    const container = document.getElementById("eventSlider");
    container.scrollBy({
        left: -400, // Adjust this value to match the width of your event cards
        behavior: "smooth"
    });
}

// Function to slide the container to the right
function slideRight() {
    const container = document.getElementById("eventSlider");
    container.scrollBy({
        left: 400, // Adjust this value to match the width of your event cards
        behavior: "smooth"
    });
}

// Toggle active class on event cards
document.querySelectorAll(".event-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });
});

// Disable buttons at the ends of the slider
const container = document.getElementById("eventSlider");
const prevButton = document.querySelector(".slider-button.prev");
const nextButton = document.querySelector(".slider-button.next");

// Initial check for button states
updateButtonStates();

// Update button states on scroll
container.addEventListener("scroll", () => {
    updateButtonStates();
});

// Function to update button states
function updateButtonStates() {
    // Disable prev button if at the start
    if (container.scrollLeft === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    // Disable next button if at the end
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}