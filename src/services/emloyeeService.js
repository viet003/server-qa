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

// thêm mới
export const addEmployeeService = ({ full_name, dob, gender, phone_number, address, department_id, dependent_number }) =>
    new Promise(async (resolve, reject) => {
        try {
            // Tạo mới một bản ghi employee
            const response = await db.Employee.create({
                full_name,
                dob,
                gender,
                phone_number,
                address,
                department_id,
                dependent_number
            });

            resolve({
                err: response ? 0 : 2,
                msg: response ? 'Thành công!' : 'Không thành công.'
            });
        } catch (error) {
            reject(error)
        }
    });

// sửa
export const updateEmployeeService = ({ id, full_name, dob, gender, phone_number, address, department_id, dependent_number }) =>
    new Promise(async (resolve, reject) => {
        try {
            // Tìm và cập nhật bản ghi employee dựa trên id
            const response = await db.Employee.update(
                {
                    full_name,
                    dob,
                    gender,
                    phone_number,
                    address,
                    department_id,
                    dependent_number,
                },
                {
                    where: { id },
                }
            );

            resolve({
                err: response[0] ? 0 : 2,
                msg: response[0] ? 'Cập nhật thành công!' : 'Không tìm thấy nhân viên hoặc cập nhật không thành công.',
            });
        } catch (error) {
            reject(error);
        }
    });


// xóa
export const deleteEmployeeService = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            // Xóa bản ghi employee dựa trên id
            const response = await db.Employee.destroy({
                where: { id },
            });

            resolve({
                err: response ? 0 : 2,
                msg: response ? 'Xóa thành công!' : 'Không tìm thấy nhân viên để xóa.',
            });
        } catch (error) {
            reject(error);
        }
    });

