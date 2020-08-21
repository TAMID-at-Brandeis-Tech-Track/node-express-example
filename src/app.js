const express = require('express');
const mongoose = require('mongoose');
const app = express();

const DATABASE_URL = 'mongodb://localhost/test';
const PORT = 3000;

mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(`Connected to the database at: ${DATABASE_URL}`);
});

app.use(express.json());

const memberRouter = require('./routes/members');
app.use('/members', memberRouter);

app.get('/', function(req, res, next) {
    res.send("Hello world");
});

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
