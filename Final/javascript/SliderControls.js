// Make sure this code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const eventSlider = document.getElementById('eventSlider');
    
    // Check if element exists before adding functionality
    if (eventSlider) {
        window.slideLeft = function() {
            eventSlider.scrollBy({ left: -400, behavior: 'smooth' });
            console.log('Sliding left'); // For debugging
        }
        
        window.slideRight = function() {
            eventSlider.scrollBy({ left: 400, behavior: 'smooth' });
            console.log('Sliding right'); // For debugging
        }
    } else {
        console.error('Event slider element not found');
    }
});