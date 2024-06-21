import express from "express"
import { authRoute } from "./authours/auth.js"
import { dbConnection } from "./utils/config.js"
import { userRoute } from "./authours/useer.js";
import { PostRoute } from "./authours/post.js";
import cors from "cors"

const app = express()


app.use(express.json());
app.use(cors({  
    origin:'', // Replace with your frontend origin
    credentials: true,
}));
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
app.use("/user", userRoute)
app.use("/auth", authRoute )
app.use("/post", PostRoute )
dbConnection()

const port = 5000

app.listen(port ,()=>{
    console.log(`server start at ${port}`);
})