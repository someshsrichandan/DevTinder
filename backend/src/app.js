const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.use(express.json());

app.post('/signup',async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
});

connectDB().then(()=>{
  console.log('Database connected');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((err)=>{
  console.log(err);
});
