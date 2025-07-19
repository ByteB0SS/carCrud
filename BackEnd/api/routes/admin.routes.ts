import { Router, Request, Response } from 'express'
import { loginAdmin, updateCredentials, createAdmin, deleteAdmin, getAllAdmins} from '../controllers/admin.controllers.js'



const router = Router()

router.get('/', (req: Request, res: Response) => {
    getAllAdmins(req, res)
});
router.post('/', (req: Request, res: Response) => {
    loginAdmin(req, res)
})

router.put("/update/credentials", (req: Request, res: Response)=> {
    updateCredentials(req, res)
})

router.post("/new", (req: Request, res: Response)=> {
    createAdmin(req, res)
})

router.delete("/delete", (req: Request, res: Response)=> {
    deleteAdmin(req, res)
})

export default router