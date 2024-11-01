import db from "../models";

export const getAllDepartmentsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Department.findAll({
            include: [
                {
                    model: db.Employee,
                    as: 'employees',
                    attributes: ['full_name', 'phone_number', 'address']
                }
            ]
        });

        resolve({
            err: response.length ? 0 : 2,
            msg: response.length ? 'Lấy dữ liệu thành công!' : 'Không có dữ liệu trong bảng Department.',
            data: response
        });
    } catch (error) {
        reject({
            err: 2,
            msg: 'Lỗi khi lấy dữ liệu từ bảng Department!',
            error: error.message
        });
    }
});
