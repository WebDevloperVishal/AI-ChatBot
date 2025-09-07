

import redis from "../services/redis.js";

/**
 * Rate Limiter Middleware
 * 
 * This middleware limits the number of requests a single IP address can make within a 5-minute window.
 * It uses Redis to track the number of requests per IP and enforces a limit of 5 requests.
 * 
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
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