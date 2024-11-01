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