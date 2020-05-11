import React, { Component } from 'react';
import axios from 'axios';

export default class Settings extends Component {
    constructor(props){
        super(props);
        this.username = props.username;

        this.onChangeUpdateAge = this.onChangeUpdateAge.bind(this);
        this.onChangeUpdateHeight = this.onChangeUpdateHeight.bind(this);
        this.onChangeUpdateWeight = this.onChangeUpdateWeight.bind(this);
        this.onChangeUpdateAL = this.onChangeUpdateAL.bind(this);
        this.onChangeUpdateTargetWeight = this.onChangeUpdateTargetWeight.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onUpdateAgeSubmit = this.onUpdateAgeSubmit.bind(this);
        this.onUpdateHeightSubmit = this.onUpdateHeightSubmit.bind(this);
        this.onUpdateWeightSubmit = this.onUpdateWeightSubmit.bind(this);
        this.onUpdateActivitySubmit = this.onUpdateActivitySubmit.bind(this);
        this.onUpdateTargetWeightSubmit = this.onUpdateTargetWeightSubmit.bind(this);
        this.onDeleteAccountSubmit = this.onDeleteAccountSubmit.bind(this);
        this.onChangePasswordSubmit = this.onChangePasswordSubmit.bind(this);

        this.state = {
            updateTargetWeight: 0,
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateAL: 'Not Active',
            password: "",
        }
    }


    onChangeUpdateAge(e){
        this.setState({
            updateAge: e.target.value
        })
    }

    onChangeUpdateWeight(e){
        this.setState({
            updateWeight: e.target.value
        });
        
    }

    onChangeUpdateHeight(e){
        this.setState({
            updateHeight: e.target.value
        });
    }

    onChangeUpdateAL(e){
        this.setState({
            updateAL: e.target.value
        });
    }

