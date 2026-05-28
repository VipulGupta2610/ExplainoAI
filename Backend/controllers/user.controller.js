import user from "../schemas/user.schema.js"
import bcryptjs from "bcryptjs"


export const creating_new_user = async (req, res) => {
    try {
        const { name, email, password, isPass } = req.body;
        const alreadyUser = await user.findOne({ email })
        if (alreadyUser) {
            console.log("User already exist")
            return res.status(400).json({ message: "User already exist" })
        }

        let newUser;
        // NORMAL SIGNUP
        if (isPass === true) {
            const hashpass = await bcryptjs.hash(password, 10);
            newUser = new user({
                name,
                email,
                password: hashpass,
                isPass: true
            });
        }
        // GOOGLE SIGNUP
        else {
            newUser = new user({
                name,
                email,
                isPass: false
            });
        }
        await newUser.save();
        const sending_user = await user.findOne({ email }).select("-password")
        res.status(201).json({ message: "User created successfully", sending_user })
    } catch (error) {
        console.log("Error at signing up")
        console.log(error)
        return res.status(500).json({ message: "User not created. Ineternal Server error" })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isExist = await user.findOne({ email })
        if (!isExist) {
            console.log("User not found")
            return res.status(400).json({ message: "User not found" })
        }
        const isMactch = await bcryptjs.compare(password, isExist.password);
        if (!isMactch) {
            console.log("Wrong password")
            return res.status(500).json({ message: "Wrong password" })
        }
        const info = await user.findOne({ email }).select("-password")
        return res.status(200).json({ message: "Login successfully", info })
    } catch (error) {
        return res.status(500).json({ message: "Error at loggin in ", error })
    }
}