const { model, Schema } = require('mongoose');

const Message = model('Message', {
  picture: {
    type: String,
    default:
      'https://st4.depositphotos.com/11953928/23980/v/1600/depositphotos_239804126-stock-illustration-happy-man-head-nice-face.jpg',
  },
  created: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  text: { type: String, require: true },
  likesAuthors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likesCount: { type: Number, default: 0 },
});

module.exports = Message;
