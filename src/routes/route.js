import express from "express";
import * as departmentController from "../controllers/departmentController"
import * as employeeController from "../controllers/employeeController"
import * as authController from "../controllers/authController"
import * as salaryController from "../controllers/salaryController"
import * as msalaryController from "../controllers/msalaryController"

const router = express.Router()

// auth route
router.get('/account', authController.getAllAccountController)
router.post('/login', authController.loginController)
router.post('/register', authController.registerController)

// salary route
router.get('/salary', salaryController.getAllSalarieController)

// month salary route
router.post('/msalary', msalaryController.getMonthSalariesByEmployeeIdController)

// department route
router.get('/department', departmentController.getAllDepartmentController)

// employee route
router.get('/employee', employeeController.getAllEmployeeController)

export default router