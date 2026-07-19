// ==========================================
// CloudVault AI
// files.js (Part 1)
// ==========================================

// Backend URL
const API_URL = "http://13.233.157.89:5001/api/files";

// JWT Token
const token = localStorage.getItem("token");

// Login Check
if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

// Elements
const filesTable = document.getElementById("filesTable");
const totalFiles = document.getElementById("totalFiles");
const storageUsed = document.getElementById("storageUsed");
const searchInput = document.getElementById("searchInput");
const dashboardBtn = document.getElementById("dashboardBtn");
const uploadBtn = document.getElementById("uploadBtn");

// Navigation
dashboardBtn.addEventListener("click", () => {

    window.location.href = "dashboard.html";

});

uploadBtn.addEventListener("click", () => {

    window.location.href = "upload.html";

});

// Search
searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const rows = filesTable.querySelectorAll("tr");

    rows.forEach((row) => {

        row.style.display = row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";

    });

});

// ==========================================
// Load Files
// ==========================================

async function loadFiles() {

    try {

        const response = await fetch(API_URL, {

            method: "GET",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        renderFiles(data.files);

    }

    catch (error) {

        console.log(error);

        alert("Unable to Load Files");

    }

}

// ==========================================
// Render Files
// ==========================================

function renderFiles(files) {

    filesTable.innerHTML = "";

    totalFiles.innerText = files.length;

    let total = 0;

    if (files.length === 0) {

        filesTable.innerHTML = `

        <tr>

            <td colspan="5">

                No Files Uploaded

            </td>

        </tr>

        `;

        storageUsed.innerText = "0 MB";

        return;

    }

    files.forEach(file => {

        total += file.size;

        filesTable.innerHTML += `

        <tr>

            <td>${file.originalname}</td>

            <td>${file.type}</td>

            <td>${(file.size / (1024 * 1024)).toFixed(2)} MB</td>

            <td>${new Date(file.createdAt).toLocaleDateString()}</td>

            <td>

                <button
                    class="download-btn"
                    onclick="downloadFile('${file._id}')">
                    Download
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteFile('${file._id}')">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

    storageUsed.innerText =
        (total / (1024 * 1024)).toFixed(2) + " MB";

}

// ==========================================
// Download File
// ==========================================

async function downloadFile(id) {

    try {

        const response = await fetch(

            `${API_URL}/download/${id}`,

            {

                method: "GET",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        window.open(data.downloadUrl, "_blank");

    }

    catch (error) {

        console.log(error);

        alert("Download Failed");

    }

}

// ==========================================
// Delete File
// ==========================================

async function deleteFile(id) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this file?"

    );

    if (!confirmDelete) {

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("File Deleted Successfully");

        loadFiles();

    }

    catch (error) {

        console.log(error);

        alert("Delete Failed");

    }

}

// ==========================================
// Logout
// ==========================================

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    window.location.href = "login.html";

}

// ==========================================
// Auto Refresh
// ==========================================

setInterval(() => {

    loadFiles();

}, 5000);

// ==========================================
// Initial Load
// ==========================================

loadFiles();