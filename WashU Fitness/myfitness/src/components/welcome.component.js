import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar2 from "./navbar.component";
import Progress from "./progress.component";
import AddFood from "./addfood.component";
import FoodDiary from "./fooddiary.component";
import CustomMeal from "./customMeal.component";
import ManageCustomMeal from "./manageCustomMeals.component"
import Settings from "./settings.component"
import Posts from "./posts.component"
import ManagePosts from "./managePosts.component"
import Logout from "./logout.component"

export default class Welcome extends Component {
    constructor(props){
        super(props);
        this.param = localStorage.getItem("USERNAME");
    }

    render(){       
        return(
            <div> 
                <Router>
                    <Navbar2/>
                    <Route exact path="/welcome/progress" render={(props) => <Progress {...props} username={this.param} />} />
                    <Route exact path="/welcome/addfood" render={(props) => <AddFood {...props} username={this.param} />} />
                    <Route exact path="/welcome/fooddiary" render={(props) => <FoodDiary {...props} username={this.param} />} />
                    <Route exact path="/welcome/custom" render={(props) => <CustomMeal {...props} username={this.param} />} /> 
                    <Route exact path="/welcome/manage" render={(props) => <ManageCustomMeal {...props} username={this.param} />} /> 
                    <Route exact path="/welcome/settings" render={(props) => <Settings {...props} username={this.param} />} /> 
                    <Route exact path="/welcome/posts" render={(props) => <Posts {...props} username={this.param} />} /> 
                    <Route exact path="/welcome/managePosts" render={(props) => <ManagePosts {...props} username={this.param} />} />
                    <Route exact path="/welcome/logout" render={(props) => <Logout {...props} username={this.param} />} /> 
                </Router>
            </div>
            
        )
    }
}