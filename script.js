document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;
    const employeeForm = document.getElementById('employee-form');
    const employeeList = document.getElementById('employee-list');

    employeeForm.addEventListener('submit', addEmployee);

    function addEmployee(e) {
        e.preventDefault();

        const name = document.getElementById('employee-name').value;
        const qualifications = document.getElementById('employee-qualifications').value;
        const age = document.getElementById('employee-age').value;
        const experience = document.getElementById('employee-experience').value;
        const degree = document.getElementById('employee-degree').value;
        const previousWork = document.getElementById('employee-previous-work').checked ? "Yes" : "No";

        const employeeItem = document.createElement('li');
        employeeItem.innerHTML = `
            <span>${name} - ${qualifications} - ${age} - ${experience} - ${degree} - Previous Work: ${previousWork}</span>
            <button class="delete-btn">Delete</button>
        `;

        employeeList.appendChild(employeeItem);

        generatePDF(name, qualifications, age, experience, degree, previousWork);

        document.getElementById('employee-name').value = '';
        document.getElementById('employee-qualifications').value = '';
        document.getElementById('employee-age').value = '';
        document.getElementById('employee-experience').value = '';
        document.getElementById('employee-degree').value = '';
        document.getElementById('employee-previous-work').checked = false;

        const deleteBtns = document.querySelectorAll('.delete-btn');
        deleteBtns.forEach(btn => btn.addEventListener('click', deleteEmployee));
    }

    function deleteEmployee(e) {
        const employeeItem = e.target.parentElement;
        employeeList.removeChild(employeeItem);
    }

    function generatePDF(name, qualifications, age, experience, degree, previousWork) {
        const doc = new jsPDF();
        doc.text(`Employee Name: ${name}`, 10, 10);
        doc.text(`Qualifications: ${qualifications}`, 10, 20);
        doc.text(`Age: ${age}`, 10, 30);
        doc.text(`Years of Experience: ${experience}`, 10, 40);
        doc.text(`Academic Degree: ${degree}`, 10, 50);
        doc.text(`Previous Work Experience: ${previousWork}`, 10, 60);
        doc.save(`${name}_employee_details.pdf`);
    }
});
