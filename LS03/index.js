import express from 'express';
const app = express();
app.use(express.json());

app.get('', (req, res) => {
    res.send({
        message: 'Hello MindX-er'
    });
});

app.listen(8080, () => {
    console.log('Server is running!');
});