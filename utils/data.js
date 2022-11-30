const { ObjectID } = require('bson');

// seed data - data created in routes will be more robust. 
// this will serve for something to initially be able to pull and confirm that we can add seed data to the database
const userData = [
    {
        "username": 'ferdinand03',
        "email": 'chickenboi@gmail.com',
        "thoughts": [],
        "friends": [],
        "__v": 0,
    },
    {
        "username": 'Hangry23',
        "email": 'feedmepls@hotmail.com',
        "thoughts": [],
        "friends": [],
        "__v": 0,
    },
    {
        "username": 'Froufrou938',
        "email": 'JohnsBootcampCourse@ucf.edu',
        "thoughts": [],
        "friends": [],
        "__v": 0,
    },
    {
        "username": 'washbuckler23',
        "email": 'noGamesNoLyfe@aol.com',
        "thoughts": [],
        "friends": [],
        "__v": 0,
    },
    {
        "username": 'Chuckwalla',
        "email": 'yugiMotoIsThePharoah@konami.com',
        "thoughts": [],
        "friends": [],
        "__v": 0,
    },
];
const thoughtData = [
    {
        "thoughtText": "Ba da daaa daaa dummmm!",
        "username": "ferdinand03",
        "createdAt": "2022-11-30T01:38:00",
        "reactions": [
            {
                "reactionBody": "I'm lovin' it!",
                "username": "Hangry23",
                "reactionId": new ObjectID,
                "createdAt": "2022-11-30T01:38:00",
            }
        ],
    },
    {
        "thoughtText": "Have you ever just like... slept in?",
        "username": "Hangry23",
        "createdAt": "2022-11-30T01:38:00",
        "reactions": [
            {
                "reactionBody": "Sleep is for the weak!!",
                "username": "washbuckler23",
                "reactionId": new ObjectID,
                "createdAt": "2022-11-30T01:38:00",
            }
        ],
    },
    {
        "thoughtText": "I'm so hungry rn",
        "username": "Froufrou938",
        "createdAt": "2022-11-30T01:38:00",
        "reactions": [
            {
                "reactionBody": "Bruh, I'm always so hungry it makes me angry!",
                "username": "Hangry23",
                "reactionId": new ObjectID,
                "createdAt": "2022-11-30T01:38:00",
            }
        ],
    },
    {
        "thoughtText": "Do you like bananas?",
        "username": "washbuckler23",
        "createdAt": "2022-11-30T01:38:00",
        "reactions": [
            {
                "reactionBody": "I'm more of an apple person",
                "username": "ferdinand03",
                "reactionId": new ObjectID,
                "createdAt": "2022-11-30T01:38:00",
            }
        ],
    },
    {
        "thoughtText": "I'm tired. Goodnight!!",
        "username": "Chuckwalla",
        "createdAt": "2022-11-30T01:38:00",
        "reactions": [
            {
                "reactionBody": "It's 11am...",
                "username": "washbuckler23",
                "reactionId": new ObjectID,
                "createdAt": "2022-11-30T01:38:00",
            }
        ],
    },
];

module.exports = { userData, thoughtData };