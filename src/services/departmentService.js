import db from "../models";

export const getAllDepartmentsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Department.findAll({
            // include: [
            //     {
            //         model: db.Employee,
            //         as: 'employees',
            //         attributes: ['full_name', 'phone_number', 'address']
            //     }
            // ]
        });

        resolve({
            err: 0,
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

// thêm mới
export const addDepartmentService = ({ department_name }) =>
    new Promise(async (resolve, reject) => {
        try {
            // Tạo mới một bản ghi department
            const response = await db.Department.create({
                department_name,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            resolve({
                err: response ? 0 : 2,
                msg: response ? 'Thêm phòng ban mới thành công!' : 'Thêm phòng ban không thành công.',
                data: response,
            });

        } catch (error) {
            reject(error);
        }
    });

// sửa
export const updateDepartmentService = ({ id, department_name }) =>
    new Promise(async (resolve, reject) => {
        try {
            // Cập nhật bản ghi department dựa trên id
            const response = await db.Department.update(
                { department_name },
                {
                    where: { id },
                }
            );

            resolve({
                err: response[0] ? 0 : 2,
                msg: response[0] ? 'Cập nhật phòng ban thành công!' : 'Không tìm thấy phòng ban để cập nhật.',
            });
        } catch (error) {
            reject(error);
        }
    });

// xóa
export const deleteDepartmentService = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            // Xóa bản ghi department dựa trên id
            const response = await db.Department.destroy({
                where: { id },
            });

            resolve({
                err: response ? 0 : 2,
                msg: response ? 'Xóa phòng ban thành công!' : 'Không tìm thấy phòng ban để xóa.',
            });
        } catch (error) {
            reject(error);
        }
    });
