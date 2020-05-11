const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const targetWeight = Number(req.body.targetWeight);
    const currentWeight = Number(req.body.currentWeight);
    const currentHeight = Number(req.body.currentHeight);
    const age = Number(req.body.age);
    const activityLevel = req.body.activityLevel;

    const newUser = new User({username,password,targetWeight,currentWeight,currentHeight,age,activityLevel});

    newUser.save()
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

router.route('/login').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    return User.findOne({ username : username, password: password})
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

router.route('/userExists').post((req,res) => {
    const username = req.body.username;

    return User.findOne({ username : username})
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

router.route('/getProgressInfo').post((req,res) => {
    const username = req.body.username;
    return User.findOne({ username : username}, 
        { currentWeight: 1, currentHeight: 1,targetWeight:1,age:1,activityLevel:1, _id: 0 })
        .then(progressInfo => res.json(progressInfo))
        .catch(err => res.status(400).json('Error: ' + err));      
});

router.route('/updateAL').post((req,res) => {
    const username = req.body.username;
    const aL = req.body.updateAL;

    return User.updateOne({ username : username},
        {$set: { activityLevel: aL } })
        .then(result => {res.json(true); })
        .catch(err => res.status(400).json('Error: ' + err));       
});

router.route('/updateAge').post((req,res) => {
    const username = req.body.username;
    const age = req.body.updateAge;

    return User.updateOne({ username : username},
        {$set: { age: age } })
        .then(result => {res.json(true); })
        .catch(err => res.status(400).json('Error: ' + err));       
});

router.route('/updateWeight').post((req,res) => {
    const username = req.body.username;
    const weight = req.body.updateWeight;

    return User.updateOne({ username : username},
        {$set: { currentWeight: weight } })
        .then(result => {res.json(true); })
        .catch(err => res.status(400).json('Error: ' + err));       
});

router.route('/updateHeight').post((req,res) => {
    const username = req.body.username;
    const height = req.body.updateHeight;

    return User.updateOne({ username : username},
        {$set: { currentHeight: height } })
        .then(result => {res.json(true); })
        .catch(err => res.status(400).json('Error: ' + err));       
});

router.route('/updateTargetWeight').post((req,res) => {
    const username = req.body.username;
    const weight = req.body.updateTargetWeight;

    return User.updateOne({ username : username},
        {$set: { targetWeight: weight } })
        .then(result => {res.json(true); })
        .catch(err => res.status(400).json('Error: ' + err));       
});

router.route('/updatePassword').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    return User.updateOne({ username : username},
        {$set: { password: password } })
        .then(result => {res.json(true); })
        .catch(err => res.status(400).json('Error: ' + err));       
});

router.route('/deleteUser').post((req,res) => {
    const username = req.body.username;

    return User.deleteOne({ username : username})
        .then(result => {res.json(true); })
        .catch(err => res.status(400).json('Error: ' + err));       
});
module.exports = router;