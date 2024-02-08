
import User from "../model/uder.js"

export const signupController = async (req, res) => {
try {
    const uzer = await new User({
      

    })
    await uzer.save()

} catch (error) {
    res.send("not connected");
}
  
}

export const loginController = async (req, res) => {
    try {
        const { userEmail, password } = req.body
        if (!userEmail || !password) return res.status(400).json({
            status: false,
            message: "Missing Fields"
        })

        const isUserExist = await UsersSchema.findOne({ email: userEmail })
        console.log(isUserExist, "====>>> isUserExist")
        if (isUserExist) {
            if (isUserExist.password === password) return res.status(200).json({
                status: true,
                message: "User Found"
            })

            res.status(400).json({
                status: false,
                message: "Invalid Credentials"
            })

        } else {
            res.status(400).json({
                status: false,
                message: "User Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}
export const logoutController = (req, res) => {
    res.json({
        status: true,
        message: "Logout Successfully"
    })
}
export const forgetPasswordController = (req, res) => {
    res.json({
        status: true,
        message: "forget Password Successfully"
    })
}
