const uuidV1 = require('uuid/v1');
var express = require("express");
var bodyParser = require('body-parser');
var _ = require("lodash");
var app = express();

var events = [];

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

app.get("/events", function(req, res) {
	res.send(JSON.stringify(events));
});

app.get("/event/:id", function(req, res) {
    res.send(getEventById(parseInt(req.params.id)));
});

app.put("/event", function(req, res) {
    var item = getEventById(req.body.id);
    if (item) {
        editEvent(req.body.id, req.body);
        res.send("ok");
    } else {
        res.status(400).send("record not found");
    }
});

app.delete("/event/:id", function(req, res) {
    var item = getEventById(parseInt(req.params.id));
    if (item) {
        removeEvent(parseInt(req.params.id));
        res.send("ok");
    } else {
        res.status(400).send("record not found");
    }
});

app.post("/event", function(req, res) {
    var newEvent = req.body;
    console.log(req.body);
    var item = getEventByName(newEvent.name);
    if (!item) {
        newEvent.id = getNewEventId();
        addEvent(newEvent);
        res.send(newEvent);
    } else {
        res.status(400).send("record already exists");
    }
});

var server = app.listen(3000, function(){
	console.log("server listening at : " + server.address().address + ":" + server.address().port)
});