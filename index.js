const express = require('express');
const mongoose = require('mongoose');

const { ValidationError} = require('express-validation');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');


const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());


app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.use('/comments', commentRoutes);



//should only be executed to check validation error. if we dont write return in res.json in any api, then the code redirects line 22
app.use(function(err, req, res, next) {
  console.log("Error : ",err);
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }
  return res.status(500).json(err)
}) //fn which has access to res, req


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});