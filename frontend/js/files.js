const tableBody = document.getElementById("filesTableBody");

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

async function loadFiles() {

    try {

        const response = await fetch("http://localhost:5000/api/file/files", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        tableBody.innerHTML = "";

        if (!data.success) {

            tableBody.innerHTML =
                "<tr><td colspan='4'>No Files Found</td></tr>";

            return;

        }

        data.files.forEach(file => {

            tableBody.innerHTML += `

            <tr>

                <td>${file}</td>

                <td>-</td>

                <td>-</td>

                <td>

                    <button
                    class="delete-btn"
                    onclick="deleteFile('${file}')">

                    Delete

                    </button>

                </td>

            </tr>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

async function deleteFile(fileName) {

    const confirmDelete =
        confirm("Delete this file?");

    if (!confirmDelete) return;

    await fetch(

        `http://localhost:5000/api/file/delete/${fileName}`,

        {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    loadFiles();

}

loadFiles();