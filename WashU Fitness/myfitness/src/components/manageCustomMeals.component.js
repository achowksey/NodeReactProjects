import React, { Component } from 'react';
import axios from 'axios';

export default class ManageCustomMeal extends Component {
    constructor(props){
        super(props);
        this.username = props.username;

        this.onChangeCalories = this.onChangeCalories.bind(this);
        this.onChangeTotalFat = this.onChangeTotalFat.bind(this);
        this.onChangeDietaryFiber = this.onChangeDietaryFiber.bind(this);
        this.onChangeSugar = this.onChangeSugar.bind(this);
        this.onChangeProtein = this.onChangeProtein.bind(this);
        this.onChangeTotalCarbs= this.onChangeTotalCarbs.bind(this);
        this.onChangeCholestrol = this.onChangeCholestrol.bind(this);
        this.onEditMealSubmit = this.onEditMealSubmit.bind(this);
        this.onDeleteMealSubmit = this.onDeleteMealSubmit.bind(this);
        this.onSharedUserSubmit = this.onSharedUserSubmit.bind(this);
        this.onChooseFood = this.onChooseFood.bind(this);
        this.manageCustomMeal = this.manageCustomMeal.bind(this);
        this.chooseCustomMeal = this.chooseCustomMeal.bind(this);
        this.onChangeSharedUser = this.onChangeSharedUser.bind(this);

        this.state = {
            calories: 0,
            totalFat: 0,
            cholestrol: 0,
            totalCarbs: 0,
            dietaryFiber: 0,
            sugar: 0,
            protein: 0,
            customFoods: [],
            loaded: false,
            loaded2: false,
            sharedUser: ""
        }
    }

    componentDidMount(){
        const user = {
            username: this.username,
            location: "Custom Meal"
        }
       
        axios.post('http://localhost:5000/foods/getLocationFoods', user)
            .then(res => {
                if(res.data.length > 0){
                    this.setState({
                        customFoods: res.data.map(food => food.name)
                    })
                    this.state.customFoods.unshift("Please Select an Item");   
                    this.setState({
                        loaded: true
                    })
                }
            })
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

    onChangeSharedUser(e){
        this.setState({
            sharedUser: e.target.value
        });
    }

    onChooseFood(e){
        this.setState({
            chosenFood: e.target.value,
            loaded2: false
        });
        this.getSpecificFood(e.target.value);
    }

    getSpecificFood(ebro){
        const user = {
            username: this.username,
            location: "Custom Meal",
            name: ebro
        }
        if(user.name.localeCompare("Please Select an Item") !== 0){
            axios.post('http://localhost:5000/foods/getSpecificFood', user)
            .then(res => {
                this.setState({
                    calories: res.data.calories,
                    totalFat: res.data.totalFat,
                    cholestrol: res.data.cholestrol,
                    totalCarbs: res.data.totalCarb,
                    dietaryFiber: res.data.dietaryFiber,
                    sugar: res.data.sugar,
                    protein: res.data.protein,     
                    loaded2: true
                });
            })
        }
    }

    onEditMealSubmit(e){
        e.preventDefault();
        this.setState({
            loaded2: false
        });

        const customMeal = {
            name: this.state.chosenFood,
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

        
        axios.post('http://localhost:5000/foods/delete', customMeal)
            .then(res => {
                axios.post('http://localhost:5000/foods/add', customMeal)
                .then(res => {
                    if(res.data) {
                        this.setState({
                            loaded2: true,
                            sharedUser: ""
                        });
                       alert("Custom meal Updated!")
                    }
                })
            })
    }

    onSharedUserSubmit(e){
        e.preventDefault();
        this.setState({
            loaded: false
        });

        const customMeal = {
            name: this.state.chosenFood,
            location: "Custom Meal",
            calories: this.state.calories,
            totalFat: this.state.totalFat,
            cholestrol: this.state.cholestrol,
            totalCarb: this.state.totalCarbs,
            dietaryFiber: this.state.dietaryFiber,
            sugar: this.state.sugar,
            protein: this.state.protein,
            username: this.state.sharedUser
        }
        
        axios.post('http://localhost:5000/users/userExists', customMeal)
            .then(res => {
                if(res.data){
                    axios.post('http://localhost:5000/foods/add', customMeal)
                    .then(res => {
                            alert("Custom meal shared!")
                            this.setState({
                                loaded2: false,
                                loaded: true
                            });
                    })
                }
                else{
                    alert("Shared user does not exist!")
                    this.setState({
                        loaded2: false,
                        loaded: true
                    });
                }
            })
        this.setState({
            sharedUser: ""
        })
    }

    onDeleteMealSubmit(e){
        e.preventDefault();
        this.setState({
            loaded: false
        });

        const customMeal = {
            name: this.state.chosenFood,
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

        
        axios.post('http://localhost:5000/foods/delete', customMeal)
            .then(res => {
                    var index = this.state.customFoods.indexOf(customMeal.name);
                    if (index !== -1) this.state.customFoods.splice(index, 1);
                    this.setState({
                        loaded2: false,
                        loaded: true
                    });
            })

        const customMeal2 = {
            name: this.state.chosenFood,
            location: "Custom Meal",
            calories: this.state.calories,
            totalFat: this.state.totalFat,
            cholestrol: this.state.cholestrol,
            totalCarb: this.state.totalCarbs,
            dietaryFiber: this.state.dietaryFiber,
            sugar: this.state.sugar,
            protein: this.state.protein,
            username: " "
        }

        
        axios.post('http://localhost:5000/foods/add', customMeal2)
            .then(res => {
                alert("Custom meal Deleted!")
            })

        this.setState({
            sharedUser: ""
        })

    }

    chooseCustomMeal(){
        return(
            <div>
                <div className="container">
                    <div className = "form-group">
                        <div>
                            <div className = "form-group">
                                <label>Choose Custom Meal: </label>
                                <select ref="userInput"
                                    required
                                    className="form-control"
                                    onChange={this.onChooseFood}>
                                    {
                                        this.state.customFoods.map(function(food) {
                                            return <option
                                            key={food}
                                            value={food}>{food}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    manageCustomMeal(){
        return(
            <div>
                <br></br>
                <div className="container">
                    <form onSubmit={this.onDeleteMealSubmit}>
                        <div className="form-group text-center">
                            <input type="submit" required className="btn btn-outline-dark" value="Delete Custom Meal" />
                        </div>
                    </form>
                </div>

                <div className="container">
                    <form onSubmit={this.onSharedUserSubmit}>
                        <div className="form-group">
                            <label>Share Custom Meal (Only One User at a Time): </label>
                            <input type="text" required className="form-control" value={this.state.sharedUser} onChange={this.onChangeSharedUser} />
                        </div>

                        <div className="form-group text-center">
                            <input type="submit" required className="btn btn-outline-dark" value="Share Custom Meal" />
                        </div>
                    </form>
                </div>
                <br/>
                <div className="container">
                    <form onSubmit={this.onEditMealSubmit}>
                        <h5 className="text-center">Edit Custom Meal</h5>
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
                            <input type="submit" required className="btn btn-outline-dark" value="Edit Custom Meal" />
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
                <h4 className="text-center">Manage Custom Meals</h4>
                {this.state.loaded ? this.chooseCustomMeal() : null}
                {this.state.loaded2 ? this.manageCustomMeal() : null}
            </div>
               
        )
    }
}