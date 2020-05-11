import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class AddFood extends Component {
    constructor(props){
        super(props);
        this.username = props.username;
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChooseFood = this.onChooseFood.bind(this);
        this.onLocationSubmit = this.onLocationSubmit.bind(this);
        this.onFoodEntrySubmit = this.onFoodEntrySubmit.bind(this);
        this.setValues = this.setValues.bind(this);

        this.state = {
            locationFoods: [],
            loaded: false,
            entryDate: new Date(),
            location: "DUC - 1853 Diner",
        }
    }

    onChangeDate = date => {
        this.setState({
            entryDate: date
        });
      };

    onChangeLocation(e){
        this.setState({
            location: e.target.value
        });
    }

    onLocationSubmit(e){
        e.preventDefault();
        this.setState({
            loaded: false
        })
        this.setValues();
    }

    setValues(){
        let location = {
            location: this.state.location,
            username: " "
        }

        if(this.state.location.localeCompare("Custom Meal")===0){
             location = {
                location: this.state.location,
                username: this.username
            }
        }

        axios.post('http://localhost:5000/foods/getLocationFoods', location)
            .then(res => {
                console.log(res.data);
                if(res.data.length > 0){
                    this.setState({
                        locationFoods: res.data.map(food => food.name),
                    })
                    this.state.locationFoods.unshift("Please Select an Item"); 
                    this.setState({
                        loaded: true,
                        chosenFood: "Please Select an Item"
                    })
                }
                else{
                    this.setState({
                        loaded: false,
                    })
                }
            }
        );   
    }

    onFoodEntrySubmit(e){
        e.preventDefault();
        const foodEntry = {
            username: this.username,
            foodName: this.state.chosenFood,
            date: this.state.entryDate.getFullYear() + "-" + this.state.entryDate.getMonth() + "-" + this.state.entryDate.getDate() 
        }
        
        if (this.state.chosenFood.localeCompare("Please Select an Item") !== 0){
            axios.post('http://localhost:5000/foodEntries/addEntry', foodEntry)
                .then(res => {
                    console.log(res.data);
                    if(res.data){
                        alert("Food added to diary!");
                    };
                }
            ); 
        }
        else{
            alert("Cannot choose this value")
        }
        this.setState({
            loaded: false
        })
        this.setValues();
    }

    onChooseFood(e){
        this.setState({
            chosenFood: e.target.value
        });
    }

    chooseDateAndFoodContent(){
        return(
            <div>
                <div className="container">
                    <form onSubmit={this.onFoodEntrySubmit}>
                        <div className="form-group align-items-center">
                            <label>Date: </label>
                            <div>
                                <DatePicker
                                selected={this.state.entryDate}
                                onChange={this.onChangeDate}
                                />
                            </div>
                        </div>
                        <div className="form-group align-items-center">
                            <label>Choose Food: </label>
                            <select ref="userInput"
                                required
                                className="form-control"
                                onChange={this.onChooseFood}>
                                {
                                    this.state.locationFoods.map(function(food) {
                                        return <option
                                        key={food}
                                        value={food}>{food}
                                        </option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="form-group text-center">
                            <input type="submit" required className="btn btn-outline-dark" value="Add Food Entry" />
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
                <h4 className="text-center">Add Entry to Food Diary</h4>
                <div className="container">
                <div className = "form-group align-items-center">
                    <label>Location: </label>
                    <div>
                        <form onSubmit={this.onLocationSubmit}>
                            <div className="input-group">
                                <select value={this.state.location} onChange={this.onChangeLocation} className="custom-select" id="inputGroupSelect04">
                                    <option selected="DUC - 1853 Diner">DUC - 1853 Diner</option>
                                    <option value="DUC - Wash U Wok">DUC - Wash U Wok</option>
                                    <option value="Grab and Go">Grab and Go</option>
                                    <option value="Paws and Go Market">Paws and Go Market</option>
                                    <option value="Custom Meal">Custom Meal</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark" type="submit">Enter</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {this.state.loaded ? this.chooseDateAndFoodContent() : null}
                </div>
            </div>
        )
    }
}