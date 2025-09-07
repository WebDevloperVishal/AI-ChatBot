// import express  from 'express';
// import dotenv from "dotenv";
// import rootRouter from './import { Router } from express ;

// // import all controllers
// // import SessionController from './app/controllers/SessionController';

// const routes = new Router();

// // Add routes
// // routes.get('/', SessionController.store);
// // routes.post('/', SessionController.store);
// // routes.put('/', SessionController.store);
// // routes.delete('/', SessionController.store);

// module.exports = routes;
// outes/index.js';

// dotenv.config()

// const app = express()
// const port = process.env.PORT;

// app.use(express.json())

// app.get('/', (req, res) =>{ 
//     res.send('Backend is running')
// })

// app.use('/api', rootRouter)

// app.listen(port, () => {
//     console.log(`Server is listening on http://localhost:5000`)
// })

import express from "express"
import dotenv from "dotenv";
import rootRouter from "./routes/index.js";
import { globalErrorHandler } from "./error-handler.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use('/api',rootRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});