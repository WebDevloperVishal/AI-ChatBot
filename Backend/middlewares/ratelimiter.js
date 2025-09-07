// Rate Limiter Middleware

import redis from "../services/redis.js";

export const ratelimiter = async (req, res, next) => {
    const ip = req.ip; // Get the IP address of the incoming request.

    const key = `rate:${ip}`; // Create a unique key for the IP address in Redis.

    try {
        const request = await redis.incr(key); // Increment the request count for the IP.
        if (request == 1) await redis.expire(key, 300); // Set the key to expire after 5 minutes (300 seconds) on the first request.

        if (request > 5) {
            // If the request count exceeds 5, return a 429 status code (Too Many Requests).
            return res.status(429).json({
                message: "Too many requests, try again later",
            });
        }

        next(); // If the request count is within the limit, proceed to the next middleware.
    } catch (error) {
        // If there is an error with the Redis server, return a 500 status code (Internal Server Error).
        return res.status(500).json({ message: "Redis server error" });
    }
};