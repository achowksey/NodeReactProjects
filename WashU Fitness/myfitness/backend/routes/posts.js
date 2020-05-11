const router = require('express').Router();
let Posts = require('../models/posts.model');

router.route('/').get((req,res) => {
    Posts.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getPosts').post((req,res) => {
    const date = req.body.date;

    return Posts.find({ date : date})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));      
});

router.route('/getPostsUser').post((req,res) => {
    const username = req.body.username;

    return Posts.find({ username : username})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));      
});

router.route('/delete').post((req,res) => {
    const username = req.body.username;
    const post = req.body.post;

    Posts.deleteOne({ username : username, post: post})
        .then(result => {
            if(result) {
                res.json(true);
            } else {
                res.json(false);
            }
            return result;
        })
        .catch(err => res.status(400).json('Error: ' + err));     
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const post = req.body.username + " on " + req.body.date + ": " + req.body.post;
    const date = req.body.date;

    const newPost = new Posts({username,post,date});

    newPost.save()
        .then(result => {
            if(result) {
                res.json(true);
            } else {
                res.json(false);
            }
            return result;
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deleteAll').post((req,res) => {
    const username = req.body.username;

    Posts.deleteMany({ username : username})
        .then(result => {
            if(result) {
                res.json(true);
            } else {
                res.json(false);
            }
            return result;
        })
        .catch(err => res.status(400).json('Error: ' + err));     
});

module.exports = router;