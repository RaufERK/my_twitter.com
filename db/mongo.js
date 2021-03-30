const { connect } = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/test';
const mongoOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const User = require('../models/User');
const Message = require('../models/Message');

const dbConnect = async () => {
  console.log('===================>>>>');
  console.log('==========NEW START=========>>>>');
  console.log('===================>>>>');
  await connect(mongoUrl, mongoOptions);
  console.log('MONGO is CONNECTED!');
  // seeder();
};

const seeder = async () => {
  await Message.deleteMany();
  await User.deleteMany();
  const rauf = await User.create({
    name: 'rauf',
    email: 'r@r',
    password: '123',
  });
  const dima = await User.create({
    name: 'dima',
    email: 'd@d',
    password: '123',
  });
  await Message.create({
    author: rauf._id,
    text: 'j11111rjndsjkdns dskndsjndsfk',
  });
  await Message.create({
    author: rauf._id,
    text: 'jsd222222jndsjkdns dskndsjndsfk',
  });
  await Message.create({
    author: rauf._id,
    text: 'js333333dns dskndsjndsfk',
  });
  await Message.create({
    author: dima._id,
    text: 'dgsdggsdsdsfsfsfdsk',
  });
  await Message.create({
    author: dima._id,
    text: 'js3423234234234sfdsk',
  });
  await Message.create({
    author: dima._id,
    text: 'jsdnfgdgdfdgfdgfdsk',
  });
};

module.exports = {
  mongoUrl,
  dbConnect,
  Message,
  User,
};
