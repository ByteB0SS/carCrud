import { Router, Request, Response } from 'express'
import { send } from 'process'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send("Carros")
})

export default router