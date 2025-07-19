import { Router, Request, Response } from 'express'
import { loginAdmin } from '../controllers/admin.controllers.js'



const router = Router()

router.post('/', (req: Request, res: Response) => {
    loginAdmin(req, res)
})

export default router