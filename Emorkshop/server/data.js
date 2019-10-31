const moment = require('moment');
const mongoose = require('mongoose');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const user3Id = mongoose.Types.ObjectId();

const exercice1Id = mongoose.Types.ObjectId();
const exercice2Id = mongoose.Types.ObjectId();
const exercice3Id = mongoose.Types.ObjectId();
const exercice4Id = mongoose.Types.ObjectId();
const exercice5Id = mongoose.Types.ObjectId();
const exercice6Id = mongoose.Types.ObjectId();

const thread1Id = mongoose.Types.ObjectId();
const thread2Id = mongoose.Types.ObjectId();
const thread3Id = mongoose.Types.ObjectId();

const post1Id = mongoose.Types.ObjectId();
const post2Id = mongoose.Types.ObjectId();
const post3Id = mongoose.Types.ObjectId();
const post4Id = mongoose.Types.ObjectId();
const post5Id = mongoose.Types.ObjectId();

const category1Id = mongoose.Types.ObjectId();
const category2Id = mongoose.Types.ObjectId();
const category3Id = mongoose.Types.ObjectId();
const category4Id = mongoose.Types.ObjectId();
const category5Id = mongoose.Types.ObjectId();
const category6Id = mongoose.Types.ObjectId();

module.exports = {
  "exercices": [
     {
      "_id": exercice1Id,
      "title": "Cartographie des acteurs",
      "image": "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      "description": "Some description of this exercice. I dont know what to talk about",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "time": "30 minutes",
      "approvedPeopleCount": 1,
      "category": category1Id,
      "approvedPeople": [user2Id],
      "exerciceCreator": user1Id
    },
    {
      "_id": exercice2Id,
      "title": "Brainstorming",
      "image": "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80",
      "description": "Some description of this exercice. I dont know what to talk about",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "time": "15 minutes",
      "approvedPeopleCount": 2,
      "category": category2Id,
      "approvedPeople": [user1Id, user3Id],
      "exerciceCreator": user2Id
    },
    {
      "_id": exercice3Id,
      "title": "Crazy Eight",
      "image": "https://images.unsplash.com/photo-1546437593-3d0258c28037?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80",
      "description": "Some description of this exercice. I dont know what to talk about",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "time": "45 minutes",
      "approvedPeopleCount": 2,
      "category": category5Id,
      "approvedPeople": [user1Id, user3Id],
      "exerciceCreator": user2Id
    },
    {
      "_id": exercice4Id,
      "title": "Six to One",
      "image": "https://images.unsplash.com/photo-1485388276992-0ce5ce2d6981?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=799&q=80",
      "description": "Some description of this exercice. I dont know what to talk about",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "time": "45 minutes",
      "approvedPeopleCount": 2,
      "category": category1Id,
      "approvedPeople": [user1Id, user3Id],
      "exerciceCreator": user2Id
    },
    {
      "_id": exercice5Id,
      "title": "Vision de projet",
      "image": "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      "description": "Some description of this exercice. I dont know what to talk about",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "time": "30 minutes",
      "approvedPeopleCount": 2,
      "category": category2Id,
      "approvedPeople": [user1Id, user3Id],
      "exerciceCreator": user2Id
    },
    {
      "_id": exercice6Id,
      "title": "Historique du projet",
      "image": "https://images.unsplash.com/photo-1472173148041-00294f0814a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      "description": "Some description of this exercice. I dont know what to talk about",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "time": "30 minutes",
      "approvedPeopleCount": 2,
      "category": category3Id,
      "approvedPeople": [user1Id, user3Id],
      "exerciceCreator": user2Id
    },
  ],
  "users": [
    {
      "_id": user1Id,
      "avatar": "https://b.kisscc0.com/20180718/urw/kisscc0-ninja-computer-icons-samurai-youtube-avatar-ninja-5b4ed903c2dd20.4931332915318940197982.jpg",
      "email": "theo@gmail.com",
      "name": "Théo Geiller",
      "info": "Bla bla bla bla",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "username": "Rhonyn99",
      "password": "testtest",
      approvedExercices: [exercice2Id, exercice3Id, exercice4Id, exercice5Id, exercice6Id]
    },
    {
      "_id": user2Id,
      "avatar": "https://www.clipartmax.com/png/middle/195-1956720_%5B-img%5D-avatar.png",
      "email": "peter@gmail.com",
      "name": "John Doe",
      "info": "Bla bla bla bla",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "username": "Petergreen",
      "password": "testtest1",
      approvedExercices: [exercice1Id]
    },
    {
      "_id": user3Id,
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqyc3j2s3bL4DIkC8uC9h0rcAdsDXcwJPNh8XHWbLQfHbOpVU",
      "email": "kevin@gmail.com",
      "name": "Kevin Rock",
      "info": "I have a famous name",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "username": "Kevin21",
      "password": "testtest2",
      approvedExercices: [exercice2Id, exercice3Id, exercice4Id, exercice5Id, exercice6Id]
    }
  ],
  "threads": [
    {
      "_id": thread1Id,
      "title": "Should I take some food?",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "exercice": exercice1Id,
      "user": user1Id,
      "posts": [post1Id, post2Id]
    },
    {
      "_id": thread2Id,
      "title": "I dont know what to think about this.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "exercice": exercice2Id,
      "user": user2Id,
      "posts": [post3Id, post4Id]
    },
    {
      "_id": thread3Id,
      "title": "Here should be something about thread 3",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "exercice": exercice2Id,
      "user": user2Id,
      "posts": [post5Id]
    }
  ],
  "posts": [
    {
      "_id": post1Id,
      "text": "I will be late",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "thread": thread1Id,
      "user": user1Id
    },
    {
      "_id": post2Id,
      "text": "I like turtles",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "thread": thread1Id,
      "user": user1Id
    },
    {
      "_id": post3Id,
      "text": "I will be late",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "thread": thread2Id,
      "user": user2Id,
    },
    {
      "_id": post4Id,
      "text": "I like turtles",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "thread": thread2Id,
      "user": user2Id,
    },
    {
      "_id": post5Id,
      "text": "I like writing about nothing",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "thread": thread3Id,
      "user": user2Id,
    }
  ],
  "categories": [
    {
      "_id": category1Id,
      "name": "Discover",
      "image": "https://images.unsplash.com/photo-1498631906572-66c58d46ecf7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    {
      "_id": category2Id,
      "name": "Define",
      "image": "https://images.unsplash.com/photo-1508004680771-708b02aabdc0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    {
      "_id": category3Id,
      "name": "Ideate",
      "image": "https://images.unsplash.com/photo-1473662711507-13345f9d447c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    {
      "_id": category4Id,
      "name": "Production",
      "image": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    {
      "_id": category5Id,
      "name": "Evaluate",
      "image": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
    },
    {
      "_id": category6Id,
      "name": "Others",
      "image": "https://images.unsplash.com/photo-1513624954087-ca7109c0f710?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    }
  ]
};
