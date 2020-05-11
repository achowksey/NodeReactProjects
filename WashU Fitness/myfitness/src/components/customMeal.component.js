import React, { Component } from 'react';
import axios from 'axios';

export default class CustomMeal extends Component {
    constructor(props){
        super(props);
        this.username = props.username;

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCalories = this.onChangeCalories.bind(this);
        this.onChangeTotalFat = this.onChangeTotalFat.bind(this);
        this.onChangeDietaryFiber = this.onChangeDietaryFiber.bind(this);
        this.onChangeSugar = this.onChangeSugar.bind(this);
        this.onChangeProtein = this.onChangeProtein.bind(this);
        this.onChangeTotalCarbs= this.onChangeTotalCarbs.bind(this);
        this.onChangeCholestrol = this.onChangeCholestrol.bind(this);
        this.onCreateMealSubmit = this.onCreateMealSubmit.bind(this);

        this.state = {
            name: "",
            calories: 0,
            totalFat: 0,
            cholestrol: 0,
            totalCarbs: 0,
            dietaryFiber: 0,
            sugar: 0,
            protein: 0
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeCalories(e){
        this.setState({
            calories: e.target.value
        });
    }

    onChangeTotalFat(e){
        this.setState({
            totalFat: e.target.value
        });
    }

    onChangeCholestrol(e){
        this.setState({
            cholestrol: e.target.value
        });
    }

    onChangeTotalCarbs(e){
        this.setState({
            totalCarbs: e.target.value
        });
    }

    onChangeDietaryFiber(e){
        this.setState({
            dietaryFiber: e.target.value
        });
    }

    onChangeSugar(e){
        this.setState({
            sugar: e.target.value
        });
    }

    onChangeProtein(e){
        this.setState({
            protein: e.target.value
        });
    }

    onCreateMealSubmit(e){
        e.preventDefault();

        const customMeal = {
            name: this.state.name,
            location: "Custom Meal",
            calories: this.state.calories,
            totalFat: this.state.totalFat,
            cholestrol: this.state.cholestrol,
            totalCarb: this.state.totalCarbs,
            dietaryFiber: this.state.dietaryFiber,
            sugar: this.state.sugar,
            protein: this.state.protein,
            username: this.username
        }
        axios.post('http://localhost:5000/foods/add', customMeal)
            .then(res => {
                if(res.data) {
                   alert("Custom meal created!")
                }
            })

        this.setState({
            name: "",
            calories: 0,
            totalFat: 0,
            cholestrol: 0,
            totalCarbs: 0,
            dietaryFiber: 0,
            sugar: 0,
            protein: 0
        });
    }

    render(){
        return(
            <div>
                <br></br>
                <h4 className="text-center">Create Custom Meal</h4>

                <div className = "form-group">
                    <div>
                        <div className="container">
                            <form onSubmit={this.onCreateMealSubmit}>
                                <div className="form-group">
                                    <label>Name of Food: </label>
                                    <input type="text" required className="form-control" value={this.state.name} onChange={this.onChangeName} />
                                </div>

                                <div className="form-group">
                                    <label>Calories: </label>
                                    <input type="number" required className="form-control" value={this.state.calories} onChange={this.onChangeCalories} />
                                </div>

                                <div className="form-group">
                                    <label>Total Fat: </label>
                                    <input type="number" required className="form-control" value={this.state.totalFat} onChange={this.onChangeTotalFat} />
                                </div>

                                <div className="form-group">
                                    <label>Cholestrol: </label>
                                    <input type="number" required className="form-control" value={this.state.cholestrol} onChange={this.onChangeCholestrol} />
                                </div>

                                <div className="form-group">
                                    <label>Total Carbs: </label>
                                    <input type="number" required className="form-control" value={this.state.totalCarbs} onChange={this.onChangeTotalCarbs} />
                                </div>

                                <div className="form-group">
                                    <label>Dietary Fiber: </label>
                                    <input type="number" required className="form-control" value={this.state.dietaryFiber} onChange={this.onChangeDietaryFiber} />
                                </div>

                                <div className="form-group">
                                    <label>Sugar: </label>
                                    <input type="number" required className="form-control" value={this.state.sugar} onChange={this.onChangeSugar} />
                                </div>

                                <div className="form-group">
                                    <label>Protein: </label>
                                    <input type="number" required className="form-control" value={this.state.protein} onChange={this.onChangeProtein} />
                                </div>
                            
                                <div className="form-group text-center">
                                    <input type="submit" required className="btn btn-outline-dark" value="Create Custom Meal" />
                                </div>
                            </form>  
                        </div>
                    </div>
                </div>
                {this.state.loaded ? this.chooseDateAndFoodContent() : null}
            </div>
        )
    }
}