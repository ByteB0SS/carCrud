import { Router, Request, Response } from 'express'
import { loginAdmin, updateCredentials } from '../controllers/admin.controllers.js'



const router = Router()

router.post('/', (req: Request, res: Response) => {
    loginAdmin(req, res)
})

router.put("/update/credentials", (req: Request, res: Response)=> {
    updateCredentials(req, res)
})

export default router