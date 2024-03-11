const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();



// connect to mongo db
var db = "mongodb://localhost:27017";
const dbURI = 'mongodb+srv://tung42:tung422005@cluster0.s0xn8td.mongodb.net/note-tuts?retryWrites=true&w=majority&appName=Cluster0 || ';
mongoose.connect(db)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
// app.listen(3000);
//register view engine
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.urlencoded({extended: true}));
// app.use(morgan('common'));
// main page
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
// about
app.get('/about', (req, res) => {
    res.render('about', { title : 'Abouttt'});
});
// blogRoutes
app.use('/blogs', blogRoutes);
// 404
app.use((req, res) => {
    res.status(404).render('404', {title: 'Error'});
    // res.status(404).sendFile('./views/404.html', {root: __dirname});
});