const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

app.post('/receive-message', (req, res) => {
    console.log("sample inside the receive message")
    console.log(req.body);
    res.json({ "success": true });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
