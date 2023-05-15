const data = {
  employees: require("../data/employees.json"),
  setEmployee: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createEmployee = (req, res) => {
  //assign the data to json vars
  const newEmployee = {
    userId:
      data.employees.length !== 0
        ? data.employees[data.employees.length - 1].userId + 1
        : 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  //First name and Last name should not be empty
  if (!newEmployee.firstName || !newEmployee.lastName) {
    return res
      .status(400)
      .json({ message: "Please Provide First and Last Name" });
  }

  //checking first name avaiable in data file
  const filter = data.employees.filter(
    (emp) => emp.firstName === newEmployee.firstName
  );
  if (filter.length) {
    return res.status(400).json({ message: "First name already available" });
  }

  //adding data to json file
  data.setEmployee([...data.employees, newEmployee]);
  res.json(data.employees);
};

const updateEmployee = (req, res) => {
  //find if user Id is avaiable in database
  const employee = data.employees.find(
    (emp) => emp.userId === parseInt(req.body.userId)
  );

  //User id not avaiable in database
  if (!employee) {
    return res
      .status(400)
      .json({ message: `User ${req.body.userId} not Found` });
  }

  //if avaiable
  if (req.body.firstName) employee.firstName = req.body.firstName;
  if (req.body.lastName) employee.lastName = req.body.lastName;

  //filter out all other id
  const filterArray = data.employees.filter(
    (emp) => emp.userId !== parseInt(req.body.userId)
  );

  //create array with new update names
  const unsortArray = [...filterArray, employee];

  //set data and sort an array
  data.setEmployee(
    unsortArray.sort((a, b) =>
      a.userId > b.userId ? 1 : a.userId < b.userId ? -1 : 0
    )
  );

  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  //find if user Id is avaiable in database
  const employee = data.employees.find(
    (emp) => emp.userId === parseInt(req.body.userId)
  );

  if (!employee) {
    return res
      .status(400)
      .json({ message: `User ${req.body.userId} not Found` });
  }
  //filter out all other id
  const filterArray = data.employees.filter(
    (emp) => emp.userId !== parseInt(req.body.userId)
  );
  data.setEmployee([...filterArray]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  //find if user Id is avaiable in database
  const employee = data.employees.find(
    (emp) => emp.userId === parseInt(req.params.userId)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `User ${req.params.userId} not Found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
