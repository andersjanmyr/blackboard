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

// These handlers are not bound to a state
var guessAttemptHandlers = {
    'TooHigh': function(val) {
        this.emit(':ask', val.toString() + ' is too high.', 'Try saying a smaller number.');
    },
    'TooLow': function(val) {
        this.emit(':ask', val.toString() + ' is too low.', 'Try saying a larger number.');
    },
    'JustRight': function(callback) {
        this.handler.state = states.STARTMODE;
        this.attributes['gamesPlayed']++;
        callback();
    },
    'NotANum': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }
};
