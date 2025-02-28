document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const response = await fetch('https://railway.com/project/ad11ba24-d5ae-476c-a1de-cae7fad7a4ca/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }) 
    });

    const result = await response.json();
    
    if (response.ok) {
        alert("Login successful!");
        
        window.location.href = "/dashboard.html";
    } else {
        alert(result.message || "Login failed!");
    }
});

