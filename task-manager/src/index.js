const app = require('./app');
const chalk = require('chalk');
const port = process.env.port

app.listen(port, ()=> {
  console.log(chalk.green.inverse(`Server is running on port ${port}`));
});