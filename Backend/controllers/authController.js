// import { prismaClient } from "../outes/index.js";
// import { userSchema, EmailLoginSchema, PhoneLoginSchema, PhoneVerifyLoginSchema } from "../schema/user.js";
// import { compareSync, hashSync } from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { SendEmail } from "../services/gmail.js";
// import redis from "../services/redis.js";
// import { BadRequestExecption } from "../exceptions/bad-request.js";
// import { ErrorCodes } from "../exceptions/root.js";
// import { NotFoundExecption } from "../exceptions/not-found.js";
// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;

// // Regester User
// // export const RegisterController = async (req, res, next) => {
// //   const userData = userSchema.parse(req.body);

// //   if (
// //     !userData.name ||
// //     !userData.email ||
// //     !userData.password ||
// //     !userData.phoneNo
// //   ) {
// //     return next (new BadRequestExecption("All fields are required",ErrorCodes.ALL_FIELDS_REQUIRED))
// //   }

// //   const hashPassword = await hashSync(userData.password, 10);

// //   const user = await prismaClient.user.create({
// //     data: {
// //       name: userData.name,
// //       email: userData.email,
// //       password: hashPassword,
// //       phoneNo: userData.phoneNo,
// //     },
// //   });

// //   return res.status(201).json({ message: "User created successfully", user });
// // };

// // Regester User
// export const RegisterController = async (req, res, next) => {
//     const userData = userSchema.parse(req.body)

//     if (!userData.name || !userData.email || !userData.password || !userData.phoneNo) {
//         return res.status(400).json({ message: "Please fill all the feilds" });
//     }

//     const hashPassword = await hashSync(userData.password, 10);

//       const user = await prismaClient.user.create({
//         data: {
//             name: userData.name,
//             email: userData.email,
//             password: hashPassword,
//             phoneNo: userData.phoneNo
//         }
//     })

//     return next (new BadRequestExecption("All fields are required",ErrorCodes))
// };

// //Login Controller
// export const LoginController = async (req, res, next) => {
//   const userData = EmailLoginSchema.parse(req.body);

//   if (!userData.email || !userData.password) {
//     return next (new BadRequestExecption("All fields are required",ErrorCodes.ALL_FIELDS_REQUIRED))
//   }

//   const user = await prismaClient.user.findUnique({
//     where: {
//       email: userData.email,
//     },
//   });

//   if (!user) {
//     return next (new NotFoundExecption("User not found",ErrorCodes.USER_NOT_FOUND))
//   }

//   const isPasswordMatch = await compareSync(userData.password, user.password);

//   if (!isPasswordMatch) {
//     return next (new BadRequestExecption("Invalid password",ErrorCodes.INVALID_PASSWORD));
//   }

//   const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
//   console.log(token);

//   return res.status(200).json({ message: "Login successfully", user, token });
// };

// //Function to generate random otp

// function Otpgenerator() {
//   const randomNumber = Math.random() * 900000;
//   const otp = Math.floor(randomNumber) + 100000;
//   return otp;
// }

// // otp-based login

// export const OTPLoginController = async (req, res,next) => {
//   const phoneNumber = PhoneLoginSchema.parse(req.body);

//   if (!phoneNumber) {
//     return next( new BadRequestExecption("phone number is required",ErrorCodes.PHONE_NUMBER_REQUIRED))
//   }

//   const phoneExists = await prismaClient.user.findUnique({
//     where: {
//       phoneNo: phoneNumber.phoneNo,
//     },
//   });

//   if (!phoneExists) {
//     return next( new NotFoundExecption("Phone number not found",ErrorCodes.USER_NOT_FOUND))
//   }

//   const otp = Otpgenerator();

//   await SendEmail({
//     to: phoneExists.email,
//     subject: "OTP Sent Platform",
//     html: `
//      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
//      <h2 style="color: #2E86C1;">Welcome to Platform!</h2>
//      <p>Thanks for signing up. To verify your account, please use the following One-Time Password(OTP):</p>
//      <p style="font-size: 20px; font-weight: bold; color: #D35400;">${otp}</p>
//      <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
//      <br />
//      <p style="font-size: 14px; color: #7F8C8D;">If you didn’t request this, you can safely ignore this email.</p>
// </div>
//     `,
//   });

