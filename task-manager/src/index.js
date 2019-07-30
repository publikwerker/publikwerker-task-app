const express = require('express');
require('./db/mongoose');
const chalk = require('chalk');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');
const upload = multer({
  dest: 'images'
})
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=> {
  console.log(chalk.green.inverse(`Server is running on port ${port}`));
});