const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const dashRoutes = require('./routes/dashRoutes')
const authMiddleware = require('./middleware/authMiddleware')
const cookieParser = require('cookie-parser')


const app = express();
const dbURI = 'mongodb+srv://jcalarco:1775kkui@cluster0.cctlo.mongodb.net/node-js-test?retryWrites=true&w=majority'

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//     .then((result) => {
//         console.log("connected to mongodb");
//         app.listen(3000);
//     })
//     .catch((err) => { console.log(err) });

app.listen(3000);
console.log("listening")


var context;
app.set('view engine', 'ejs')
app.use('/css', express.static('./node_modules/bootstrap/dist/css'))
app.use('/js', express.static('./node_modules/bootstrap/dist/js'))
app.use('/chart_js', express.static('./node_modules/chart.js/dist'))
app.use('/chart_js_annotations', express.static('./node_modules/chartjs-plugin-annotation/dist'))


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(cookieParser())


app.get('/', (req, res) => {
    res.redirect('/signin')
})

app.use('/blogs', blogRoutes);
app.use('/dashboard', dashRoutes)
app.use('/', authRoutes)

app.use((req, res) => {
    context = {
        title: "404",

    }
    res.status(404).render('404', context)
})