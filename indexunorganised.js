// app.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');


const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Create a new user
//message, created by
app.post('/users', async (req, res) => {
    console.log("data", req.body);
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    
     await user.save();//db call hai, toh async behave krega
    
    res.status(201).json(user);
  } catch (err) {
    console.log("err", err);
    //koi v line try mei agar execute nahi hua toh catch()
    res.status(400).json({ message: err.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log("db", users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user
app.patch('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    if (username) user.username = username;
    if (password) user.password = password;
    if (email) user.email = email;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/post', async (req, res) => {
    try{
        const {message, createdBy} = req.body;
        const post = new Post({message, createdBy})

        await post.save();
        res.status(201).json(post);

    }
    catch(err){
        console.log("error", err);
        res.status(400).json(err)
    }
})

app.post('/post', async (req, res) => {
    try{
        // const {user} = req.body;
        const post = new Post({message, createdBy})

        await post.save();
        res.status(201).json(post);

    }
    catch(err){
        console.log("error", err);
        res.status(400).json(err)
    }
})

app.get('/post', async (req, res) => {
    try{
        const {userId} = req.query;
        const post = await Post.find({createdBy: userId});
        console.log("post data to db req", post);
        res.status(201).json({posts:post});
    }
    catch(err){
        console.log("error", err);
        res.status(400).json(err)
    }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
