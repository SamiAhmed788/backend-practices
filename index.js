import express from "express"
import { authRoute } from "./authours/auth.js"
import { dbConnection } from "./utils/config.js"


const app = express()

app.use("/auth", authRoute )

dbConnection()

const port = 5000

app.listen(port ,()=>{
    console.log(`server start at ${port}`);
})