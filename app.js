// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL = "https://xaeuurouylcjqzswfyow.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9rkbF1GFmH8GpOeobdP86w_6z8bdoaa";

// Example:
// const SUPABASE_URL = "https://xxxxxxxxxxxx.supabase.co";
// const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIs...";


// ========================================
// LOAD STUDENTS
// ========================================

async function loadStudents() {

    const totalStudentsElement =
        document.getElementById("totalStudents");

    const tableBody =
        document.getElementById("studentTableBody");

    const errorMessage =
        document.getElementById("errorMessage");

    try {

        // Clear previous error
        errorMessage.textContent = "";

        // Fetch data from Supabase
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/students?select=RegNo,StdName,GitHubLink`,
            {
                method: "GET",

                headers: {
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Check for Supabase error
        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(
                `Supabase error: ${response.status} - ${errorText}`
            );
        }

        const students = await response.json();

        console.log("Students received:", students);

        // ========================================
        // TOTAL STUDENTS
        // ========================================

        totalStudentsElement.textContent = students.length;


        // ========================================
        // DISPLAY STUDENTS
        // ========================================

        tableBody.innerHTML = "";

        if (students.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="3">
                        No students found.
                    </td>
                </tr>
            `;

            return;
        }


        students.forEach(student => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.RegNo ?? ""}</td>

                <td>${student.StdName ?? ""}</td>

                <td>
                    ${
                        student.GitHubLink
                        ? `<a href="${student.GitHubLink}"
                              target="_blank">
                              GitHub
                           </a>`
                        : "Not Available"
                    }
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {

        console.error("Error loading students:", error);

        totalStudentsElement.textContent = "0";

        tableBody.innerHTML = `
            <tr>
                <td colspan="3">
                    Unable to load student data.
                </td>
            </tr>
        `;

        errorMessage.textContent =
            "Error: " + error.message;
    }
}


// ========================================
// START APPLICATION
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    loadStudents
);
