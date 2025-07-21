import { Router, Request, Response } from 'express'
import { loginAdmin, updateCredentials, getAllAdmins, createAdmin} from '../controllers/admin.controllers.js'
//import { loginAdmin, updateCredentials, deleteAdmin, getAllAdmins} from '../controllers/admin.controllers.js'
import { verifyToken, verifyWithJoi} from '../middlewares/both.middlewares.js'
import { adminSchema, updateCredentialsSchema} from '../validators/admin.validators.js'

const router = Router()

router.get('/', verifyToken, getAllAdmins)

router.post('/login',verifyWithJoi(adminSchema), loginAdmin)

router.put('/update', verifyToken, verifyWithJoi(updateCredentialsSchema), updateCredentials)

router.post('/create', verifyToken, verifyWithJoi(adminSchema), createAdmin)

export default router