const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params; 
  console.log("Delete");

  
  const index = employee.findIndex(emp => emp.id === id);
  if (index !== -1) {
    
    employee.splice(index, 1);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } else {
    
    res.status(404).json({ error: 'Employee not found' });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  console.log("Create")
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ error: 'Please provide both id and name for the employee' });
    }
    
    const isDuplicate = employee.some(emp => emp.id === id);
    if (isDuplicate) {
      return res.status(400).json({ error: 'Employee with the same ID already exists' });
    }
    
    const newEmployee = { id, name };
    employee.push(newEmployee);
    
    res.status(201).json({ message: 'Employee created successfully', data: newEmployee });
  } catch (error) {
    next(error);
  }
};
