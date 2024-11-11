import * as msalaryService from "../services/msalaryService"

// lấy ra toàn bộ lương theo tháng
export const getMonthSalariesByEmployeeIdController = async (req, res) => {
    const { employee_id } = req.body;
    try {
        if( !employee_id) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào"
            })
        }

        const rs = await msalaryService.getMonthSalariesByEmployeeIdService(employee_id);
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// thêm mới 
export const addMonthSalaryController = async (req, res) => {
    const { employee_id, month, year, deduction, total_salary, tax } = req.body;
    try {
        if (!employee_id || !month || !year || !deduction || !total_salary || !tax ) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào!",
            });
        }
        const rs = await msalaryService.addSalaryMonthService(req.body);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};
