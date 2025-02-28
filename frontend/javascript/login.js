document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('https://codingclubwebsite.onrender.com/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login, redirect user
                window.location.href = "../home.html"; // Change to your dashboard page if needed
            } else {
                // Show error message
                errorMessage.textContent = data.message || "Wrong email or password!";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error("Error:", error);
            errorMessage.textContent = "An error occurred. Please try again.";
            errorMessage.style.display = "block";
        }
    });
});
