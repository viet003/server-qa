import express from "express";
import * as departmentController from "../controllers/departmentController"
import * as employeeController from "../controllers/employeeController"
import * as authController from "../controllers/authController"
import * as salaryController from "../controllers/salaryController"
import * as msalaryController from "../controllers/msalaryController"
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router()

// auth route
router.get('/account', authController.getAllAccountController)
router.post('/auth/login', authController.loginController)
router.post('/auth/register', authController.registerController)
router.post('/auth/update', authController.updateAccountController)
router.post('/auth/delete', authController.deleteAccountController)

// salary route
router.get('/salary', salaryController.getAllSalarieController)

// month salary route
router.post('/msalary', msalaryController.getMonthSalariesByEmployeeIdController)

// department route
router.get('/department', departmentController.getAllDepartmentController)
router.post('/department/create', departmentController.addDepartmentController)
router.post('/department/update', departmentController.updateDepartmentController)
router.post('/department/delete', departmentController.deleteDepartmentController)

// employee route
router.get('/employee', employeeController.getAllEmployeeController)
router.get('/employee/noac', employeeController.getAllEmployeeWithoutAccountController)
router.post('/employee/id', employeeController.getEmployeeByIdController)
router.post('/employee/create', employeeController.addEmployeeController)
router.post('/employee/update', employeeController.updateEmployeeController)
router.post('/employee/delete', employeeController.deleteEmployeeController)

export default router