const express = require('express');

const app = express();
const { middleWares } = require('./middleware/middleware');
const { dbConnect } = require('./db/mongo');
const userRoutes = require('./routes/userRoutes');
const rootRoutes = require('./routes/rootRoutes');

dbConnect();
middleWares(app);

app.use('/', rootRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => console.log('SERVER STARTTED!!!'));
