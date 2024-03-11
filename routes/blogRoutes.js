const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const router = express.Router();
const blogController = require('../controllers/blogController');


router.get('/create', blogController.blog_create_get);
// show all
router.get('/', blogController.blog_index);
// CREATE
router.post('/', blogController.blog_create_post)
// READ by ID
router.get('/:id',blogController.blog_details)
// DELETE
router.delete('/:id',blogController.blog_delete)

module.exports = router;