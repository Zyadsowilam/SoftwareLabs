function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
let employeeForm=document.getElementById("employeeForm");
employeeForm.addEventListener("submit",(e)=>{
  // e.preventDefault();
  createEmployee();
  console.log("form submit");
});
// TODO
// add event listener to delete button
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('btn-danger')) {
    // Get the parent row of the clicked button
    const row = event.target.closest('tr');
    // Find the cell containing the employee ID
    const idCell = row.querySelector('td:first-child');
    // Extract the employee ID from the cell
    employeeIdToDelete = idCell.textContent.trim();
    // Log the ID
    console.log('Delete button clicked for employee with ID:', employeeIdToDelete);
    // Call deleteEmployee function
    deleteEmployee();
  }
});
// TODO
function createEmployee (){
  // get data from input field
  let id=document.getElementById('id').value;
  let namee=document.getElementById('name').value;
  console.log(id);
  console.log(namee);

  // send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, name: namee })
  })
  .then(response => {
    if (response.ok) {
      console.log('Employee created successfully');
     // call fetchEmployees
      fetchEmployees();
    } else {
      console.error('Failed to create employee');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });



}

// TODO
function deleteEmployee (){
  // get id
  id=employeeIdToDelete
  // send id to BE

  // call fetchEmployees
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      console.log('Employee deleted successfully');
      fetchEmployees();
    } else {
      console.error('Failed to delete employee');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

fetchEmployees()
