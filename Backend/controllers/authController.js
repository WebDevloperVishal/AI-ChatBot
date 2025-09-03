import { prismaClient } from "../outes/index.js";
import { userSchema } from "../schema/user.js";
import { hashSync } from "bcryptjs";


export const RegisterController = async(req , res) =>{
    const userData = userSchema.parse(req.body)

    if(!userData.name || !userData.email || !userData.password || !userData.phoneNo){
        return res.status(400).json({ message: "Please fill all the feilds"});
    }

    const hashPassword = await hashSync(userData.password, 10);

    const user = await prismaClient.user.create({
        data: {
            name: userData.name,
            email:userData.email,
            password: hashPassword,
            phoneNo: userData.phoneNo
        }
    })

    return res.status(201).json({ message: "User create successfully",user})
};

export const LoginController = async(req , res) =>{
    const userData = userSchema.parse(req.body)

    if(!userData.name || !userData.email || !userData.password || !userData.phoneNo){
        return res.status(400).json({ message: "Please fill all the feilds"});
    }

    const hashPassword = await hashSync(userData.password, 10);

    const user = await prismaClient.user.create({
        data: {
            name: userData.name,
            email:userData.email,
            password: hashPassword,
            phoneNo: userData.phoneNo
        }
    })

    return res.status(201).json({ message: "User create successfully",user})
}