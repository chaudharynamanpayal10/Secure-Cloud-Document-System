const loginForm = document.getElementById("loginForm");

const showPassword = document.getElementById("showPassword");
const passwordInput = document.getElementById("password");

// Show / Hide Password
showPassword.addEventListener("change", () => {
    passwordInput.type = showPassword.checked ? "text" : "password";
});

// Login
loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const loginBtn = loginForm.querySelector("button");

    if (!email || !password) {
        alert("Please fill all fields.");
        return;
    }

    loginBtn.disabled = true;
    loginBtn.innerText = "Logging In...";

    try {

        const response = await fetch("http://localhost:5001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("email", data.user.email);

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert(data.message || "Login Failed");

        }

    } catch (error) {

        console.error(error);
        alert("Unable to connect to server.");

    } finally {

        loginBtn.disabled = false;
        loginBtn.innerText = "Login";

    }

});