const uuidV1 = require('uuid/v1');
var express = require("express");
var bodyParser = require('body-parser');
var _ = require("lodash");
var webPush = require('web-push');

var app = express();

var events = [];
var notificationSubscriptions = [];

// push notification sending options
var notificationOptions = {
    // API key is req for chrome push service
    gcmAPIKey: 'AIzaSyBgK3RjfPsfLCOWauwA258B2V1u3-scthE',
    TTL: 60,
};


app.use(bodyParser());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

function getEventById(id) {
    return _.find(events, {id: id});
}

function getEventByName(name) {
    return _.find(events, {name: name});
}

function addEvent(item) {
    events.push(item);
}

function editEvent(id, item) {
    var event = getEventById(id);
    if (event) {
        _.assign(event, item);
    }
}

function getNewEventId() {
    return uuidV1();
}

function removeEvent(id) {
    events = _.reject(events, {id: id});
}

app.get("/api/events", function(req, res) {
	res.send(JSON.stringify(events));
});

app.get("/api/event/:id", function(req, res) {
    res.send(getEventById(parseInt(req.params.id)));
});

app.put("/api/event", function(req, res) {
    var item = getEventById(req.body.id);
    if (item) {
        editEvent(req.body.id, req.body);
        res.send("ok");
    } else {
        res.status(400).send("record not found");
    }
});

app.delete("/api/event/:id", function(req, res) {
    var item = getEventById(parseInt(req.params.id));
    if (item) {
        removeEvent(parseInt(req.params.id));
        res.send("ok");
    } else {
        res.status(400).send("record not found");
    }
});

app.post("/api/event", function(req, res) {
    var newEvent = req.body;
    console.log(req.body);
    var item = getEventByName(newEvent.name);
    if (!item) {
        newEvent.id = getNewEventId();
        addEvent(newEvent);
        res.send(newEvent);
        sendNotifications(newEvent);
    } else {
        res.status(400).send("record already exists");
    }
});

app.post('/api/push-subscription', function(req, res) {
    const newSubscription = req.body;
    console.log('notification subscription - ', newSubscription);
    if (
        newSubscription && 
        !notificationSubscriptions.find((subscription) => subscription.endpoint === newSubscription.endpoint)
    ) {
        console.log('pushing subscription - ');
        notificationSubscriptions.push(newSubscription);
    }
});

app.delete('/api/push-subscriptions', function(req, res) {
    console.log('deleting notification subscriptions - ');
    notificationSubscriptions.length = 0;
});

function sendNotifications(newEvent) {
    console.log('sending push notifications ...', notificationSubscriptions.length);
    var payload = newEvent.name;
        
    if (notificationSubscriptions.length) {
        notificationSubscriptions.forEach((subscription) => {
            console.log(' sending notification for ', subscription.endpoint);
            webPush.sendNotification(
                subscription,
                payload,
                notificationOptions
            );
        })
    }
}

var server = app.listen(3000, function(){
	console.log("server listening at : " + server.address().address + ":" + server.address().port)
});