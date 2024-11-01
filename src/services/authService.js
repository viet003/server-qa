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
        reject({
            err: 2,
            msg: 'Lỗi khi lấy dữ liệu từ bảng Account!',
            error: error.message
        });
    }
});

export const loginService = ({ user_name, pass_word }) => new Promise(async (resolve, reject) => {
    try {
        // Tìm account theo tên đăng nhập
        const account = await db.Account.findOne({
            where: { user_name },
        });
        
        console.log("dfhgdf")

        // Kiểm tra mật khẩu (nếu mật khẩu đã được mã hóa bằng bcrypt)
        const isPasswordValid = await bcrypt.compare(pass_word, account.pass_word);
        // Tạo token JWT (nếu muốn dùng JWT)
        const token = isPasswordValid &&  jwt.sign(
            { id: account.id, user_name: account.user_name, type: account.type },
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
        reject({
            err: 2,
            msg: 'Lỗi khi thực hiện đăng nhập!',
            error: error.message
        });
    }
});
