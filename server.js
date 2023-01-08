const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methoOverride = require('method-override');
const articleRouter = require('./routes/articles')
const Article = require('./models/articles')
const app = express();

dotenv.config();
const PORT = 5000;

mongoose.set('strictQuery', false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('connected', ()=> {
    console.log('mongodb connected')
})
mongoose.connection.on('disconnected', ()=> {
    console.log('mongodb disconnected')
})

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methoOverride('_method'))


app.get('/', async (req,res) => {
    const articles = await Article.find().sort({ createdAt : 'desc' })
    res.render('articles/index', { articles: articles})
});

//Middlewere

app.use('/articles', articleRouter);

app.listen(PORT, () => {
    connect();
    console.log(`server on port ${PORT}`)
})