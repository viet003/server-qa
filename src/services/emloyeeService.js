import db from "../models";

export const getAllEmployeesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Employee.findAll({
            include: [
                {
                    model: db.Department,
                    as: 'department',  // Alias của Department trong mối quan hệ với Employee
                    attributes: ['department_name']
                }
            ]
        });

        resolve({
            err: response.length ? 0 : 2,
            msg: response.length ? 'Lấy dữ liệu thành công!' : 'Không có dữ liệu trong bảng Employee.',
            data: response
        });
    } catch (error) {
        reject({
            err: 2,
            msg: 'Lỗi khi lấy dữ liệu từ bảng Employee!',
            error: error.message
        });
    }
});
