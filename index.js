const express = require('express');
const app = express();
const port = 8000;
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

app.get('/receive-message', (req, res) => {
    console.log("sample inside the receive message")
    console.log(req.body);
    if (req.query['hub.verify_token'] === "huiiui") {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(400)
    }
});
app.post('/receive-message', (req, res) => {
    console.log(req.body)
    console.log(req.body.messages)
    console.log(req.body.field)
    sendWhatsappMessage();
    res.send(req.query['hub.challenge']);
});
function sendWhatsappMessage() {
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://graph.facebook.com/v18.0/291249394069250/messages',
        'headers': {
            'Authorization': 'Bearer EAAPsguiCMzMBOyVbZCFGr1TO9fEbVzp1AWvLyKQAofmBjMp9g702UOtcuUZAWZBZCv683IR9T9FneBLg5vZAkZAYpq97xhvxQA9Jw68uSy9b24yVRlPqzrHryMLbasnBfZAbgGbp2nwhZBAZCZCyHjyoDZBdoryUn2e164zYBddverujO566gs8n4FeuskYWSZCZAcMHobOyXHj9bYcckcX1ww3AZD',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "messaging_product": "whatsapp",
            "to": "7012823508",
            "type": "template",
            "template": {
                "name": "hello_world",
                "language": {
                    "code": "en_US"
                }
            }
        })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });

}
app.use((req, res, next) => {
    console.log(req.path)
    console.log("route not found")

});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
