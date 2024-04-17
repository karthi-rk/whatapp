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
    console.log(JSON.stringify(req.body.entry[0].changes))
    if (req.body.entry[0].changes[0].value.messages)
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
            "type": "interactive",

            "interactive": {
                "type": "list",
                "header": {
                    "type": "text",
                    "text": "Top Destinations"
                },
                "body": {
                    "text": "Check out these popular travel destinations!"
                },
                "footer": {
                    "text": "Book your trip today!"
                },
                "action": {
                    "button": "View Options",
                    "sections": [
                        {
                            "title": "Europe",
                            "rows": [
                                {
                                    "id": "paris",
                                    "title": "Paris, France",
                                    "description": "Explore the City"
                                },
                                {
                                    "id": "london",
                                    "title": "London, England",
                                    "description": "Experience the rich history"
                                },
                                {
                                    "id": "barcelona",
                                    "title": "Barcelona, Spain",
                                    "description": "Immerse yourself"
                                }
                            ]
                        },
                        {
                            "title": "Asia",
                            "rows": [
                                {
                                    "id": "tokyo",
                                    "title": "Tokyo, Japan",
                                    "description": "Discover"
                                },
                                {
                                    "id": "bali",
                                    "title": "Bali, Indonesia",
                                    "description": "Relax "
                                },
                                {
                                    "id": "bangkok",
                                    "title": "Bangkok, Thailand",
                                    "description": "Immerse yourself"
                                }
                            ]
                        }
                    ]
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
