const User = require('../models/users');
const Exercice = require('../models/exercices');
const Thread = require('../models/threads');
const Post = require('../models/posts');
const Category = require('../models/categories');
const passport = require('passport');

exports.getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}




exports.getCurrentUser = function (req, res, next) {
  const user = req.user;

  if(!user) {
    return res.sendStatus(422);
  }
  // For session auth
  // return res.json(user);
  return res.json(user.toAuthJSON());
};




exports.register = function (req, res) {

  const registerData = req.body

  if(!registerData.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
        message: 'Email is required'
      }
    })
  }

  if(!registerData.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
        message: 'Password is required'
      }
    })
  }

  if(registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: 'is not the same as confirmation password',
        message: 'Password is not the same as Confirmation password'
      }
    })
  }

  const user = new User(registerData);

  user.save((errors, savedUser) => {
    if (errors) {
      return res.status(422).json({errors})
    }

    return res.json(savedUser)
  })
}




exports.login = function (req, res, next) {

  const { email, password } = req.body

  if(!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
        message: 'Email is required'
      }
    })
  }
  if(!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
        message: 'Password is required'
      }
    })
  }

  return passport.authenticate('local', (err, passportUser) => {
    if(err) {
      return next(err)
    }

    if(passportUser){

      //Oly for session AUth
      // req.login(passportUser, function(err) {
      //   if (err) { next(err); }

      //   return res.json(passportUser)
      // });

      return res.json(passportUser.toAuthJSON())

    } else {
      return res.status(422).send({errors: {
        'message': 'Invalid password or email !'
      }})
    }
  })(req, res, next)


  // console.log('login route activated')

  // return res.json({status: 'ok'})
}




exports.logout = function (req, res) {
  req.logout()
  return res.json({status: 'Session destroyed!'})
}

// @facet
// Processes multiple aggregation pipelines within a single stage on the same set of input documents.
// Each sub-pipeline has its own field in the output document where its results are stored as an array of documents.


 // exercices: find all of the exercices where exerciceCreator is loggedIn user
//          find only 5 exercices
//          sort exercices by newest ones

 // exercicesCount: find all of the exercices where exerciceCreator is loggedIn user
//               don't return data but count of all exercices

function fetchExercicesByUserQuery (userId) {
  return Exercice.aggregate([
    { "$facet": {
      "exercices": [
        { "$match": {"exerciceCreator": userId}},
        { "$limit": 5 },
        { "$sort": {"createdAt": -1} }
      ],
      "exercicesCount": [
        { "$match": {"exerciceCreator": userId}},
        { "$count": "count" }
      ]
    }}
  ])
  .exec()
  .then(results => {
    return new Promise((resolve, reject) => {
      Category.populate(results[0].exercices, {path: 'category'})
      .then(pExercices => {
        if (pExercices && pExercices.length > 0) {
          resolve({data: pExercices, count: results[0].exercicesCount[0].count});
        } else {
          resolve({data: results[0].exercices, count: 0})
        }
      })
    })
  })
}

 function fetchThreadsByUserQuery (userId) {
  return Thread.aggregate([
      { "$facet": {
        "threads": [
          { "$match": {"user": userId}},
          { "$limit": 5 },
          { "$sort": {"createdAt": -1} }
        ],
        "threadsCount": [
          { "$match": {"user": userId}},
          { "$count": "count" }
        ]
      }}
    ])
  .exec()
  .then(results => {
    const threads = results[0].threads;
    if (threads && threads.length > 0) {
      return {data: threads, count: results[0].threadsCount[0].count}
    }

     return {data: threads, count: 0}
  })
}

 function fetchPostByUserQuery (userId) {
  return Post.aggregate([
      { "$facet": {
        "posts": [
          { "$match": {"user": userId}},
          { "$limit": 5 },
          { "$sort": {"createdAt": -1} }
        ],
        "postsCount": [
          { "$match": {"user": userId}},
          { "$count": "count" }
        ]
      }}
    ])
  .exec()
  .then(results => {
    const posts = results[0].posts;
    if (posts && posts.length > 0) {
      return {data: results[0].posts, count: results[0].postsCount[0].count}
    }

     return {data: results[0].posts, count: 0}
   }
)}

 exports.getUserActivity = function (req, res) {
  const userId = req.user._id;

   Promise.all(
    [fetchExercicesByUserQuery(userId),
     fetchThreadsByUserQuery(userId),
     fetchPostByUserQuery(userId)
    ])
    // Writing [] to get data from the array

     .then(([exercices, threads, posts]) => res.json({exercices, threads, posts}))
    .catch(err => {
      console.log(err)
      res.status(422).send({err})
      })
}

 exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const user = req.user;

   if (user.id === userId) {
    // new: bool - true to return the modified document rather than the original. defaults to false
    User.findByIdAndUpdate(userId, { $set: userData}, { new: true }, (errors, updatedUser) => {
      if (errors) return res.status(422).send({errors});

       return res.json(updatedUser);
    });
  } else {
    return res.status(422).send({errors: 'Authorization Error!'})
  }
}
