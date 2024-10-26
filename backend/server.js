import express from "express";
import cors from "cors";


const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Proxy')
})

app.get('/api/quotes', async (req, res) => {
    try {
        const response = await fetch('https://zenquotes.io/api/quotes/');
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log('LMAOAOAOA', error);
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})