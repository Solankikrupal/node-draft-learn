const express = require("express");
const router = express.Router();
const verifyRoles = require("../../middleware/verifyRoles");
const Role_List = require("../../config/userRoles");
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesController");

router
  .route("/")
  .get(getAllEmployees)
  .post(verifyRoles(Role_List.Admin, Role_List.Editor), createEmployee)
  .put(verifyRoles(Role_List.Admin, Role_List.Editor), updateEmployee)
  .delete(verifyRoles(Role_List.Admin), deleteEmployee);

router.route("/:userId").get(getEmployee);

module.exports = router;
