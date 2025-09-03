import express  from 'express';
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) =>{ 
    res.send('Backend is running')
})


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:3000`)
})