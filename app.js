const students = [
    {
        registerNo: "23XXX001",
        name: "Student 1",
        github: "https://github.com/"
    },
    {
        registerNo: "23XXX002",
        name: "Student 2",
        github: "https://github.com/"
    },
    {
        registerNo: "23XXX003",
        name: "Student 3",
        github: "https://github.com/"
    }
];


function displayStudents(data) {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    data.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.registerNo}</td>

            <td>${student.name}</td>

            <td>
                <a href="${student.github}"
                   target="_blank">
                    <button class="github-button">
                        Open GitHub
                    </button>
                </a>
            </td>

            <td>
                <span>Pending</span>
            </td>
        `;

        table.appendChild(row);

    });

    document.getElementById("totalStudents").textContent =
        data.length;

    document.getElementById("submittedStudents").textContent =
        data.length;
}


displayStudents(students);


document
    .getElementById("searchBox")
    .addEventListener("input", function () {

        const searchText =
            this.value.toLowerCase();

        const filteredStudents =
            students.filter(student =>

                student.registerNo
                    .toLowerCase()
                    .includes(searchText)

                ||

                student.name
                    .toLowerCase()
                    .includes(searchText)

            );

        displayStudents(filteredStudents);

    });
