const router = require('express').Router();
let Foods = require('../models/foods.model');

router.route('/').get((req,res) => {
    Foods.find()
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const location = req.body.location;
    const calories = Number(req.body.calories);
    const totalFat = Number(req.body.totalFat);
    const cholestrol = Number(req.body.cholestrol);
    const totalCarb = Number(req.body.totalCarb);
    const dietaryFiber = Number(req.body.dietaryFiber);
    const sugar = Number(req.body.sugar);
    const protein = Number(req.body.protein);
    const username = req.body.username;

    const newFood = new Foods({name,location,calories,totalFat,cholestrol,totalCarb,dietaryFiber,sugar,protein,username});

    newFood.save()
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

router.route('/getLocationFoods').post((req,res) => {
    const location = req.body.location;
    const username = req.body.username;

    return Foods.find({ location : location, username:username})
        .then(foods => res.json(foods))
        .catch(err => res.status(400).json('Error: ' + err));      
});

router.route('/getSpecificFood').post((req,res) => {
    const location = req.body.location;
    const username = req.body.username;
    const name = req.body.name;

    return Foods.findOne({ location : location, username:username, name:name})
        .then(foods => res.json(foods))
        .catch(err => res.status(400).json('Error: ' + err));      
});

router.route('/displayFoodDiary').post((req,res) => {
    const name = req.body.array;
    
    return Foods.find({ name : name})
        .then(foods => res.json(foods))
        .catch(err => res.status(400).json('Error: ' + err));      
});

router.route('/delete').post((req,res) => {
    const location = req.body.location;
    const username = req.body.username;
    const name = req.body.name;

    return Foods.deleteOne({ location : location, username:username, name:name})
        .then(foods => res.json(foods))
        .catch(err => res.status(400).json('Error: ' + err));  
});


router.route('/deleteAll').post((req,res) => {
    const username = req.body.username;

    return Foods.deleteMany({username:username})
        .then(foods => res.json(foods))
        .catch(err => res.status(400).json('Error: ' + err));  
});


module.exports = router;