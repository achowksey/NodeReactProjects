import React, { Component } from 'react';
import axios from 'axios';

export default class Progress extends Component {
    constructor(props){
        super(props);
        this.username = props.username;

        this.onChangeUpdateAge = this.onChangeUpdateAge.bind(this);
        this.onChangeUpdateHeight = this.onChangeUpdateHeight.bind(this);
        this.onChangeUpdateWeight = this.onChangeUpdateWeight.bind(this);
        this.onChangeUpdateAL = this.onChangeUpdateAL.bind(this);
        this.onChangeUpdateTargetWeight = this.onChangeUpdateTargetWeight.bind(this);

        this.onUpdateAgeSubmit = this.onUpdateAgeSubmit.bind(this);
        this.onUpdateHeightSubmit = this.onUpdateHeightSubmit.bind(this);
        this.onUpdateWeightSubmit = this.onUpdateWeightSubmit.bind(this);
        this.onUpdateActivitySubmit = this.onUpdateActivitySubmit.bind(this);
        this.onUpdateTargetWeightSubmit = this.onUpdateTargetWeightSubmit.bind(this);

        this.state = {
            loaded: false,
            currentWeight: 0,
            currentHeight: 0,
            targetWeight: 0,
            age: 0,
            activityLevel: '',
            bmr: 0,
            targetCalories: 0,
            bmi: 0,
            updateTargetWeight: 0,
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateAL: 'noUpdate',
            days : 0,
            motivation: [],
            quote: [],
            random: 0,
        }
    }

    async componentDidMount() {
        const user = {
            username: this.username
        }
        this.state.motivation.push('Either you play the game or you let the game play you.');
        this.state.quote.push("— J Cole, World-Renowned Artist");
        this.state.motivation.push('Nothing comes to a sleeper but a dream.');
        this.state.quote.push("— Serena Williams, Tennis Superstar");
        this.state.motivation.push('If something stands between you and your success, move it. Never be denied');
        this.state.quote.push("— Dwayne ‘The Rock’ Johnson, Actor and Pro Wrestler");
        this.state.motivation.push("Do you really want to eat that half and half?");
        this.state.quote.push("— WashU Bear Fitness Dev Team");
        this.state.motivation.push('Everything negative – pressure, challenges – is all an opportunity for me to rise.');
        this.state.quote.push("— Kobe 'Bean' Bryant, NBA Legend");
        this.state.motivation.push('Things work out best for those who make the best of how things work out.');
        this.state.quote.push("— John Wooden, NCAA Coaching Legend");
        this.state.motivation.push('It does not matter how slowly you go, so long as you do not stop.');
        this.state.quote.push("— Confucius, Ancient Philosopher");
        this.state.motivation.push('Before you give up, think of the reason you held on so long.');
        this.state.quote.push("— Drake, Rapper");
        this.state.motivation.push('Live as if you were to die tomorrow. Learn as if you were to live forever.');
        this.state.quote.push("— Mahatma Gandhi, Indian Freedom Fighter");
        this.state.motivation.push('You can’t be afraid to fail. It’s the only way you succeed. You’re not gonna succeed all the time and I know that');
        this.state.quote.push("— LeBron James, NBA GOAT");
        this.state.random = Math.round(Math.random() * 9);
        const res = await axios.post('http://localhost:5000/users/getProgressInfo', user);
        this.setState({
            currentWeight: res.data.currentWeight,
            currentHeight: res.data.currentHeight,
            targetWeight: res.data.targetWeight,
            age: res.data.age,
            activityLevel: res.data.activityLevel
        })
        this.state.bmr = (4.536*res.data.currentWeight)+(15.88*res.data.currentHeight)-(5*res.data.age)+5;
        if(res.data.activityLevel.localeCompare("Not Active")===0){
            this.state.targetCalories = this.state.bmr * 1.2;
        }
        else if(res.data.activityLevel.localeCompare("Lightly Active")===0){
            this.state.targetCalories = this.state.bmr * 1.375;
        }
        else if(res.data.activityLevel.localeCompare("Moderately Active")===0){
            this.state.targetCalories = this.state.bmr * 1.55;
        }
        else if(res.data.activityLevel.localeCompare("Very Active")===0){
            this.state.targetCalories = this.state.bmr * 1.725;
        }
        else {
            this.state.targetCalories = this.state.bmr * 1.9;
        }
        this.state.targetCalories = this.state.targetCalories - 500;
        this.state.bmi = (703*res.data.currentWeight)/(res.data.currentHeight*res.data.currentHeight);
        this.state.targetCalories = this.state.targetCalories.toFixed(2);
        this.state.bmi = this.state.bmi.toFixed(2);
        this.state.days = (this.state.currentWeight - this.state.targetWeight) * 7;
        if (this.state.days <= 0){
            this.state.days = 0;
        }
        this.setState({loaded:true});  
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
                    this.loaded = false,
                    this.componentDidMount());
        }
        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'noUpdate'
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
                    this.loaded = false,
                    this.componentDidMount());
        }


        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'noUpdate'
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
                    this.loaded = false,
                    this.componentDidMount());
        }

        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'noUpdate'
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
                    this.loaded = false,
                    this.componentDidMount());
        }

        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'noUpdate'
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
                    this.loaded = false,
                    this.componentDidMount());
        }

        this.setState({
            updateWeight: 0,
            updateHeight: 0,
            updateAge: 0,
            updateTargetWeight: 0,
            updateAL: 'noUpdate'
        });
    }

    content(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header text-light bg-dark">
                                    Your Current Stats:
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Current Height: {this.state.currentHeight} inches</li>
                                    <li className="list-group-item">Current Weight: {this.state.currentWeight}  lbs</li>
                                    <li className="list-group-item">Target Weight: {this.state.targetWeight} lbs</li>
                                    <li className="list-group-item">Current Age: {this.state.age} years</li>
                                    <li className="list-group-item">Current Activity Level: {this.state.activityLevel}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header text-light bg-dark">
                                    Based On Your Current Stats:
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Daily Target Calories to Lose 1 lb/wk: {this.state.targetCalories}</li>
                                    <li className="list-group-item">Body Mass Index (BMI): {this.state.bmi}</li>
                                    <li className="list-group-item">Basal Metabolic Rate (BMR): {this.state.bmr.toFixed(2)}</li>
                                    <li className="list-group-item">Pounds to Lose: {this.state.currentWeight-this.state.targetWeight} lbs</li>
                                    <li className="list-group-item">Reach Your Target Weight in {this.state.days} days!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <h4 className="text-center">"{this.state.motivation[this.state.random]}"</h4>
                <br></br>
                <h5 className="text-center">{this.state.quote[this.state.random]}</h5>
            </div>
        )
    }

    render(){
        return (
            <div>
                <br></br>
                <h4 className="text-center"> Progress Page </h4>
                <br/>
                 {this.state.loaded ? this.content() : null}
            </div>
            )
    }
}
