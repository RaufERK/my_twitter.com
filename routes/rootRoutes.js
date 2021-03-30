const express = require('express');

const upload = require('../middleware/upload');

const router = express.Router();
const Message = require('../models/Message');

router
  .route('/')
  .get(async (req, res) => {
    const messages = await Message.find().populate({ path: 'author' });
    res.render('index', { messages });
  })
  .post(upload.single('picture'), async (req, res) => {
    await Message.create({
      picture: req.file.path.slice(6),
      text: req.body.text,
      author: res.locals.userId,
    });
    res.redirect('/');
  });

router.get('/addlike/:id', async (req, res) => {
  const message = await Message.findById(req.params.id);
  const { userId } = res.locals;
  const alreadySetLike = message.likesAuthors.includes(userId);

  if (res.locals.userId) {
    if (!alreadySetLike) {
      message.likesCount += 1;
      message.likesAuthors.push(userId);
    } else {
      message.likesCount -= 1;
      message.likesAuthors = message.likesAuthors.filter(
        (el) => String(el) !== String(userId)
      );
    }
  }
  await message.save();
  res.redirect('/');
});

module.exports = router;
