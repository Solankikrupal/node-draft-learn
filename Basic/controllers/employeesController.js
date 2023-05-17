const Employee = require("../model/Employee");
const getAllEmployees = async (req, res) => {
  const employee = await Employee.find();
  if (!employee) res.status(204).json({ message: "No Employee Found" });
  res.status(200).json({ employee: employee });
};

const createEmployee = async (req, res) => {
  //First name and Last name should not be empty
  if (!req.body.firstName || !req.body.lastName) {
    return res
      .status(400)
      .json({ message: "Please Provide First and Last Name" });
  }

  try {
    //assign the data to json vars
    const newemployee = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.status(201).json(newemployee);
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: `user id not available` });
  }
  //find if user Id is avaiable in database
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  //User id not avaiable in database
  if (!employee) {
    return res.status(400).json({ message: `User not Found` });
  }

  //if avaiable
  if (req.body?.firstName) employee.firstName = req.body.firstName;
  if (req.body?.lastName) employee.lastName = req.body.lastName;
  await employee.save();
  res.status(200).json(employee);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.userId) {
    return res.status(400).json({ message: `user id not available` });
  }
  //find if user Id is avaiable in database
  const employee = await Employee.findOne({ _id: req.body.userId }).exec();

  if (!employee) {
    return res.status(400).json({ message: `User not Found` });
  }
  await employee.deleteOne({ _id: req.body.userId });
  res.status(200).json(employee);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.userId) {
    return res.status(400).json({ message: `user id not available` });
  }
  //find if user Id is avaiable in database
  const employee = await Employee.findOne({ _id: req.params.userId }).exec();

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
