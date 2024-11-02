import * as employeeService from "../services/emloyeeService"

// lấy ra tất cả nhân viên
export const getAllEmployeeController = async (req, res) => {
    try {
        const rs = await employeeService.getAllEmployeesService();
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// thêm mới
export const addEmployeeController = async (req, res) => {
    const { full_name, dob, gender, phone_number, address, department_id, dependent_number } = req.body;
    try {
        if (!full_name || !dob || !department_id || !gender || !phone_number || !address || !dependent_number) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu bắt buộc!"
            });
        }
        const rs = await employeeService.addEmployeeService({ full_name, dob, gender, phone_number, address, department_id, dependent_number });
        return res.status(200).json(rs);
    } catch (error) {
        return res.status(500).json(error);
    }
};


// sửa
export const updateEmployeeController = async (req, res) => {
    const { id, full_name, dob, gender, phone_number, address, department_id, dependent_number } = req.body;
    try {
        if (!id || !full_name || !dob || !department_id || !gender || !phone_number || !address || !dependent_number) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!"
            });
        }
        const rs = await employeeService.updateEmployeeService({ id, full_name, dob, gender, phone_number, address, department_id, dependent_number });
        return res.status(200).json(rs);
    } catch (error) {
        return res.status(500).json(error);
    }
};


// xóa
export const deleteEmployeeController = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu ID nhân viên!"
            });
        }
        const rs = await employeeService.deleteEmployeeService(id);
        return res.status(200).json(rs);
    } catch (error) {
        return res.status(500).json(error);
    }
};
