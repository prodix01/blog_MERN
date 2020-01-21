import React, {Component} from 'react';
import axios from "axios";

class Dashboard extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        axios
            .get("/posts")
            .then(res => this.setState({
                posts: res.data.posts
            }))
            .catch(err =>console.log(err.response.data));

        this.setState({

        })
    }


    render() {

        const {posts} = this.state;
        console.log(posts);

        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Name</th>
                        <th scope="col">Handle</th>
                    </tr>
                    </thead>
                    {posts.map(post =>

                    <tbody>
                    <tr>
                        <th scope="row"></th>
                        <td>{post.text}</td>
                        <td>{post.name}</td>
                        <td>@mdo</td>
                    </tr>

                    </tbody>
                    )}
                </table>
            </div>
        );
    }
}

export default Dashboard;