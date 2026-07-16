// ==========================================
// CloudVault AI Upload
// upload.js
// ==========================================

// Backend URL
const API_URL = "http://localhost:5000/api";

// JWT Token
const token = localStorage.getItem("token");

// Login Check
if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Elements
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const dashboardBtn = document.getElementById("dashboardBtn");

const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let selectedFile = null;

// ==========================
// File Selection
// ==========================

fileInput.addEventListener("change", () => {

    if (fileInput.files.length > 0) {

        selectedFile = fileInput.files[0];

        showFileDetails();

    }

});

// ==========================
// Drag & Drop
// ==========================

dropZone.addEventListener("dragover", (e) => {

    e.preventDefault();

    dropZone.classList.add("dragover");

});

dropZone.addEventListener("dragleave", () => {

    dropZone.classList.remove("dragover");

});

dropZone.addEventListener("drop", (e) => {

    e.preventDefault();

    dropZone.classList.remove("dragover");

    selectedFile = e.dataTransfer.files[0];

    showFileDetails();

});

// ==========================
// Click Drop Zone
// ==========================

dropZone.addEventListener("click", () => {

    fileInput.click();

});

// ==========================
// File Preview
// ==========================

function showFileDetails() {

    fileName.textContent = selectedFile.name;

    fileSize.textContent =
        "Size : " +
        (selectedFile.size / 1024 / 1024).toFixed(2) +
        " MB";

}

// ==========================
// Upload
// ==========================

uploadBtn.addEventListener("click", async () => {

    if (!selectedFile) {

        alert("Please select a file.");

        return;

    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

        uploadBtn.disabled = true;

        uploadBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';

        // Fake Progress Animation
        let progress = 0;

        const timer = setInterval(() => {

            progress += 10;

            if (progress > 90) {

                clearInterval(timer);

            }

            progressBar.style.width = progress + "%";

            progressText.textContent = progress + "%";

        }, 200);

        const response = await fetch(

            `${API_URL}/files/upload`,

            {

                method: "POST",

                headers: {

                    Authorization: `Bearer ${token}`

                },

                body: formData

            }

        );

        clearInterval(timer);

        progressBar.style.width = "100%";

        progressText.textContent = "100%";

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message || "Upload Failed");

        }

        alert("File Uploaded Successfully!");

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1000);

    }

    catch (error) {

        console.log(error);

        alert(error.message || "Upload Failed");

    }

    finally {

        uploadBtn.disabled = false;

        uploadBtn.innerHTML =
            '<i class="fa-solid fa-upload"></i> Upload File';

    }

});

// ==========================
// Dashboard Button
// ==========================

dashboardBtn.addEventListener("click", () => {

    window.location.href = "dashboard.html";

});