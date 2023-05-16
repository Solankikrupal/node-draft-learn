const Employee = require("../model/Employee");
const getAllEmployees = async (req, res) => {
  res.status(200).json(await Employee);
};

const createEmployee = async (req, res) => {
  //First name and Last name should not be empty
  if (!req.body.firstName || !req.body.lastName) {
    return res
      .status(400)
      .json({ message: "Please Provide First and Last Name" });
  }

  //assign the data to json vars
  const newemployee = await Employee.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  res.status(200).json(newemployee);
};

const updateEmployee = async (req, res) => {
  //find if user Id is avaiable in database
  const employee = await Employee.findOne({ _id: req.body.id });
  //User id not avaiable in database
  if (!employee) {
    return res.status(400).json({ message: `User not Found` });
  }

  //if avaiable
  if (req.body.firstName) employee.firstName = req.body.firstName;
  if (req.body.lastName) employee.lastName = req.body.lastName;
  await employee.save();
  res.status(200).json(employee);
};

const deleteEmployee = async (req, res) => {
  //find if user Id is avaiable in database
  const employee = await Employee.findOne({ _id: req.body.userId });

  if (!employee) {
    return res.status(400).json({ message: `User not Found` });
  }
  await employee.deleteOne();
  res.status(200).json(employee);
};

const getEmployee = async (req, res) => {
  //find if user Id is avaiable in database
  const employee = await Employee.findOne({ _id: req.body.userId });

  if (!employee) {
    return res.status(400).json({ message: `User not Found` });
  }
  res.status(200).json(employee);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
