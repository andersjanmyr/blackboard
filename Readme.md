# Message Board

An Amazon Echo skill that adds, reads and erases named messages.

## Example Sessions

### Add a message

* - Alexa, tell message board to add message for Nina
* -> Please, record message for Nina
* - Please, walk the dog when you come home from school.
* -> Added message for Nina: Please, walk the dogs when you come home from school.

### Read a message

* - Alexa, tell message board to read message for Nina
* -> Message for Nina: Please, walk the dogs when you come home from school.

### Add another message

* - Alexa, tell message board to add message for Rasmus
* -> Please, record message for Nina
* Please, walk the dogs when you come home from school.
* -> Added message for Rasmus: Please, walk the dogs when you come home from school.

### Read all messages

* - Alexa, tell message board to read all messages
* -> Reading all messages:
     Message for Nina: Please, walk the dogs when you come home from school.
     Message for Rasmus: Please, take out the trash and do your homework.

### Erase a message

* - Alexa, tell message board to erase message for Nina
* -> Erased message for Nina

### Erase all messages

* - Alexa, tell message board to erase all messages.
* -> Erased all messages.

## Available intents

```
Alexa, tell message board to add note for {Name}
Alexa, tell message board add note for {Name}
Alexa, tell message board to save note for {Name}
Alexa, tell message board save note for {Name}
Alexa, tell message board to add message for {Name}
Alexa, tell message board add message for {Name}
Alexa, tell message board to save message for {Name}
Alexa, tell message board save message for {Name}
Alexa, tell message board to erase note for {Name}
Alexa, tell message board erase note for {Name}
Alexa, tell message board to delete note for {Name}
Alexa, tell message board delete note for {Name}
Alexa, tell message board to erase message for {Name}
Alexa, tell message board erase message for {Name}
Alexa, tell message board to delete message for {Name}
Alexa, tell message board delete message for {Name}
Alexa, tell message board to read note for {Name}
Alexa, tell message board read note for {Name}
Alexa, tell message board to get note for {Name}
Alexa, tell message board get note for {Name}
Alexa, tell message board to read message for {Name}
Alexa, tell message board read message for {Name}
Alexa, tell message board to get message for {Name}
Alexa, tell message board get message for {Name}
Alexa, tell message board to erase all notes
Alexa, tell message board to delete all notes
Alexa, tell message board to erase all messages
Alexa, tell message board to delete all messages
Alexa, tell message board erase all notes
Alexa, tell message board delete all notes
Alexa, tell message board erase all messages
Alexa, tell message board delete all messages
Alexa, tell message board to read all notes
Alexa, tell message board to get all notes
Alexa, tell message board to read all messages
Alexa, tell message board to get all messages
Alexa, tell message board read all notes
Alexa, tell message board get all notes
Alexa, tell message board read all messages
Alexa, tell message board get all messages
```
