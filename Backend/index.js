import express  from 'express';
import dotenv from "dotenv";
import rootRouter from './outes/index.js';

dotenv.config()

const app = express()
const port = process.env.PORT;

app.use(express.json())

app.get('/', (req, res) =>{ 
    res.send('Backend is running')
})

app.use('/api', rootRouter)


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:3000`)
})