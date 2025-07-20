import { Router, Request, Response, NextFunction } from 'express'
import { verifyToken, verifyWithJoi } from "../middlewares/cars.middlewares.js"
import { addCar, updateCar, deleteCar, getAllCars, getById, getSelectOptions} from "../controllers/cars.controllers.js"
import vehicleSchema from '../validators/cars.validators.js'


const router = Router()

router.get('/', verifyToken, getAllCars)

router.get('/selectOptions', verifyToken, getSelectOptions)

router.get('/:id', verifyToken, getById)

router.post('/', verifyToken, verifyWithJoi(vehicleSchema), addCar)

router.put('/updateCar/:id', verifyToken, verifyWithJoi(vehicleSchema), updateCar)

router.delete('/deleteCar/:id', verifyToken, deleteCar)

export default router 