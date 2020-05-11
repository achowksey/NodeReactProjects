const router = require('express').Router();
let FoodEntries = require('../models/foodEntries.model');

router.route('/').get((req,res) => {
    FoodEntries.find()
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addEntry').post((req,res) => {
    const username = req.body.username;
    const foodName = req.body.foodName;
    const date = req.body.date;

    const newFoodEntry = new FoodEntries({username,foodName,date});

    newFoodEntry.save()
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

router.route('/getFoodDiary').post((req,res) => {
    const username = req.body.username;
    const date = req.body.date;

    return FoodEntries.find({ date : date, username:username})
        .then(foodDiary => res.json(foodDiary))
        .catch(err => res.status(400).json('Error: ' + err));      
});

router.route('/deleteFoodDiary').post((req,res) => {
    const username = req.body.username;
    const foodName = req.body.foodName;
    const date = req.body.date;

    FoodEntries.deleteOne({ date : date, username:username, foodName: foodName})
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

    FoodEntries.deleteMany({username:username})
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