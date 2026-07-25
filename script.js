const addBtn = document.getElementById("addBtn");
const semesterContainer = document.getElementById("semesterContainer");

let semesterCount = 1;

function renumberSemesters() {

    const rows = semesterContainer.querySelectorAll(".semester-row");

    rows.forEach((row, index) => {

        const semesterInput = row.querySelector("input[type='text']");

        semesterInput.placeholder = `Semester ${index + 1}`;
    });

    semesterCount = rows.length;
}

addBtn.addEventListener("click", () => {

    semesterCount++;

    const row = document.createElement("div");

    row.classList.add("semester-row");

    row.innerHTML = `
        <input type="text" placeholder="Semester ${semesterCount}">

        <input type="number" placeholder="Credits" class="credit">

        <input type="number" placeholder="SGPA" class="sgpa">

        <button class="remove-btn">✖</button>
    `;

    semesterContainer.appendChild(row);

    renumberSemesters();
});

semesterContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("remove-btn")) {

        e.target.parentElement.remove();

        renumberSemesters();
    }
});


const calculateBtn = document.getElementById("calcBtn");
const result = document.getElementById("result");

calculateBtn.addEventListener("click", () => {

    const creditInputs = document.querySelectorAll(".credit");
    const sgpaInputs = document.querySelectorAll(".sgpa");

    let totalCredits = 0;
    let totalGradePoints = 0;

    creditInputs.forEach((creditInput, index) => {

        const credit = parseFloat(creditInput.value);
        const sgpa = parseFloat(sgpaInputs[index].value);

        if (!isNaN(credit) && !isNaN(sgpa)) {
            totalCredits += credit;
            totalGradePoints += credit * sgpa;
        }
    });

    if (totalCredits === 0) {
        result.textContent = "Please enter valid credits and SGPA.";
        return;
    }

    const cgpa = totalGradePoints / totalCredits;

    result.textContent = `Overall CGPA: ${cgpa.toFixed(2)}`;
});

const convertBtn = document.getElementById("convertBtn");
const cgpaInput = document.getElementById("cgpaInput");
const percentageResult = document.getElementById("percentageResult");

convertBtn.addEventListener("click", () => {

    const cgpa = parseFloat(cgpaInput.value);

    if (isNaN(cgpa)) {
        percentageResult.textContent = "Please enter a valid CGPA";
        return;
    }

    const percentage = cgpa * 9.5;

    percentageResult.textContent =
        `Percentage: ${percentage.toFixed(2)}%`;
});

const targetBtn = document.getElementById("targetBtn");
const targetResult = document.getElementById("targetResult");

targetBtn.addEventListener("click", () => {

    const currentCgpa = parseFloat(
        document.getElementById("currentCgpa").value
    );

    const completedCredits = parseFloat(
        document.getElementById("completedCredits").value
    );

    const nextSemCredits = parseFloat(
        document.getElementById("nextSemCredits").value
    );

    const targetCgpa = parseFloat(
        document.getElementById("targetCgpa").value
    );

    if (
        isNaN(currentCgpa) ||
        isNaN(completedCredits) ||
        isNaN(nextSemCredits) ||
        isNaN(targetCgpa)
    ) {
        targetResult.textContent =
            "Please fill all fields.";
        return;
    }

    const requiredSGPA =
        (
            (targetCgpa * (completedCredits + nextSemCredits))
            - (currentCgpa * completedCredits)
        ) / nextSemCredits;

    if (requiredSGPA > 10) {
        targetResult.textContent =
            `Required SGPA: ${requiredSGPA.toFixed(2)} (Not achievable on a 10-point scale)`;
        return;
    }

    if (requiredSGPA < 0) {
        targetResult.textContent =
            "Target already achieved.";
        return;
    }

    targetResult.textContent =
        `Required SGPA: ${requiredSGPA.toFixed(2)}`;
});