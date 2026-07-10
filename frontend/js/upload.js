const uploadButton = document.querySelector(".upload-btn");
const fileInput = document.getElementById("fileUpload");

uploadButton.addEventListener("click", async () => {

    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file first.");
        return;
    }

    // Get JWT Token
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {

        const response = await fetch(
            "http://localhost:5000/api/file/upload",
            {
                method: "POST",

                headers: {
                    Authorization: `Bearer ${token}`
                },

                body: formData
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("✅ File Uploaded Successfully!");

fileInput.value = "";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Upload Failed!");

    }

});