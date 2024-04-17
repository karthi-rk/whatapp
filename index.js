const express = require('express');
const app = express();
const port = 8000;
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

app.post('/receive-message', (req, res) => {
    console.log("sample inside the receive message")
    console.log(req.body);
    res.send("huiiui");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
