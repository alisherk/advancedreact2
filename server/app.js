const express = require('express');
const morgan = require('morgan'); 
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//app set up 
const app = express(); 
app.use(morgan('combined')); 
app.use(express.json());
app.use(cors());

//routes set up
router(app);

//mongo set up
mongoose.connect(require('./config/dev').mongoURI, { useNewUrlParser: true, useCreateIndex: true  });
const db = mongoose.connection; 
db.once('open', () => {
  console.log('db is open')
}); 

//server set up
const port = process.env.PORT || 4000; 
app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
