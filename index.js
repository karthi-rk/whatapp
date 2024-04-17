const express = require('express');
const app = express();
const port = 8000;
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});
pet = { "918220179756": ["Max", "Julie"], "other": ["Doggy", "Puppy"] };

function getinteractive_service() {
    return {
        "messaging_product": "whatsapp",
        "to": req.body.entry[0].changes[0].value.messages[0].from,
        "type": "interactive",

        "interactive": {
            "type": "list",
            "header": {
                "type": "text",
                "text": "Please choose service"
            },
            "body": {
                "text": "You can choose only one service at a time!"
            },
            "action": {
                "button": "Choose",
                "sections": [
                    {
                        "title": "Services",
                        "rows": [
                            {
                                "id": "service-1",
                                "title": "Dog Walking",
                                "description": "Explore the City"
                            },
                            {
                                "id": "service-2",
                                "title": "Day Care",
                                "description": "Experience the rich history"
                            },
                        ]
                    },

                ]
            }
        }
    }
};
function getpetInteractiveJson(req) {

    return {
        "messaging_product": "whatsapp",
        "to": req.body.entry[0].changes[0].value.messages[0].from,
        "type": "interactive",

        "interactive": {
            "type": "list",
            "header": {
                "type": "text",
                "text": "Please choose your pet"
            },
            "body": {
                "text": "You can choose only one pet at a time"
            },
            "action": {
                "button": "Choose",
                "sections": [
                    {
                        "title": "Pet",
                        "rows": [
                            {
                                "id": "pet-1",
                                "title": "Max",
                                "description": ""
                            },
                            {
                                "id": "pet-2",
                                "title": "Puppy",
                                "description": ""
                            },
                        ]
                    },

                ]
            }
        }

    }
};
function getslotInteractiveJson() {
    return {
        "messaging_product": "whatsapp",
        "to": req.body.entry[0].changes[0].value.messages[0].from,
        "type": "interactive",

        "interactive": {
            "type": "list",
            "header": {
                "type": "text",
                "text": "Please choose your slot"
            },
            "body": {
                "text": "You can choose only one slot at a time"
            },
            "action": {
                "button": "Choose",
                "sections": [
                    {
                        "title": "Slot",
                        "rows": [
                            {
                                "id": "slot-1",
                                "title": "Morning",
                                "description": ""
                            },
                            {
                                "id": "slot-2",
                                "title": "Afternoon",
                                "description": ""
                            },
                            {
                                "id": "slot-3",
                                "title": "Evening",
                                "description": ""
                            },
                        ]
                    },

                ]
            }
        }

    }
}
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
        sendWhatsappMessage(req);
    res.send(req.query['hub.challenge']);
});
function getTemplateFromInteractiveMessage(interactive) {
    if (interactive.list_reply.id.includes("service")) {
        return getpetInteractiveJson(req);
    } else if (interactive.list_reply.id.includes("slot")) {
        return getslotInteractiveJson(req);
    }
}
function sendWhatsappMessage(req) {
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://graph.facebook.com/v18.0/291249394069250/messages',
        'headers': {
            'Authorization': 'Bearer EAAPsguiCMzMBOyVbZCFGr1TO9fEbVzp1AWvLyKQAofmBjMp9g702UOtcuUZAWZBZCv683IR9T9FneBLg5vZAkZAYpq97xhvxQA9Jw68uSy9b24yVRlPqzrHryMLbasnBfZAbgGbp2nwhZBAZCZCyHjyoDZBdoryUn2e164zYBddverujO566gs8n4FeuskYWSZCZAcMHobOyXHj9bYcckcX1ww3AZD',
            'Content-Type': 'application/json'
        },
        body: req.body.entry[0].changes[0].value.messages[0].type != "interactive" ? JSON.stringify(getinteractive_service(req)) : getTemplateFromInteractiveMessage(req.body.entry[0].changes[0].value.messages[0].interactive)

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
