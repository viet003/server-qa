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
    const { user_name, pass_word } = req.body;
    try {
        if (!user_name || !pass_word) {
            return res.status(400).json({
                err: 1,
                msg: "Thiếu dữ liệu đầu vào"
            })
        }

        const rs = await authService.loginService({ user_name, pass_word });
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}