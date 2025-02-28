function slideLeft() {
    const container = document.getElementById("eventSlider");
    container.scrollBy({
        left: -400, 
        behavior: "smooth"
    });
}


function slideRight() {
    const container = document.getElementById("eventSlider");
    container.scrollBy({
        left: 400,
        behavior: "smooth"
    });
}


document.querySelectorAll(".event-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });
});


const container = document.getElementById("eventSlider");
const prevButton = document.querySelector(".slider-button.prev");
const nextButton = document.querySelector(".slider-button.next");


updateButtonStates();

container.addEventListener("scroll", () => {
    updateButtonStates();
});


function updateButtonStates() {
    
    if (container.scrollLeft === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}