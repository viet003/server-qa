import * as salaryService from "../services/salaryService"

// lấy ra lương
export const getAllSalarieController = async (req, res) => {
    try {
        const rs = await salaryService.getAllSalariesService();
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}