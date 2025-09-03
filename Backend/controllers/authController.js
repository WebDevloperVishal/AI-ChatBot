import { prismaClient } from "../outes/index.js";
import { userSchema } from "../schema/user.js";
import { compare, compareSync, hashSync } from "bcryptjs";


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
    const userData = EmailLoginSchema.parse(req.body)

    if(!userData.email || !userData.password){
        return res.status(400).json({ message: "Please fill all the feilds"});
    }

    const user = await prismaClient.user.findUnique({

        where: {
            email: userData.email
        }
    })

    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    const isPasswordMatch = await compareSync(userData.password , user.password);

    if(!isPasswordMatch){
        return res.status(401).json({ message: "User created successfully",user})
    }

    return res.status(200).json({ message: "login successfully",user})
}