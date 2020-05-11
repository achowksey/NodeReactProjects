import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component{
    render() {
        return (
        <div className="card">
            <div className="card-body">
                { this.props.value }
            </div>
        </div>
        );
    }
}

export default class Posts extends Component {
    constructor(props){
        super(props);
        this.username = props.username;

        this.onChangePost = this.onChangePost.bind(this);
        this.onSendPostSubmit = this.onSendPostSubmit.bind(this);
        this.createPosts = this.createPosts.bind(this);

        this.state = {
            loaded: false, 
            post: "",
            postsArray: []
        }
    }

    onChangePost(e){
        this.setState({
            post: e.target.value
        });
    }

    onSendPostSubmit(e){
        e.preventDefault();

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        const post = {
            username: this.username,
            post: this.state.post,
            date: today,
        }
       
        axios.post('http://localhost:5000/posts/add', post)
            .then(res => {
                alert("Post Sent!");
                this.componentDidMount();
            });
        
        this.setState({
           post: ""
        });
    }

    componentDidMount(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        const date2 = {
            date: today
        }

        axios.post('http://localhost:5000/posts/getPosts', date2)
        .then(res => {
            this.setState({
                postsArray: res.data.map(posts => posts.post),
            });
        });
    }

    createPosts(){
        var elements=[];
        for(var i=0;i<this.state.postsArray.length;i++){
             // push the component to elements!
            elements.push(<Post value={ this.state.postsArray[i] } />);
        }

        return (
            <div > 
            {elements}
            </div>
        );
    }

    render(){
        return(
            <div>
                <br></br>
                <h4 className="text-center">Send Posts</h4>
                <br></br>
                <div className="container">
                <div className = "form-group align-items-center">
                    <div>
                    <form onSubmit={this.onSendPostSubmit}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={this.state.post} onChange={this.onChangePost} aria-describedby="basic-addon2"></input>
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark" type="submit">Send</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>

                {this.createPosts()}

                </div>
            </div>
        )
    }
}