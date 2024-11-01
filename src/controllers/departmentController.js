import * as departmentService from "../services/departmentService"

// lấy ra tất cả phòng ban
export const getAllDepartmentController = async (req, res) => {
    try {
        const rs = await departmentService.getAllDepartmentsService();
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}