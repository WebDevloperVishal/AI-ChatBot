
import redis from "../services/redis.js";

export const ratelimiter = async(req, res, next) => {
    const ip = req.ip;

    const key = `rate:${ip}`

    try {
        const requests = await redis.incr(key);
        if(requests == 1) await redis.expire(key, 300); // 5 minutes

        if(requests>5){
            return res
              .status(429)
              .json({
                message: "Too many requests, try again later",
              });
        }

        next();

    } catch (error) {
        return res.status(500).json({
          message: "Redis error",
        });
    }
    
}