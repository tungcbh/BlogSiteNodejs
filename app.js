const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


const app = express();



// connect to mongo db
const dbURI = 'mongodb+srv://tung42:tung422005@cluster0.s0xn8td.mongodb.net/note-tuts?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI) 
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
//register view engine
app.set('view engine', 'ejs');

// app.listen(3000);

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

//redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// Create - route
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog'});
});
//
// show all
app.get('/blogs', (req, res) => {
    Blog.find().sort({title: 1})
        .then((result) => {
            res.render('index', {
                title: 'All Blogs',
                blogs: result
            })
        })
        .catch((err) => {
            console.log(err);
        })
})




// mongoose and mongo sandbox routes
// CREATE
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
})

// READ by ID
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            console.log(err);
        })
})
// DELETE
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err);
        });
})




// 404
app.use((req, res) => {
    res.status(404).render('404', {title: 'Error'});
    // res.status(404).sendFile('./views/404.html', {root: __dirname});
});