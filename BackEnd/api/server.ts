import express from 'express'
import carRoutes from './routes/cars.routes.js'
import adminRoutes from "./routes/admin.routes.js"

const server = express()
server.use(express.json())
server.use("/api/cars", carRoutes)
server.use("/api/admin", adminRoutes)  

const port: number = 3833

server.listen(port, () => console.log(`running server on http://localhost:${port}`))

