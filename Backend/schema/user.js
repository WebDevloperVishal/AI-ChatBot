import {z} from "zod";

export const userSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6),
    phoneNo:z.string().min(10),
});

export const EmailLoginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6),
})

export const PhoneLoginSchema = z.object({
    phoneNo:z.string().min(10),
})

export const OTPverifyLoginContoller = z.object({
    otp:z.string().min(6),
})