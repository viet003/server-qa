import * as msalaryController from "../services/msalaryService"

export const getMonthSalariesByEmployeeIdController = async (req, res) => {
    const { employee_id } = req.body;
    try {
        if( !employee_id) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào"
            })
        }

        const rs = await msalaryController.getMonthSalariesByEmployeeIdService(employee_id);
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}