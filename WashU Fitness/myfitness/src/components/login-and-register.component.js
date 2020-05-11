import React, { Component } from 'react';
import axios from 'axios';

export default class LoginAndRegister extends Component {
    constructor(props){
        super(props);

        this.onChangeLoginUsername = this.onChangeLoginUsername.bind(this);
        this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.createAccount = this.createAccount.bind(this);

        this.state = {
            loginUsername: '',
            loginPassword: ''
        }
    }
   

    onChangeLoginUsername(e){
        this.setState({
            loginUsername: e.target.value
        });
    }

    onChangeLoginPassword(e){
        this.setState({
            loginPassword: e.target.value
        });
    }

    onLoginSubmit(e){
        e.preventDefault(); 

        const user = {
           username: this.state.loginUsername,
           password: this.state.loginPassword
        }
        axios.post('http://localhost:5000/users/login', user)
            .then(res => {
                if(res.data) {
                    localStorage.setItem("USERNAME", user.username);
                    window.location.assign('/welcome/'+user.username);
                    window.location.assign('/welcome/progress');
                } else {
                    alert("Wrong Credientials! Try to login again.");
                }
            })

        this.setState({
            loginUsername: '',
            loginPassword: ''
        });
    }

    createAccount(e){
        e.preventDefault();
        window.location.assign('/onlyRegister');
    }

    render(){
        return(    
            <div>
                <div className = "page-header text-light bg-dark">
                    <h1>WashU Bear Fitness</h1>
                </div>
                <div>
                <br></br>
                <div id="login" className="container">
                <br></br>
                <h3 className="text-center">Login</h3>
                <form onSubmit={this.onLoginSubmit}>
                    <div className="form-group align-items-center">
                        <label>Username: </label>
                        <input type="text" required className="form-control" value={this.state.loginUsername} onChange={this.onChangeLoginUsername} />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" required className="form-control" value={this.state.loginPassword} onChange={this.onChangeLoginPassword} />
                    </div>
                    <div className="form-group text-center">
                        <input type="submit" required className="btn btn-outline-dark" value="Login " />
                    </div>
                    </form>  
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>
                <br></br>
                <div id="register" className="container">
                    <br/>
                    <h3 className="text-center" >Don't Have an Account?</h3>     
                    <br></br> 
                    <form onSubmit={this.createAccount}>
                        <div className="form-group text-center">
                            <input type="submit" required className="btn btn-outline-dark" value="Create Account " />
                        </div>
                    </form>  
                </div>
                </div>        
            </div>
        )
    }
}