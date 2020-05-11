import React, { Component } from 'react';

export default class Logout extends Component {
    constructor(props){
        super(props);
        localStorage.removeItem("USERNAME");
        window.location.assign("/");
    }

    render(){
        return(
            <div>
            </div>
        )
    }
}