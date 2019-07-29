import React, { Component } from 'react'
import firebase from './firebase';
class PostDataTofirebase extends Component {
    constructor(props) {
        super(props)
        this.state = {
                firstName: "",
                lastName:"",
                age: "",
                position: ""
               
            } 
        }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submit = (e) => {
        e.preventDefault();
       
            firebase.database().ref("userData").push(this.state)
            this.props.history.push('/get')
        }
 

    render() {
         console.log(this.props, "post");


        return (
            <div>
                <h1>POST</h1>
                <div className="col-md-6">
                          <form onSubmit={this.submit}>
                         
                        <div className="form-group">
                            <input type="text" className="form-control" name="firstName" placeholder="Enter frstName" value={this.state.firstName} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="lastName" placeholder="Enter lastname" value={this.state.lastName} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="number" className="form-control" placeholder="Enter age" name="age" value={this.state.age} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="position" placeholder="Enter position" value={this.state.position} onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-xs btn-primary" >submit</button>
                        
                    </form>
                </div>
            </div>
        )
    }
}
export default PostDataTofirebase;