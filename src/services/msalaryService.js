import db from "../models";

export const getMonthSalariesByEmployeeIdService = ({ employee_id }) => new Promise(async (resolve, reject) => {
    try {
        const response = employee_id ?
            await db.MonthSalary.findAll({
                where: { employee_id },
                include: [
                    {
                        model: db.Employee,
                        as: 'employee',  // Đảm bảo sử dụng alias 'employee' nếu đã được thiết lập trong model
                        attributes: ['full_name'],
                        include: [
                            {
                                model: db.Department,
                                as: 'department',
                                attributes: ['department_name']
                            },
                            {
                                model: db.Salary,
                                as: 'salary',
                                attributes: ['base_salary']
                            },
                        ]
                    }
                ]
            }) :
            await db.MonthSalary.findAll({
                include: [
                    {
                        model: db.Employee,
                        as: 'employee',
                        attributes: ['full_name'],
                        include: [
                            {
                                model: db.Department,
                                as: 'department',
                                attributes: ['department_name']
                            },
                            {
                                model: db.Salary,
                                as: 'salary',
                                attributes: ['base_salary']
                            },
                        ]
                    }
                ]
            })

        resolve({

            err: 0,
            msg: response.length ? 'Lấy dữ liệu thành công!' : `Không có dữ liệu trong bảng MonthSalary cho employee_id: ${employee_id}.`,
            data: response

        });
    } catch (error) {
        console.log(error)
        reject({
            err: 2,
            msg: 'Lỗi khi lấy dữ liệu từ bảng MonthSalary!',
            error: error.message
        });
    }
});

// them moi
export const addSalaryMonthService = ({ employee_id, month, year, deduction, total_salary, tax }) =>
    new Promise(async (resolve, reject) => {
        try {
            // Tìm hoặc tạo mới một bản ghi lương dựa trên employee_id
            const [response, created] = await db.MonthSalary.findOrCreate({
                where: { employee_id, month, year },
                defaults: {
                    employee_id, month, year, deduction, total_salary, tax
                }
            });

            resolve({
                err: created ? 0 : 2,
                msg: created ? 'Thêm lương mới thành công!' : `Lương cho ${month}/${year} của nhân viên này đã tồn tại.`,
                data: response,
            });
        } catch (error) {
            reject({
                err: 1,
                msg: 'Lỗi khi thêm lương mới!',
                error: error.message,
            });
        }
    });


// xoa
export const deleteMonthSalaryService = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            // Xóa bản ghi lương dựa trên id
            const response = await db.MonthSalary.destroy({
                where: { id },
            });

            resolve({
                err: response ? 0 : 2,
                msg: response ? 'Xóa lương thành công!' : 'Không tìm thấy lương để xóa.',
            });
        } catch (error) {
            reject({
                err: 1,
                msg: 'Lỗi khi xóa lương!',
                error: error.message,
            });
        }
    });