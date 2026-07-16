const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    const submitBtn = signupForm.querySelector("button");

    // Validation
    if (!username || !email || !password || !confirmPassword) {

        alert("Please fill all fields.");

        return;

    }

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    if (password.length < 6) {

        alert("Password must be at least 6 characters.");

        return;

    }

    submitBtn.disabled = true;

    submitBtn.innerText = "Creating Account...";

    try {

        const response = await fetch("http://localhost:5000/api/auth/signup", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username,

                email,

                password

            })

        });

        const data = await response.json();

        if (response.ok && data.success) {

            alert("Account Created Successfully!");

            window.location.href = "login.html";

        } else {

            alert(data.message || "Signup Failed");

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

    finally {

        submitBtn.disabled = false;

        submitBtn.innerText = "Sign Up";

    }

});