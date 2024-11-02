import db from "../models";
import bcrypt from "bcryptjs";  // Nếu mật khẩu đã được mã hóa
import jwt from "jsonwebtoken"; // Để tạo token (JWT)
require('dotenv').config()

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
        reject(error);
    }
});

export const loginService = ({ email, pass_word }) => new Promise(async (resolve, reject) => {
    try {
        // Tìm account theo tên đăng nhập
        const response = await db.Account.findOne({
            where: { email },
        });

        // console.log("dfhgdf")

        const isPasswordValid = bcrypt.compareSync(pass_word, response?.pass_word);
        const token = isPasswordValid && jwt.sign(
            { id: response?.id, email: response?.email, type: response?.type },
            process.env.JWT_SECRET || "your_jwt_secret", // Đặt JWT_SECRET trong .env để bảo mật
            { expiresIn: '1h' }
        );

        // Trả về thông tin người dùng và token
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Thành công!' : response ? 'Mật khẩu không chính xác.' : "Không tìm thấy thông tin email.",
            token: token || null,
        });
    } catch (error) {
        console.log(error)
        reject(error);
    }
});


const hash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const registerService = ({ email, pass_word, type, employee_id }) => new Promise(async (resolve, reject) => {
    try {
        // Kiểm tra mã nhân viên có tồn tại hay không
        const check = await db.Employee.findOne({
            where: { id: employee_id }
        });

        if (!check) {
            return resolve({
                err: 2,
                msg: "Mã nhân viên không tồn tại!"
            });
        }

        // Tạo tài khoản mới nếu chưa tồn tại tài khoản cho employee_id
        const [account, created] = await db.Account.findOrCreate({
            where: { employee_id },
            defaults: {
                email,
                pass_word: hash(pass_word),
                employee_id,
                type
            }
        });

        // Tạo token nếu tài khoản mới được tạo thành công
        const token = created && jwt.sign(
            { id: account.id, email: account.email, type: account.type },
            process.env.SECRET_KEY || "your_jwt_secret", // Đặt SECRET_KEY trong .env để bảo mật
            { expiresIn: '1d' }
        );

        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Tạo tài khoản thành công!' : 'Nhân viên đã có tài khoản.',
            token: token || null
        });
    } catch (error) {
        reject({
            err: 1,
            msg: 'Lỗi khi tạo tài khoản!',
            error: error.message
        });
    }
});
