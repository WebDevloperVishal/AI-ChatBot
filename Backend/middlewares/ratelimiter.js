import redis from "../services/redis.js";

export const ratelimiter = async (req,res,next) => {
    const ip = req.ip;

    const key = `rate:${ip}`

    try {
        const request = await redis.incr(key);
        if (request == 1) await redis.expire(key,300);

        if (request>5){
            return res.status(429).json({
                message: "To much request, try again afterwords",
            }); 
        }

        next();
    } catch (error) {
        return res.status(500).json({message:"Redis server error"})
    }
}