'use strict';
var Alexa = require("alexa-sdk");
var appId = 'amzn1.ask.skill.61d7c258-1de1-48af-be3d-36797fe49007';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.dynamoDBTableName = 'BlackboardNotes';
    alexa.registerHandlers(topLevelHandlers, noteHandlers);
    alexa.execute();
};

var states = {
    NOTEMODE: '_NOTEMODE' // User has asked to add a message
};

var topLevelHandlers = {
    'LaunchRequest': function() {
        this.handler.state = '';
        var message = 
        this.emit(':ask', `Welcome to Message Board.
            I can add, read and erase messages. Say help for help!`,
            'Say help for help or stop to stop.'
        )
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(':saveState', true);
    },
    'AddNote': function() {
        console.log('AddNote', this.event.request.intent);
        var name = this.event.request.intent.slots.Name.value;
        if (!name) name = 'everyone';
        this.handler.state = states.NOTEMODE;
        this.attributes['session_name'] = name;
        var message = 'Please, record message for ' + name;
        console.log(message, arguments);
        this.emit(':askWithCard', message, message, 'Message Board', message)
    },
    'ReadNote': function() {
        console.log('ReadNote', this.event.request.intent);
        var name = this.event.request.intent.slots.Name.value;
        if (!name) name = 'anyone';
        this.handler.state = '';
        var note;
        if (this.attributes[name])
            note = 'Message for ' + name +': '  + this.attributes[name];
        else
           note = 'There is no message for ' + name;
        console.log('name:', name, 'note:', note);
        this.emit(':tellWithCard', note, 'Message Board', note)
    },
    'EraseNote': function() {
        console.log('EraseNote', this.event.request.intent);
        var name = this.event.request.intent.slots.Name.value;
        if (!name) name = 'everyone';
        this.handler.state = '';
        delete this.attributes[name];
        var message = 'Erased message for ' + name + '.'
        console.log('Erased note for name:', name);
        this.emit(':tellWithCard', message, 'Message Board', message)
    },
    'EraseAllNotes': function() {
        console.log('EraseAllNotes', this.event.request.intent);
        this.handler.state = '';
        Object.keys(this.attributes).forEach(function(key) {
            delete this.attributes[key];
        }, this);
        var message = 'Erased all messages.';
        console.log(message);
        this.emit(':tellWithCard', message, 'Message Board', message)
    },
    'ReadAllNotes': function() {
        console.log('ReadAllNotes', this.event.request.intent);
        this.handler.state = '';
        var message = 'Reading all messages:';
        Object.keys(this.attributes).forEach(function(key) {
            if (key != 'session_name' || key != 'STATE')
                message += ' Note for ' + key +': '  + this.attributes[key] + '.';
        }, this);
        console.log(message);
        this.emit(':tellWithCard', message, 'Message Board', message)
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'OK', 'OK');
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', 'OK', 'OK');
    },
    'AMAZON.HelpIntent': function() {
        var message = `Examples:
Add message for Nina.
Read message for Nina.
Erase message for Nina.
Read all messages.
Erase all messages.
`;
        this.emit(':ask', message, 'Say help to repeat or stop to stop.'
);
    },
    'Unhandled': function() {
        var message = 'I can add, read, or erase messages.';
        this.emit(':tell', message, message);
    }
};

var noteHandlers = Alexa.CreateStateHandler(states.NOTEMODE, {
    'TheNote': function() {
        console.log('attributes', this.attributes);
        var note = this.event.request.intent.slots.Note.value;
        var name = this.attributes['session_name'];
        if (!note) {
            console.log('No note')
        }
        this.handler.state = '';
        this.attributes[name] = note;
        delete this.attributes['session_name'];
        delete this.attributes['STATE'];
        var message = 'Added message for ' + name + ': ' + note;
        console.log(message);
        this.emit(':tellWithCard', message, 'Message Board', message);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'OK', 'OK');
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', 'OK', 'OK');
    },
    'Unhandled': function() {
        console.log('Unhandled', this.event.request.intent);
        var name = this.attributes['session_name'];
        var message = 'Please, add a message for ' + name;
        this.emit(':ask', message, message);
    }
});


if (require.main === module) {
    var event = {
        "session": {
            "sessionId": "SessionId.fe619694-da57-40f1-99d8-f127949561bb",
            "application": {
                "applicationId": "amzn1.ask.skill.61d7c258-1de1-48af-be3d-36797fe49007"
            },
            "attributes": {},
            "user": {
                "userId": "amzn1.ask.account.AE3ICLG2HNHNY25S25S62NNYSWCHWF5PUZILIKLEPHKKHRESLI63P23AK6GL32ZWQKV55UXQAUEIUEY2CHVSA54WQWYEPTIA73LFV6XJLXJLLPE3XMCJARTD4N5CQYOE6BIV22DVEZSJR26BWFS4ZU6DR2JQVZFFW7VNV5CGNY3G3DQVAPAHGVFBKQG5SB72QSYUZSLMFFCO2WQ"
            },
            "new": true
        },
        "request": {
            "type": "IntentRequest",
            "requestId": "EdwRequestId.7798533f-3cd9-4162-9849-b7706670bb77",
            "locale": "en-US",
            "timestamp": "2017-01-12T01:28:35Z",
            "intent": {
                "name": "EraseNote",
                "slots": {
                    "Name": {
                        "name": "Name",
                        "value": "Nina"
                    }
                }
            }
        },
        "version": "1.0"
    };

    var context = {
        fail: function() {
            console.log('fail', arguments);
        },
        succeed: function() {
            console.log('success', arguments);
        }
    };
    exports.handler(event, context, function() {
        console.log('arguments', arguments);
    });
}
