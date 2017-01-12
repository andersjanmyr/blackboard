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
    NOTEMODE: '_NOTEMODE' // User has asked to add a note
};

var topLevelHandlers = {
    'LaunchRequest': function() {
        this.handler.state = '';
        this.emit(':ask', 'Welcome to Blackboard. Would you like me to add, read, or '
            + 'erase a note?')
    },
    'AMAZON.HelpIntent': function() {
        var message = 'I can add, read, or erase a note. What would you like to do?';
        this.emit(':ask', message, message);
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(':saveState', true);
    },
    'AddIntent': function(name) {
        if (!name) name = 'everyone';
        this.handler.state = state.NOTEMODE;
        var message = 'Record note for ' + name;
        this.emit(':ask', message, message)
    },
    'ReadIntent': function(name) {
        if (!name) name = 'everyone';
        this.handler.state = '';
        var note;
        if (this.attributes[name])
            note = 'Note for ' + name +': '  + this.attributes[name];
        else
           note = 'There is no note for ' + name;
        console.log('name:', name, 'note:', note);
        this.emit(':tellWithCard', note, 'Blackboard', note)
    },
    'EraseIntent': function(name) {
        if (!name) name = 'everyone';
        this.handler.state = '';
        delete this.attributes[name];
        console.log('deleted note for name:', name);
    },
    'Unhandled': function() {
        var message = 'I can add, read, or erase a note. What would you like to do?';
        this.emit(':ask', message, message);
    }
};

var noteHandlers = Alexa.CreateStateHandler(states.NOTE, {
    'NoteIntent': function(note) {
        if (!note) {
            console.log('No note')
        }
        this.handler.state = '';
        this.attributes[name] = note;
        console.log('added note for name:', name, note);
    },
    'Unhandled': function() {
        var message = 'This could not possibly happen';
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
