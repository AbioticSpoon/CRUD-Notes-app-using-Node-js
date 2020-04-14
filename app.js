const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB_CON, () => {
	console.log('database connected');
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const blogsRouter = require('./routes/blogs');

app.use('/blogs', blogsRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.redirect('/blogs');
});

app.listen(PORT, () => {
	console.log('Server started on ' + PORT);
});
