import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req , res , next) => {
    try {
        const token = req.header("auth-token");

    if(!token){
        return res.set(401).json({error: "Unauthorized"});
    }

    const user = jwt.verify(token, process.env.JWT_SECRET)
    if(!user){
        return res.status(401).json({error: 'Unauthorized'})
    }
    req.user = user;
    } catch (error) {
        return res.status(401).json({error: 'Unauthorized'})
    }
    
}

// GEt user contoller 
export const GetUserContoller = async (req,res)=>{
    const id = req.user.id;

    const user = await prismaClient.user.findunique({
        where :{
            id:id
        }
    })

    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    return res.status(200).json({message:"User Retrevied Successfully",user})
}