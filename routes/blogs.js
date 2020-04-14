const express = require('express');
const router = express.Router();
const Blog = require('./../models/Blog');

router.get('/', (req, res) => {
	Blog.find((err, blogs) => {
		if (err) {
			console.log(err);
		} else {
			res.render('blogs', { blogs: blogs });
		}
	});
});

router.get('/new', (req, res) => {
	res.render('newBlog');
});

router.post('/', async (req, res) => {
	let blog = new Blog({
		title: req.body.title,
		description: req.body.description,
		markdown: req.body.markdown,
		created: Date()
	});
	try {
		blog = await blog.save();
		res.redirect(`/blogs/${blog.id}`);
	} catch (e) {
		console.log(e);
	}
});

router.get('/:id', (req, res) => {
	Blog.findById(req.params.id, (err, blog) => {
		if (err) {
			console.log(err);
		} else {
			res.render('single', { blog: blog });
		}
	});
});

router.get('/:id/edit', (req, res) => {
	Blog.findById(req.params.id, (err, blog) => {
		if (err) {
			console.log(err);
		} else {
			res.render('edit.ejs', { blog: blog });
		}
	});
});

router.put('/:id', (req, res) => {
	let blog = {
		title: req.body.title,
		description: req.body.description,
		markdown: req.body.markdown,
		created: Date()
	};
	Blog.findByIdAndUpdate(req.params.id, blog, (err, updatedBlog) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

router.delete('/:id', (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/blogs');
		}
	});
});

module.exports = router;
