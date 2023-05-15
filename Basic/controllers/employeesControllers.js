const data = {};
data.employees = require("../data/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createEmployee = (req, res) => {
  res.json({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
};

const updateEmployee = (req, res) => {
  res.json({ firstName: req.body.firstName, lastName: req.body.lastName });
};

const deleteEmployee = (req, res) => {
  res.json({ userId: req.body.userId });
};

const getEmployee = (req, res) => {
  res.json({ id: req.params.id });
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
