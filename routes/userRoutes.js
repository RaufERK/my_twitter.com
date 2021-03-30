const { unlink, readdir } = require('fs').promises;
const express = require('express');
const path = require('path');

const router = express.Router();
const Users = require('../models/User');
const Message = require('../models/Message');
const upload = require('../middleware/upload');
// const fileName = require('../public/uploads/ahhhhhhhhh (1).gif')

router
  .route('/profile')
  .get(async (req, res) => {
    const { userId } = res.locals;
    const messages = await Message.find({ author: userId }).populate({
      path: 'author',
    });
    res.render('profile', { messages });
  })
  .post(upload.single('picture'), async (req, res) => {
    await Message.create({
      picture: req.file.path.slice(6),
      text: req.body.text,
      author: res.locals.userId,
    });
    res.redirect('/user/profile');
  });

router.get('/delete/:id', async (req, res) => {
  let result = '';
  try {
    const { id } = req.params;
    console.log(' DLETE MESSAGE ==>', id);
    const msg = await Message.findById(id);
    msg.delete();
    await Message.findByIdAndDelete(id);
    const fileDeletePAth = path.join(
      __dirname.slice(0, -7),
      'public',
      msg.picture
    );
    await unlink(fileDeletePAth);
    result = 'done successfully!';
  } catch (err) {
    console.log(err);
    result = err;
  }
  const { userId } = res.locals;
  const messages = await Message.find({ author: userId }).populate({
    path: 'author',
  });
  res.render('profile', { messages, result });
});

router
  .route('/edit/:id')
  .get(async (req, res) => {
    const message = await Message.findById(req.params.id);
    res.render('edit', { message });
  })
  .post(upload.single('picture'), async (req, res) => {
    const message = await Message.findById(req.params.id);
    const { text } = req.body;
    message.text = text;
    message.picture = req.file.path.slice(6);
    await message.save();
    res.redirect('/user/profile');
  });

router
  .route('/')
  .get((req, res) => {
    res.render('signIn');
  })
  .post(async (req, res) => {
    try {
      const { name, _id } = await Users.findOne(req.body);
      req.session.user = name;
      req.session.userId = _id;
      res.redirect('/user/profile');
      return;
    } catch (err) {
      console.log('===ERROR====>');
      console.log(err);
      res.redirect('/user');
    }
  });

router
  .route('/signUp')
  .get((req, res) => {
    res.render('signUp');
  })
  .post(async (req, res) => {
    try {
      const { name, _id } = await Users.create(req.body);
      req.session.user = name;
      req.session.userId = _id;
      return res.redirect('/');
    } catch (err) {
      console.log('=====ERRRRR====>');
      console.log(err);
      res.redirect('/user/signUp');
    }
  });

router.get('/signout', (req, res) => {
  req.session.destroy();
  res.redirect('/user');
});

module.exports = router;
