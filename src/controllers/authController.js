import * as authService from "../services/authService"

// lấy ra tất cả phòng ban
export const getAllAccountController = async (req, res) => {
    try {
        const rs = await authService.getAllAccountsService();
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//login
export const loginController = async (req, res) => {
    const { email, pass_word } = req.body;
    try {
        if (!email || !pass_word) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào"
            })
        }

        const rs = await authService.loginService(req.body);
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//register
export const registerController = async (req, res) => {
    const { email, pass_word, type, employee_id } = req.body;
    try {
        if (!email || !pass_word || !type || !employee_id) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào"
            })
        }

        const rs = await authService.registerService(req.body);
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}