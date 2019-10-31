const Exercice = require('../models/exercices');
const User = require('../models/users')

exports.getSecret = function (req, res) {
  return res.json({secret: 'I am a secret message'})
}

exports.getExercices = function(req, res) {
  Exercice.find({})
        .populate('category')
        .populate('approvedPeople')
        .exec((errors, exercices) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(exercices);
  });
}

exports.getExerciceById = function(req, res) {
  const {id} = req.params;

  Exercice.findById(id)
        .populate('exerciceCreator', 'name id avatar')
        .populate('category')
        .populate({path: 'approvedPeople',
           options: {limit: null, sort: {username: -1}}})
        .exec((errors, exercice) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(exercice);
  });
}


// Create Exercice
exports.createExercice = function(req, res) {
  const exerciceData = req.body;
  const user = req.user;

   const exercice = new Exercice(exerciceData);
  exercice.user = user;
  exercice.status = 'active';

   exercice.save((errors, createdExercice) => {
    if (errors) {
      return res.status(422).send({errors});
    }

     return res.json(createdExercice)
  })
}
exports.joinExercice = function (req, res) {
  const user = req.user;
  const {id} = req.params;

  Exercice.findById(id, (errors, exercice) => {
    if (errors) {
      return res.status(422).send({errors})
    }

     exercice.approvedPeople.push(user);
    exercice.approvedPeopleCount++;

     return Promise.all(
      [exercice.save(),
      User.updateOne({ _id: user.id }, { $push: { approvedExercices: exercice }})])
      .then(result => res.json({id}))
      .catch(errors => res.status(422).send({errors}))
  })
}

 exports.leaveExercice = function (req, res) {
  const user = req.user;
  const {id} = req.params;

   Promise.all(
    [Exercice.updateOne({ _id: id }, { $pull: { approvedPeople: user.id }, $inc: {approvedPeopleCount: -1}}),
     User.updateOne({ _id: user.id }, { $pull: { approvedExercices: id }})])
    .then(result => res.json({id}))
    .catch(errors => res.status(422).send({errors}))
}

exports.updateExercice = function (req, res) {
  const exerciceData = req.body
  const {id} = req.params
  const user = req.user;
  exerciceData.updatedAt = new Date()


   if (user.id === exerciceData.exerciceCreator._id) {
    Exercice.findByIdAndUpdate(id, { $set: exerciceData}, { new: true })
      .populate('exerciceCreator', 'name id avatar')
      .populate('category')
      .exec((errors, updatedExercice) => {
      if (errors) {
        return res.status(422).send({errors})
      }

       return res.json(updatedExercice)
    })
  } else {
    return res.status(401).send({errors: {message: 'Not Authorized!'}})
  }
}
 