    onChangeUpdateTargetWeight(e){
        this.setState({
            updateTargetWeight: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onUpdateAgeSubmit(e){
        e.preventDefault();

        const user = {
            username: this.username,
            updateAge: this.state.updateAge,
        }

        if(this.state.updateAge !== null && this.state.updateAge !== 0){
            axios.post('http://localhost:5000/users/updateAge', user)
                .then(res => 
                    console.log(res.data),
                    alert("Age Updated"),
                );
        }
        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'Not Active',
            password: "",
        });
    }

    onUpdateHeightSubmit(e){
        e.preventDefault();

        const user = {
            username: this.username,
            updateHeight: this.state.updateHeight,
        }

        if(this.state.updateHeight !== null && this.state.updateHeight !== 0){
            axios.post('http://localhost:5000/users/updateHeight', user)
                .then(res => 
                    console.log(res.data),
                    alert("Height Updated"),
                );
        }


        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'Not Active',
            password: "",
        });
    }

    onUpdateWeightSubmit(e){
        e.preventDefault();

        const user = {
            username: this.username,
            updateWeight: this.state.updateWeight,
        }

        if(this.state.updateWeight !== null && this.state.updateWeight !== 0){
            axios.post('http://localhost:5000/users/updateWeight', user)
                .then(res => 
                    console.log(res.data),
                    alert("Weight Updated!"),
                );
        }

        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'Not Active',
            password: "",
        });
    }

    onUpdateTargetWeightSubmit(e){
        e.preventDefault();

        const user = {
            username: this.username,
            updateTargetWeight: this.state.updateTargetWeight
        }


        if(this.state.updateTargetWeight !== null && this.state.updateTargetWeight !== 0){
            axios.post('http://localhost:5000/users/updateTargetWeight', user)
                .then(res => 
                    console.log(res.data),
                    alert("Target Weight Updated!"),
                );
        }

        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'Not Active',
            password: "",
        });
    }

    onUpdateActivitySubmit(e){
        e.preventDefault();

        const user = {
            username: this.username,
            updateAL: this.state.updateAL
        }


        if((this.state.updateAL).localeCompare("noUpdate") !== 0){
            axios.post('http://localhost:5000/users/updateAL', user)
                .then(res => 
                    console.log(res.data),
                    alert("Activity Level Updated"),
                );
        }

        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'Not Active',
            password: "",
        });
    }

    onChangePasswordSubmit(e){
        e.preventDefault();

        const user = {
            username: this.username,
            password: this.state.password
        }


        if((this.state.password).localeCompare("") !== 0){
            axios.post('http://localhost:5000/users/updatePassword', user)
                .then(res => 
                    console.log(res.data),
                    alert("Password Updated"),
                );
        }

        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'Not Active',
            password: "",
        });
    }

    onDeleteAccountSubmit(e){
        e.preventDefault();
        let r = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
        if (r === true) {
            const user = {
                username: this.username,
            }
    
            axios.post('http://localhost:5000/foodEntries/deleteAll', user)
                .then(res => 
                    console.log(res.data),
                );
    
    
            axios.post('http://localhost:5000/foods/deleteAll', user)
                .then(res => 
                    console.log(res.data),
                );
    
            axios.post('http://localhost:5000/posts/deleteAll', user)
                .then(res => 
                    console.log(res.data),
                );
    
            axios.post('http://localhost:5000/users/deleteUser', user)
                .then(res => 
                    console.log(res.data),
                );
            localStorage.removeItem("USERNAME");
            window.location.assign("/");
        } 
    }

    render(){
        return (
            <div>
                <br></br>
              <h4 className="text-center" >Update Account Information</h4>
              <div className="container">
                <form onSubmit={this.onUpdateAgeSubmit}>
                    <label>New Age: </label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" value={this.state.updateAge} onChange={this.onChangeUpdateAge} aria-describedby="basic-addon2"></input>
                        <div className="input-group-append">
                            <button className="btn btn-outline-dark" type="submit">Update</button>
                        </div>
                    </div>
                </form>
                </div>
                <br></br>
                <div className="container">
                    <form onSubmit={this.onUpdateWeightSubmit}>
                        <label>New Weight: </label>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control"value={this.state.updateWeight} onChange={this.onChangeUpdateWeight} aria-describedby="basic-addon2"></input>
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark" type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
                <br></br>
                <div className="container">
                    <form onSubmit={this.onUpdateTargetWeightSubmit}>
                        <label>New Target Weight: </label>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control"value={this.state.updateTargetWeight} onChange={this.onChangeUpdateTargetWeight}aria-describedby="basic-addon2"></input>
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark" type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
                <br></br>
                <div className="container">
                    <form onSubmit={this.onUpdateHeightSubmit}>
                        <label>New Height: </label>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control"value={this.state.updateHeight} onChange={this.onChangeUpdateHeight} aria-describedby="basic-addon2"></input>
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark" type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
                <br></br>
                <div className="container">
                    <form onSubmit={this.onUpdateActivitySubmit}>
                    <label>New Activity Level: </label>
                        <div className="input-group">
                            <select value={this.state.updateAL} onChange={this.onChangeUpdateAL} className="custom-select" id="inputGroupSelect04">
                                <option selected="Not Active">Not Active</option>
                                <option value="Lightly Active">Lightly Active</option>
                                <option value="Moderately Active">Moderately Active</option>
                                <option value="Very Active">Very Active</option>
                                <option value="Extremely Active">Extremely Active</option>
                            </select>
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark" type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
                <br></br>
                <div className="container">
                    <form onSubmit={this.onChangePasswordSubmit}>
                        <label>New Password: </label>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control"value={this.state.password} onChange={this.onChangePassword} aria-describedby="basic-addon2"></input>
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark" type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
                <br></br>
                <br></br>
                <div className="container">
                    <form onSubmit={this.onDeleteAccountSubmit}>
                        <div className="form-group text-center">
                            <input type="submit" required className="btn btn-outline-dark" value="Delete Account " />
                        </div>
                    </form>
                </div>
            </div>
            )
    }
}