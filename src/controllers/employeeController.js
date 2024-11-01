import * as employeeService from "../services/emloyeeService"

// lấy ra tất cả phòng ban
export const getAllEmployeeController = async (req, res) => {
    try {
        const rs = await employeeService.getAllEmployeesService();
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}