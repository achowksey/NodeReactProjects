import React, { Component } from 'react';
import axios from 'axios';

export default class onlyRegister extends Component {
    constructor(props){
        super(props);

        this.onChangeRegisterUsername = this.onChangeRegisterUsername.bind(this);
        this.onChangeRegisterPassword = this.onChangeRegisterPassword.bind(this);
        this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
        this.goBack = this.goBack.bind(this);

        this.onChangeRegisterCurrentHeight = this.onChangeRegisterCurrentHeight.bind(this);
        this.onChangeRegisterCurrentWeight = this.onChangeRegisterCurrentWeight.bind(this);
        this.onChangeRegisterTargetWeight = this.onChangeRegisterTargetWeight.bind(this);
        this.onChangeRegisterAge = this.onChangeRegisterAge.bind(this);
        this.onChangeRegisterAL = this.onChangeRegisterAL.bind(this);

        this.state = {
            registerUsername: '',
            registerPassword: '',
            registerCurrentHeight: '',
            registerCurrentWeight: '',
            registerTargetWeight: '',
            registerAge: '',
            registerAL: 'Not Active', 
        }
    }
   
    onChangeRegisterUsername(e){
        this.setState({
            registerUsername: e.target.value
        });
    }

    onChangeRegisterPassword(e){
        this.setState({
            registerPassword: e.target.value
        });
    }

    onChangeRegisterCurrentHeight(e){
        this.setState({
            registerCurrentHeight: e.target.value
        });
    }

    onChangeRegisterCurrentWeight(e){
        this.setState({
            registerCurrentWeight: e.target.value
        });
    }

    onChangeRegisterTargetWeight(e){
        this.setState({
            registerTargetWeight: e.target.value
        });
    }

    onChangeRegisterAge(e){
        this.setState({
            registerAge: e.target.value
        });
    }

    onChangeRegisterAL(e){
        this.setState({
            registerAL: e.target.value
        });
    }

    onRegisterSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.registerUsername,
            password: this.state.registerPassword,
            targetWeight: this.state.registerTargetWeight,
            currentWeight: this.state.registerCurrentWeight,
            currentHeight: this.state.registerCurrentHeight,
            age: this.state.registerAge,
            activityLevel: this.state.registerAL
        }

        axios.post('http://localhost:5000/users/add', user)
        .then(res => {
            console.log(res.data);
            if(res.data) {
                alert("Account Successfully Registered");
            } 
        })
        .catch(err => {
            console.log('Error: ' + err);
            alert("Account Not Registered, Try Again");
        })
        

        this.setState({
            registerUsername: '',
            registerPassword: '',
            registerCurrentHeight: '',
            registerCurrentWeight: '',
            registerTargetWeight: '',
            registerAge: '',
            registerAL: {value: 'Not Active'}
        });
    }

    goBack(e){
        e.preventDefault();
        window.location.assign('/');
    }

    render(){
        return(
            <div>
                 <div className = "page-header text-light bg-dark">
                <h1>WashU Bear Fitness</h1>
                </div>
                <div className="container">
                    <h3 className="text-center">Register</h3>
                    <form onSubmit={this.onRegisterSubmit}>
                        <div className="form-group align-items-center">
                            <label>Username: </label>
                            <input type="text" required className="form-control" value={this.state.registerUsername} onChange={this.onChangeRegisterUsername} />
                        </div>
                        <div className="form-group align-items-center">
                            <label>Password: </label>
                            <input type="password" required className="form-control" value={this.state.registerPassword} onChange={this.onChangeRegisterPassword} />
                        </div>
                        <div className="form-group align-items-center">
                            <label>Current Height (inches): </label>
                            <input type="number" required className="form-control" value={this.state.registerCurrentHeight} onChange={this.onChangeRegisterCurrentHeight} />
                            <br></br>
                            <label>Current Weight (pounds): </label>
                            <input type="number" required className="form-control" value={this.state.registerCurrentWeight} onChange={this.onChangeRegisterCurrentWeight} />
                            <br></br>
                            <label>Target Weight (pounds): </label>
                            <input type="number" required className="form-control" value={this.state.registerTargetWeight} onChange={this.onChangeRegisterTargetWeight} />
                            <br></br>
                            <label>Age (years): </label>
                            <input type="number" required className="form-control" value={this.state.registerAge} onChange={this.onChangeRegisterAge} />
                            <br></br>
                            <label>New Activity Level: </label>
                            <div className="input-group">
                                <select value={this.state.registerAL} onChange={this.onChangeRegisterAL} className="custom-select" id="inputGroupSelect04">
                                    <option selected="Not Active">Not Active</option>
                                    <option value="Lightly Active">Lightly Active</option>
                                    <option value="Moderately Active">Moderately Active</option>
                                    <option value="Very Active">Very Active</option>
                                    <option value="Extremely Active">Extremely Active</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group text-center">
                            <input type="submit" required className="btn btn-outline-dark" value="Register " />
                        </div>
                    </form>
                    <form onSubmit={this.goBack}>
                        <div className="form-group text-center">
                            <input type="submit" required className="btn btn-outline-dark" value="Back to Login " />
                        </div>
                    </form>
                </div>
                <br/>
            </div>
        )
    }
}