//   //set otp
//   await redis.set(`otp:${phoneExists.phoneNo}`,otp,'EX',300) //5 minutes

//   const token = jwt.sign(
//     { id: phoneExists.id, phoneNo: phoneExists.phoneNo },
//     JWT_SECRET,
//     { expiresIn: "1h" }
//   );
//   return res.status(200).json({
//     message: "OTP Sent Sucessfully",
//     token,
//   });
// };


// // OYP verfiy 
// export const OTPVerifyLoginContoller = async (req, res,next) => {
//   const phoneData = PhoneVerifyLoginSchema.parse(req.body);

//   if (!phoneData.otp) {
//     return next(new BadRequestExecption("OTP is required",ErrorCodes.OTP_IS_MANDATORY))
//   }

//   const user = await prismaClient.user.findUnique({
//     where: {
//       phoneNo: req.user.phoneNo,
//     },
//   });

//   if (!user) {
//     return next(new NotFoundExecption("User not found",ErrorCodes.USER_NOT_FOUND))
//   }

//   console.log(typeof phoneData.otp);

//   const storedOtp = await redis.get(`otp:${user.phoneNo}`);

//   console.log("user",typeof(phoneData.otp))
//   console.log("storedOtp",typeof(storedOtp))

//   if (phoneData.otp !== storedOtp) {
//     return next(new BadRequestExecption("Invalid OTP",ErrorCodes.INVALID_OTP))
//   }

//   const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

//   return res.status(200).json({ message: "Login Successful", token });
// };


// // Get User
// export const GetUserController = async (req, res,next) => {
//   const id = req.user.id;

//   const user = await prismaClient.user.findUnique({
//     where: {
//       id: id,
//     },
//   });

//   if (!user) {
//     return next(new NotFoundExecption("User not found",ErrorCodes.USER_NOT_FOUND))
//   }

//   return res.status(200).json({ message: "User Retreived Sucessfully", user });
// };

// import {
//   EmailLoginSchema,
//   PhoneLoginSchema,
//   PhoneVerifyLoginSchema,
//   userSchema,
// } from "../schema/user.js";
// import { compareSync, hashSync } from "bcryptjs";
// import { prismaClient } from "../routes/index.js";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { SendEmail } from "../services/gmail.js";
// import redis from "../services/redis.js";
// import { BadRequestException } from "../exceptions/bad-request.js";
// import { ErrorCodes } from "../exceptions/root.js";
// import { NotFoundException } from "../exceptions/not-found.js";
// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;

// //Register Controller
// export const RegisterController = async (req, res, next) => {
//   const userData = userSchema.parse(req.body);

//   if (
//     !userData.name ||
//     !userData.email ||
//     !userData.password ||
//     !userData.phoneNo
//   ) {
//     return next (new BadRequestException("All fields are required",ErrorCodes.ALL_FIELDS_REQUIRED))
//   }

//   const hashPassword = await hashSync(userData.password, 10);

//   const user = await prismaClient.user.create({
//     data: {
//       name: userData.name,
//       email: userData.email,
//       password: hashPassword,
//       phoneNo: userData.phoneNo,
//     },
//   });

//   return res.status(201).json({ message: "User created successfully", user });
// };

// //Login Controller
// export const LoginController = async (req, res, next) => {
//   const userData = EmailLoginSchema.parse(req.body);

//   if (!userData.email || !userData.password) {
//     return next (new BadRequestException("All fields are required",ErrorCodes.ALL_FIELDS_REQUIRED))
//   }

//   const user = await prismaClient.user.findUnique({
//     where: {
//       email: userData.email,
//     },
//   });

//   if (!user) {
//     return next (new NotFoundException("User not found",ErrorCodes.USER_NOT_FOUND))
//   }

//   const isPasswordMatch = await compareSync(userData.password, user.password);

//   if (!isPasswordMatch) {
//     return next (new BadRequestException("Invalid password",ErrorCodes.INVALID_PASSWORD));
//   }

