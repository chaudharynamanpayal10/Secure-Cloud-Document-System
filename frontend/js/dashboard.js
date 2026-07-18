// ==========================================
// CloudVault AI Dashboard
// dashboard.js (Part 1)
// ==========================================

// Backend URL
const API_URL = "http://localhost:5001/api";

// JWT Token
const token = localStorage.getItem("token");

// Login Check
if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

// Username
const username = localStorage.getItem("username");

document.getElementById("username").textContent =
    username || "User";

// Elements
const totalFiles = document.getElementById("totalFiles");
const storageUsed = document.getElementById("storageUsed");
const todayUploads = document.getElementById("todayUploads");
const recentFiles = document.getElementById("recentFiles");
const searchInput = document.getElementById("searchInput");

// ==========================================
// Navigation
// ==========================================

document.getElementById("uploadBtn").onclick = () => {

    window.location.href = "upload.html";

};

document.getElementById("uploadPage").onclick = () => {

    window.location.href = "upload.html";

};

document.getElementById("viewFilesBtn").onclick = () => {

    window.location.href = "files.html";

};

document.getElementById("filesPage").onclick = () => {

    window.location.href = "files.html";

};

// ==========================================
// Dashboard API
// ==========================================

async function loadDashboard() {

    try {

        const response = await fetch(

            `${API_URL}/files/dashboard`,

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

        totalFiles.innerText = data.totalFiles;

        storageUsed.innerText =
            (data.storageUsed / (1024 * 1024)).toFixed(2) + " MB";

        todayUploads.innerText =
            data.uploadedToday;

        loadRecentFiles();

    }

    catch (error) {

        console.log(error);

        alert("Unable to Load Dashboard");

    }

}

// ==========================================
// Recent Files API
// ==========================================

async function loadRecentFiles() {

    try {

        const response = await fetch(

            `${API_URL}/files`,

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

        renderFiles(data.files);

    }

    catch (error) {

        console.log(error);

    }

}
// ==========================================
// Render Recent Files
// ==========================================

function renderFiles(files) {

    recentFiles.innerHTML = "";

    if (files.length === 0) {

        recentFiles.innerHTML = `

        <tr>

            <td colspan="5">

                <div class="empty">

                    <i class="fa-solid fa-folder-open"></i>

                    <h3>No Files Uploaded Yet</h3>

                    <p>Upload your first document.</p>

                </div>

            </td>

        </tr>

        `;

        return;

    }

    // Show only latest 5 files

    files.slice(0, 5).forEach(file => {

        recentFiles.innerHTML += `

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

}

// ==========================================
// Search Files
// ==========================================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const rows = recentFiles.querySelectorAll("tr");

    rows.forEach(row => {

        row.style.display =

            row.innerText.toLowerCase().includes(value)

            ? ""

            : "none";

    });

});

// ==========================================
// Download File
// ==========================================

async function downloadFile(id) {

    try {

        const response = await fetch(

            `${API_URL}/files/download/${id}`,

            {

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

    if (!confirm("Delete this file?")) {

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/files/${id}`,

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

        loadDashboard();

    }

    catch (error) {

        console.log(error);

        alert("Delete Failed");

    }

}
// ==========================================
// Logout
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm(

            "Are you sure you want to logout?"

        );

        if (!confirmLogout) {

            return;

        }

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");

        window.location.href = "login.html";

    });

}

// ==========================================
// Auto Refresh Dashboard
// ==========================================

setInterval(() => {

    loadDashboard();

}, 10000);

// ==========================================
// Initial Load
// ==========================================

loadDashboard();

// ==========================================
// Prevent Back After Logout
// ==========================================

window.history.pushState(null, "", window.location.href);

window.onpopstate = function () {

    window.history.pushState(null, "", window.location.href);

};

// ==========================================
// Check Token
// ==========================================

if (!localStorage.getItem("token")) {

    window.location.href = "login.html";

}