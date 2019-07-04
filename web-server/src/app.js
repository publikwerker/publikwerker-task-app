const path = require('path');
const chalk = require('chalk');
const express = require('express');
const hbs = require('hbs');

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const app = express();

//sets handlebars engine and views config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// static directory to index.html
app.use(express.static(publicDirPath));

// home page
app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: 'Publikwerker'
  });
});

// about page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Publikwerker'
  });
});

// help page
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'We are here to help.',
    name: 'Publikwerker'
  });
});

// weather page
app.get('/weather', (req, res) => {
  res.send({
    location:'Portland',
    forecast:'Sunny through the day.'
  });
});

// help 404 page
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    error: 'Help article not found',
    name: 'Publikwerker'
  });
});

// 404 page
app.get('*', (req, res) => {
  res.render('404', {
    title: 'My 404 page',
    error: 'Page not found!',
    name: 'Publikwerker'
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(chalk.blue.inverse(`Server is running in port ${PORT}.`));
})