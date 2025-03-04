document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    if (!loginForm) return; // Prevent script errors if form doesn't exist

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch('https://codingclubwebsite.onrender.com/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // If backend needs authentication
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login, redirect user
                window.location.href = "/home.html"; // Adjust based on actual file structure
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
