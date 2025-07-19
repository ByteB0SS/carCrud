import { Router, Request, Response } from 'express'
import { loginAdmin, updateCredentials, createAdmin } from '../controllers/admin.controllers.js'



const router = Router()

router.post('/', (req: Request, res: Response) => {
    loginAdmin(req, res)
})

router.put("/update/credentials", (req: Request, res: Response)=> {
    updateCredentials(req, res)
})

router.post("/new", (req: Request, res: Response)=> {
    createAdmin(req, res)
})

export default router