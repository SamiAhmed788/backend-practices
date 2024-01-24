import express from "express"
import { authRoute } from "./authours/auth.js"


const app = express()

app.use("/auth",authRoute )


const port = 6000

app.listen(port ,()=>{
    console.log(`server start at ${port}`);
})