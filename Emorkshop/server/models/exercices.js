const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciceSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  shortInfo: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  time: { type: String, required: true },
  approvedPeopleCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  exerciceCreator: { type: Schema.Types.ObjectId, ref: 'User' },
  approvedPeople: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Exercice', exerciceSchema );
