import db from "../models";

export const getAllAccountsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Account.findAll({
            include: [
                {
                    model: db.Employee,
                    as: 'employee', // Đảm bảo sử dụng alias 'employee' nếu có
                    attributes: ['full_name', 'phone_number', 'address']
                }
            ]
        });

        resolve({
            err: response.length ? 0 : 2,
            msg: response.length ? 'Lấy dữ liệu thành công!' : 'Không có dữ liệu trong bảng Account.',
            data: response
        });
    } catch (error) {
        reject({
            err: 2,
            msg: 'Lỗi khi lấy dữ liệu từ bảng Account!',
            error: error.message
        });
    }
});
