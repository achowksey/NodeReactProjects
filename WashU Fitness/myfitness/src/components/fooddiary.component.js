import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class FoodDiary extends Component {
    constructor(props){
        super(props);
        this.username = props.username;
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onGetDiarySubmit = this.onGetDiarySubmit.bind(this);
        this.onChooseFood = this.onChooseFood.bind(this);
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.updatePage = this.updatePage.bind(this);

        this.state = {
            loaded: false,
            entryDate: new Date(),
            foodNameArray: [],
            calories: [],
            totalCalories: 0,
            totalFat: 0,
            cholestrol: 0,
            totalCarb: 0,
            dietaryFiber: 0,
            sugar: 0,
            protein: 0,
            namesDisplay: "",
        };
    }

    onChangeDate = date => {
        this.setState({
            entryDate: date
        });
    };

    onChooseFood(e){
        this.setState({
            deleteFood: e.target.value
        });
    }


    updatePage(){
        let diary = {
            username: this.username,
            date: this.state.entryDate.getFullYear() + "-" + this.state.entryDate.getMonth() + "-" + this.state.entryDate.getDate() 
        }
        this.setState({
            foodNameArray: [],
            calories: [],
            totalCalories: 0,
            totalFat: 0,
            cholestrol: 0,
            totalCarb: 0,
            dietaryFiber: 0,
            sugar: 0,
            protein: 0,
            namesDisplay: "",
        });
        axios.post('http://localhost:5000/foodEntries/getFoodDiary', diary)
            .then(res => {
                console.log(res.data);
                if(res.data.length > 0){
                    this.setState({
                        foodNameArray: res.data.map(foodEntries => foodEntries.foodName),
                    })
                    for(let i = 0; i < this.state.foodNameArray.length; ++i){
                        
                        let names = {
                            array: this.state.foodNameArray[i]
                        }
                        axios.post('http://localhost:5000/foods/displayFoodDiary', names)
                            .then(res => {
                                this.state.calories.push(res.data[0].calories);
                                this.setState({
                                    namesDisplay: this.state.namesDisplay + this.state.foodNameArray[i] + ", ",
                                    totalCalories: this.state.totalCalories + res.data[0].calories,
                                    totalFat: this.state.totalFat + res.data[0].totalFat,
                                    cholestrol: this.state.cholestrol + res.data[0].cholestrol,
                                    totalCarb: this.state.totalCarb + res.data[0].totalCarb,
                                    dietaryFiber: this.state.dietaryFiber + res.data[0].dietaryFiber,
                                    sugar: this.state.sugar + res.data[0].sugar,
                                    protein: this.state.protein + res.data[0].protein,
                                })
                                if(this.state.calories.length === this.state.foodNameArray.length){
                                    this.state.foodNameArray.unshift("Please Select an Item");
                                    this.setState({
                                        namesDisplay: this.state.namesDisplay.substring(0, this.state.namesDisplay.length-2),
                                        loaded: true,
                                    });
                                }
                            }
                        ); 
                    }
                }
                else{
                    this.setState({
                        loaded: false,
                    });
                    alert("No food entries from this day");
                }
            }
        );   
    }

    onGetDiarySubmit(e){
        e.preventDefault();
        this.updatePage();
    }

    onDeleteSubmit(e){
        e.preventDefault();
        this.setState({
            loaded: false
        });
        let deleteFoodSend = {
            username: this.username,
            date: this.state.entryDate.getFullYear() + "-" + this.state.entryDate.getMonth() + "-" + this.state.entryDate.getDate(),
            foodName: this.state.deleteFood
        }
        if(deleteFoodSend.foodName !== undefined && deleteFoodSend.foodName.localeCompare("Please Select an Item") !== 0){
            axios.post('http://localhost:5000/foodEntries/deleteFoodDiary', deleteFoodSend)
            .then(res => {
                this.updatePage();
                if (res.data){
                    alert("Food Deleted!");
                }
            });   
        }
        else{
            alert("Please Pick a Valid Food");
            this.setState({
                loaded: true
            });
        }
    }

    content(){
        return(
            <div>
                <div className="container">
                        <div className="card">
                            <div className="card-header text-white bg-secondary mb-3">
                                Food Diary for {this.state.entryDate.getFullYear() + "-" + (this.state.entryDate.getMonth()+1) + "-" + this.state.entryDate.getDate()}
                            </div>
                            <ul className="list-group list-group-flush">
                            <li className="list-group-item">Foods: {this.state.namesDisplay}</li>
                                <li className="list-group-item">Total Calories: {this.state.totalCalories.toFixed(2)}</li>
                                <li className="list-group-item">Total Fat: {this.state.totalFat.toFixed(2)}g</li>
                                <li className="list-group-item">Total Sugar: {this.state.sugar.toFixed(2)}g</li>
                                <li className="list-group-item">Total Carbohydrates: {this.state.totalCarb.toFixed(2)}g</li>
                                <li className="list-group-item">Total Protein: {this.state.protein.toFixed(2)}g</li>
                                <li className="list-group-item">Total Cholestrol: {this.state.cholestrol.toFixed(2)}mg</li>
                                <li className="list-group-item">Total Dietary Fiber: {this.state.dietaryFiber.toFixed(2)}g</li>
                            </ul>
                    </div>
                </div>

                <br></br>
                <div className="container">
                    <form onSubmit={this.onDeleteSubmit}>
                        <div className = "form-group">
                            <label>Delete Food: </label>
                            <br></br>
                            <select ref="userInput"
                                required
                                className="form-control"
                                onChange={this.onChooseFood}>
                                {
                                    this.state.foodNameArray.map(function(food) {
                                        return <option
                                        key={food}
                                        value={food}>{food}
                                        </option>
                                    })
                                }
                            </select>
                            <br></br>
                            <div className="form-group text-center">
                                <input type="submit" required className="btn btn-outline-dark" value="Delete " />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    
    render(){
        return(
            <div>
                <br></br>
                <h4 className="text-center">Food Diary</h4>
                <div className="container">
                    <form onSubmit={this.onGetDiarySubmit}>
                    <div className = "form-group align-items-center">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.entryDate}
                            onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group text-align">
                            <input type="submit" required className="btn btn-outline-dark" value="Display Food Diary " />
                    </div>
                    </form>
                </div>
                {this.state.loaded ? this.content() : null}
                
            </div>
        )
    }
}