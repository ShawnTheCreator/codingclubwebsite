
document.addEventListener('DOMContentLoaded', function() {
    const eventSlider = document.getElementById('eventSlider');
    
  
    if (eventSlider) {
        window.slideLeft = function() {
            eventSlider.scrollBy({ left: -400, behavior: 'smooth' });
            console.log('Sliding left');
        }
        
        window.slideRight = function() {
            eventSlider.scrollBy({ left: 400, behavior: 'smooth' });
            console.log('Sliding right'); 
        }
    } else {
        console.error('Event slider element not found');
    }
});