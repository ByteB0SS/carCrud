import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//dotenv.config({path:'../.env'})
dotenv.config()

const hash = await bcrypt.hash("rubem",10)
const token = jwt.sign({adminName: "rubem"}, process.env.JWT_SECRET)


console.log("token: " + token)
console.log("hash: ", hash)

