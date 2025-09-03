import { prismaClient } from "../outes/index.js";
import { userSchema , EmailLoginSchema} from "../schema/user.js";
import { compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


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
        return res.status(401).json({ message: " Invaid password"})
    }

    const token = jwt.sign({ id: user.id}, JWT_SECRET, {expiresIn: "1h"})
    // console.log(token);
    
    return res.status(200).json({ message: "login successfully",user,token})
}

// Get User