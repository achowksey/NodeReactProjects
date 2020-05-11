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

export default class ManagePosts extends Component {
    constructor(props){
        super(props);
        this.username = props.username;

        this.deletePosts = this.deletePosts.bind(this);
        this.createPosts = this.createPosts.bind(this);
        this.onChoosePost = this.onChoosePost.bind(this);
        this.onChoosePostSubmit = this.onChoosePostSubmit.bind(this);

        this.state = {
            loaded: false,
            loaded2: false,
            posts: [],
        }
    }

    componentDidMount(){
        const user = {
            username: this.username,
        }
        axios.post('http://localhost:5000/posts/getPostsUser', user)
            .then(res => {
                if(res.data.length > 0){
                    this.setState({
                        posts: res.data.map(post => post.post)
                    })

                    this.state.posts.unshift("Please Select a Post");   
                    this.setState({
                        loaded: true,
                        loaded2: true
                    })
                }
            })
    }

    onChoosePost(e){
        this.setState({
            deletedPost: e.target.value,
        });
    }

    onChoosePostSubmit(e){
        e.preventDefault();
        this.setState({
            loaded: false,
            loaded2: false
        });

        const user = {
            username: this.username,
            post: this.state.deletedPost
        }
        
        if (user.post !==  undefined && user.post.localeCompare("Please Select a Post") !== 0){
            axios.post('http://localhost:5000/posts/delete', user)
            .then(res => {
                if(res.data){
                     alert("Post Deleted!");
                     this.componentDidMount();
                }
            })
        }
        else{
            alert("Please Select a Valid Post!");
            this.setState({
                loaded: true,
                loaded2: true
            });
    
        }

    }
    

    deletePosts(){
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.onChoosePostSubmit}>
                    <label>Choose Post to Delete:  </label>
                        <div className="input-group">
                        <select ref="userInput"
                                required
                                className="form-control"
                                onChange={this.onChoosePost}>
                                {
                                    this.state.posts.map(function(post) {
                                        return <option
                                        key={post}
                                        value={post}>{post}
                                        </option>
                                    })
                                }
                            </select>
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark" type="submit">Delete</button>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
        );
    }


    createPosts(){
        var elements=[];
        for(var i=0;i<this.state.posts.length;i++){
             // push the component to elements!
            if(this.state.posts[i].localeCompare("Please Select a Post") !==  0){
                elements.push(<Post value={ this.state.posts[i] } />);
            }
        }

        return (
            <div > 
            <br></br>
            <hr></hr>
            <br></br>
            <h5 className="text-center">Your Past Posts</h5>
            {elements}
            </div>
        );
    }

    render(){
        return(
            <div>
                <br></br>
              <h4 className="text-center">Manage Posts</h4>
                 {this.state.loaded ? this.deletePosts() : null}
                 <div className="container">
                    {this.state.loaded2 ? this.createPosts() : null}
                </div>
            </div>
        )
    }
}