//   const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
//   console.log(token);

//   return res.status(200).json({ message: "Login successfully", user, token });
// };

// //Function to generate random otp

// function Otpgenerator() {
//   const randomNumber = Math.random() * 900000;
//   const otp = Math.floor(randomNumber) + 100000;
//   return otp;
// }

// //otp-based login

// export const OTPLoginController = async (req, res,next) => {
//   const phoneNumber = PhoneLoginSchema.parse(req.body);

//   if (!phoneNumber) {
//     return next( new BadRequestException("phone number is required",ErrorCodes.PHONE_NUMBER_REQUIRED))
//   }

//   const phoneExists = await prismaClient.user.findUnique({
//     where: {
//       phoneNo: phoneNumber.phoneNo,
//     },
//   });

//   if (!phoneExists) {
//     return next( new NotFoundException("Phone number not found",ErrorCodes.USER_NOT_FOUND))
//   }

//   const otp = Otpgenerator();

//   await SendEmail({
//     to: phoneExists.email,
//     subject: "OTP Sent Platform",
//     html: `
//      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
//      <h2 style="color: #2E86C1;">Welcome to Platform!</h2>
//      <p>Thanks for signing up. To verify your account, please use the following One-Time Password(OTP):</p>
//      <p style="font-size: 20px; font-weight: bold; color: #D35400;">${otp}</p>
//      <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
//      <br />
//      <p style="font-size: 14px; color: #7F8C8D;">If you didn’t request this, you can safely ignore this email.</p>
// </div>
//     `,
//   });

//   //set otp
//   await redis.set(`otp:${phoneExists.phoneNo}`,otp,'EX',300) //5 minutes

//   const token = jwt.sign(
//     { id: phoneExists.id, phoneNo: phoneExists.phoneNo },
//     JWT_SECRET,
//     { expiresIn: "1h" }
//   );
//   return res.status(200).json({
//     message: "OTP Sent Sucessfully",
//     token,
//   });
// };

// //otp verify controller

// export const OTPVerifyLoginController = async (req, res,next) => {
//   const phoneData = PhoneVerifyLoginSchema.parse(req.body);

//   if (!phoneData.otp) {
//     return next(new BadRequestException("OTP is required",ErrorCodes.OTP_IS_MANDATORY))
//   }

//   const user = await prismaClient.user.findUnique({
//     where: {
//       phoneNo: req.user.phoneNo,
//     },
//   });

//   if (!user) {
//     return next(new NotFoundException("User not found",ErrorCodes.USER_NOT_FOUND))
//   }

//   console.log(typeof phoneData.otp);

//   const storedOtp = await redis.get(`otp:${user.phoneNo}`);

//   console.log("user",typeof(phoneData.otp))
//   console.log("storedOtp",typeof(storedOtp))

//   if (phoneData.otp !== storedOtp) {
//     return next(new BadRequestException("Invalid OTP",ErrorCodes.INVALID_OTP))
//   }

//   const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

//   return res.status(200).json({ message: "Login Successful", token });
// };

// //Get User

// export const GetUserController = async (req, res,next) => {
//   const id = req.user.id;

//   const user = await prismaClient.user.findUnique({
//     where: {
//       id: id,
//     },
//   });

//   if (!user) {
//     return next(new NotFoundException("User not found",ErrorCodes.USER_NOT_FOUND))
//   }

//   return res.status(200).json({ message: "User Retreived Sucessfully", user });
// };


import {
  EmailLoginSchema,
  PhoneLoginSchema,
  PhoneVerifyLoginSchema,
  userSchema,
} from "../schema/user.js";
import { compareSync, hashSync } from "bcryptjs";
import { prismaClient } from "../routes/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { SendEmail } from "../services/gmail.js";
import redis from "../services/redis.js";
import { BadRequestException } from "../exceptions/bad-request.js";
import { ErrorCodes } from "../exceptions/root.js";
import { NotFoundException } from "../exceptions/not-found.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

