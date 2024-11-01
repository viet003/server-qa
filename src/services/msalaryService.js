import db from "../models";

export const getMonthSalariesByEmployeeIdService = (employee_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.MonthSalary.findAll({
            where: { employee_id },
            include: [
                {
                    model: db.Employee,
                    as: 'employee',  // Đảm bảo sử dụng alias 'employee' nếu đã được thiết lập trong model
                    attributes: ['full_name', 'phone_number', 'address']
                }
            ]
        });

        resolve({

            err: response.length ? 0 : 2,
            msg: response.length ? 'Lấy dữ liệu thành công!' : `Không có dữ liệu trong bảng MonthSalary cho employee_id: ${employee_id}.`,
            data: response

        });
    } catch (error) {
        reject({
            err: 2,
            msg: 'Lỗi khi lấy dữ liệu từ bảng MonthSalary!',
            error: error.message
        });
    }
});
