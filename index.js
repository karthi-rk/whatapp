const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
var request = require('request');

app.use(express.json())
app.use(cors());
// ajith code start
var admin = require("firebase-admin")
const path = require('path');
const serviceAccount = require(path.resolve(__dirname, 'pet-care-services-484c0-firebase-adminsdk-tk80p-1e15de02ca.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)

})
app.post('/writeDataToFirestore', async (req, res) => {
    console.log("inside the function");
    console.log(req.body)
    try {
        sendSuccessMail(req.body.petData.user)
        const firestore = admin.firestore();
        const docRef = await firestore.collection("payment_collection").add({
            field1: "value1",
            field2: "value2",
        });

        res.send('Document written successfully');
    } catch (error) {
        console.log('Error writing document:', error);
        res.status(500).send('Error writing document');
    }
});
//ajith code ends
app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});
pet = { "918220179756": ["Max", "Julie"], "other": ["Doggy", "Puppy"] };
var userData = {};
function getinteractive_service(req) {
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
                                "description": "Price - 100 GBP"
                            },
                            {
                                "id": "service-2",
                                "title": "Day Care",
                                "description": "Price - 100 GBP"
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
function sendSuccessMail(to) {
    var options = {
        'method': 'POST',
        'url': 'https://graph.facebook.com/v18.0/292559467269557/messages',
        'headers': {
            'Authorization': 'Bearer EAAKPTfR5iZAkBO8cNSDQsypNL50pHfIFl0auVi8PTvS1r1xtLL4ZCielkZCFxmR5geNaxXRqB01ZCfIgxKGuaatDgiDCan2vMZAy2PYzZAxONLtYoHZBV4odDPug11tBicXFkDx1jvfkHmg1zYjlWSYjZC6ViS3ggSyJfI3GsZC2hZAlaibumMz0cyj1x4VZALncCVXHxMRUAMbIY1ZA6wViYqwaNwZDZD',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "messaging_product": "whatsapp",
            "to": to,
            "type": "text",
            "text": { "body": "Thank you for providing the data! Your booking is now confirmed, and we have received your payment. We look forward to serving you. If you have any further questions or need assistance, feel free to reach out to us. Have a wonderful day!" }
        })
    };
    console.log("start----")
    console.log(options);
    console.log("end----")
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}
function intro(req) {
    return {
        "messaging_product": "whatsapp",
        "to": req.body.entry[0].changes[0].value.messages[0].from,
        "type": "text",
        "text": { "body": "Hi,\n\nWelcome to Pet Care! 🌟 We're thrilled to assist you in booking our services. Whether you're looking to schedule a booking, we're here to make the process seamless for you.\n\nPlease select your options below.  Once you've made your selection, simply tap the \"Choose\" button next to your desired time.\n\nIf you have any questions or need further assistance, feel free to reach out to us via email support@agilecyber.com. We're here to help!" }
    }
}
function getslotInteractiveJson(req) {
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
function getTemplateFromInteractiveMessage(req, interactive) {
    if (req.body.entry[0].changes[0].value.messages[0].type != "interactive") {
        console.log("datecheck", req.body.entry[0].changes[0].value.messages[0].text.body.trim());
        console.log(detectDateFormat(req.body.entry[0].changes[0].value.messages[0].text.body.trim()))
    }
    if (interactive.list_reply.id.includes("service")) {
        userData[req.body.entry[0].changes[0].value.messages[0].from] = {}
        userData[req.body.entry[0].changes[0].value.messages[0].from]['service'] = interactive.list_reply
        return getpetInteractiveJson(req);
    } else if (interactive.list_reply.id.includes("pet")) {
        userData[req.body.entry[0].changes[0].value.messages[0].from]['pet'] = interactive.list_reply
        return getslotInteractiveJson(req);
    } else if (interactive.list_reply.id.includes("slot")) {
        userData[req.body.entry[0].changes[0].value.messages[0].from]['slot'] = interactive.list_reply
        return getdate(req);
    }
}
function paymentText(req) {
    userData[req.body.entry[0].changes[0].value.messages[0].from]['date'] = req.body.entry[0].changes[0].value.messages[0].text.body
    return paymentlink(req);
}

// Regular expression patterns to detect date formats
const datePatterns = [
    /\b\d{4}-\d{2}-\d{2}\b/,
    /\b\d{2}-\d{2}-\d{4}\b/,
    /\b\d{2}\/\d{2}\/\d{4}\b/
];

// Function to detect date format from the message text
function detectDateFormat(message) {
    for (const pattern of datePatterns) {
        if (pattern.test(message)) {
            return true;
        }
    }
    return false;
}

function getdate(req) {
    return {
        "messaging_product": "whatsapp",
        expectedReply: "date",
        "to": req.body.entry[0].changes[0].value.messages[0].from,
        "type": "text",
        "text": { "body": "Great! Now, please provide the date you would like to schedule the service in the following format: DD-MM-YYYY (e.g., 19-04-2024)." }
    }
}
function paymentlink(req) {
    userData[req.body.entry[0].changes[0].value.messages[0].from]['user'] = req.body.entry[0].changes[0].value.messages[0].from;
    return { "messaging_product": "whatsapp", "to": req.body.entry[0].changes[0].value.messages[0].from, "type": "text", "text": { "body": `Please use this link to make payment, we will reach you once we receive payment - https://dev.agilecyber.com/cktest/index.html?id=${Buffer.from((JSON.stringify(userData[req.body.entry[0].changes[0].value.messages[0].from]))).toString('base64')}` } }

    // return { "messaging_product": "whatsapp", "to": "7012823508", "type": "text", "text": { "body": `Please use this link to make payment, we will reach you once we receive payment - https://dev.agilecyber.com/cktest/index.html?id=${Buffer.from((JSON.stringify(userData))).toString('base64')}` } }
}
function sendWhatsappMessage(req) {

    if (req.body.entry[0].changes[0].value.messages[0].type != "interactive" && req.body.entry[0].changes[0].value.messages[0].text.body.toLowerCase().includes("hi") || req.body.entry[0].changes[0].value.messages[0].text.body.toLowerCase().includes("hai")) {
        var options = {
            'method': 'POST',
            'url': 'https://graph.facebook.com/v18.0/292559467269557/messages',
            'headers': {
                'Authorization': 'Bearer EAAKPTfR5iZAkBO8cNSDQsypNL50pHfIFl0auVi8PTvS1r1xtLL4ZCielkZCFxmR5geNaxXRqB01ZCfIgxKGuaatDgiDCan2vMZAy2PYzZAxONLtYoHZBV4odDPug11tBicXFkDx1jvfkHmg1zYjlWSYjZC6ViS3ggSyJfI3GsZC2hZAlaibumMz0cyj1x4VZALncCVXHxMRUAMbIY1ZA6wViYqwaNwZDZD',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(intro(req))
        };
        console.log("start----")
        console.log(options);
        console.log("end----")
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });
    }
    var options = {
        'method': 'POST',
        'url': 'https://graph.facebook.com/v18.0/292559467269557/messages',
        'headers': {
            'Authorization': 'Bearer EAAKPTfR5iZAkBO8cNSDQsypNL50pHfIFl0auVi8PTvS1r1xtLL4ZCielkZCFxmR5geNaxXRqB01ZCfIgxKGuaatDgiDCan2vMZAy2PYzZAxONLtYoHZBV4odDPug11tBicXFkDx1jvfkHmg1zYjlWSYjZC6ViS3ggSyJfI3GsZC2hZAlaibumMz0cyj1x4VZALncCVXHxMRUAMbIY1ZA6wViYqwaNwZDZD',
            'Content-Type': 'application/json'
        },
        body: req.body.entry[0].changes[0].value.messages[0].type != "interactive" && !detectDateFormat(req.body.entry[0].changes[0].value.messages[0].text.body.trim()) ? JSON.stringify(getinteractive_service(req)) : req.body.entry[0].changes[0].value.messages[0].type != "interactive" ? JSON.stringify(paymentText(req)) : JSON.stringify(getTemplateFromInteractiveMessage(req, req.body.entry[0].changes[0].value.messages[0].interactive))

    };
    console.log("start----")
    console.log(options);
    console.log("end----")
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });

}
app.use((req, res, next) => {
    console.log(req.path)
    console.log(req.method)
    console.log("route not found")

});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