//Register Controller
export const RegisterController = async (req, res, next) => {
  const userData = userSchema.parse(req.body);

  if (
    !userData.name ||
    !userData.email ||
    !userData.password ||
    !userData.phoneNo
  ) {
    return next (new BadRequestException("All fields are required",ErrorCodes.ALL_FIELDS_REQUIRED))
  }

  const hashPassword = await hashSync(userData.password, 10);

  const user = await prismaClient.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashPassword,
      phoneNo: userData.phoneNo,
    },
  });

  return res.status(201).json({ message: "User created successfully", user });
};

//Login Controller
export const LoginController = async (req, res, next) => {
  const userData = EmailLoginSchema.parse(req.body);

  if (!userData.email || !userData.password) {
    return next (new BadRequestException("All fields are required",ErrorCodes.ALL_FIELDS_REQUIRED))
  }

  const user = await prismaClient.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (!user) {
    return next (new NotFoundException("User not found",ErrorCodes.USER_NOT_FOUND))
  }

  const isPasswordMatch = await compareSync(userData.password, user.password);

  if (!isPasswordMatch) {
    return next (new BadRequestException("Invalid password",ErrorCodes.INVALID_PASSWORD));
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  console.log(token);

  return res.status(200).json({ message: "Login successfully", user, token });
};

//Function to generate random otp

function Otpgenerator() {
  const randomNumber = Math.random() * 900000;
  const otp = Math.floor(randomNumber) + 100000;
  return otp;
}

//otp-based login

export const OTPLoginController = async (req, res,next) => {
  const phoneNumber = PhoneLoginSchema.parse(req.body);

  if (!phoneNumber) {
    return next( new BadRequestException("phone number is required",ErrorCodes.PHONE_NUMBER_REQUIRED))
  }

  const phoneExists = await prismaClient.user.findUnique({
    where: {
      phoneNo: phoneNumber.phoneNo,
    },
  });

  if (!phoneExists) {
    return next( new NotFoundException("Phone number not found",ErrorCodes.USER_NOT_FOUND))
  }

  const otp = Otpgenerator();

  await SendEmail({
    to: phoneExists.email,
    subject: "OTP Sent Platform",
    html: `
     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
     <h2 style="color: #2E86C1;">Welcome to Platform!</h2>
     <p>Thanks for signing up. To verify your account, please use the following One-Time Password(OTP):</p>
     <p style="font-size: 20px; font-weight: bold; color: #D35400;">${otp}</p>
     <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
     <br />
     <p style="font-size: 14px; color: #7F8C8D;">If you didn’t request this, you can safely ignore this email.</p>
</div>
    `,
  });

  //set otp
  await redis.set(`otp:${phoneExists.phoneNo}`,otp,'EX',300) //5 minutes

  const token = jwt.sign(
    { id: phoneExists.id, phoneNo: phoneExists.phoneNo },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return res.status(200).json({
    message: "OTP Sent Sucessfully",
    token,
  });
};

//otp verify controller

export const OTPVerifyLoginController = async (req, res,next) => {
  const phoneData = PhoneVerifyLoginSchema.parse(req.body);

  if (!phoneData.otp) {
    return next(new BadRequestException("OTP is required",ErrorCodes.OTP_IS_MANDATORY))
  }

  const user = await prismaClient.user.findUnique({
    where: {
      phoneNo: req.user.phoneNo,
    },
  });

  if (!user) {
    return next(new NotFoundException("User not found",ErrorCodes.USER_NOT_FOUND))
  }

  console.log(typeof phoneData.otp);

  const storedOtp = await redis.get(`otp:${user.phoneNo}`);

  console.log("user",typeof(phoneData.otp))
  console.log("storedOtp",typeof(storedOtp))

  if (phoneData.otp !== storedOtp) {
    return next(new BadRequestException("Invalid OTP",ErrorCodes.INVALID_OTP))
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({ message: "Login Successful", token });
};

//Get User

export const GetUserController = async (req, res,next) => {
  const id = req.user.id;

  const user = await prismaClient.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return next(new NotFoundException("User not found",ErrorCodes.USER_NOT_FOUND))
  }

  return res.status(200).json({ message: "User Retreived Sucessfully", user });
};