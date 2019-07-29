import React, { Component } from 'react';
import firebase from './firebase';
import { Redirect } from 'react-router-dom';
// import Modalupdate from './Modalupdate';
import Modal from 'react-awesome-modal';
export default class GetdataFromFirebase extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            data2: [],
            visible: false,
            firstName: "",
            lastName: "",
            age: "",
            position: "",
            key: ""

        }
    }
    getUserData = () => {
        let ref = firebase.database().ref('userData');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            console.log(state, "object")
            var n = Object.keys(state).map(function (value) {
                state[value]["key"] = value;
                return state[value];
            });
            console.log(n);
            this.setState({ data2: n })



        });
        console.log('DATA RETRIEVED');
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        this.getUserData()
    }

  
    updateFirebase = () => {
        var obj={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            age:this.state.age,
            position:this.state.position
        }
        firebase.database().ref('userData/' + this.state.key).update(obj);
    
    }
    deleteFirebase = (v) => {
        firebase.database().ref('userData/' + v.key).remove();
    }
    closeModal = () => {
        this.setState({
            visible: false,firstName:"" , lastName:"", age:"",position:""
        });
    }
    test = (v) => {
        console.log(v);
        this.setState({ visible: true,firstName:v.firstName , lastName:v.lastName, age:v.age,position:v.position ,key:v.key })

    }

    render() {

        return (
            <div>
                <h1>Get data</h1>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>age</th>
                            <th>Position</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data2 ? this.state.data2.map((v, k) => (
                            <tr key={k}>
                                <td><button className="btn btn-xs btn-primary" onClick={() => this.test(v)}>edit</button></td>
                                <td><button className="btn btn-xs btn-danger" onClick={() => this.deleteFirebase(v)}>delete</button></td>
                                <td>{v.firstName}</td>
                                <td>{v.lastName}</td>
                                <td>{v.age}</td>
                                <td>{v.position}</td>
                            </tr>

                        )) : null}
                    </tbody>
                </table>
              
                <Modal visible={this.state.visible} width="400" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="p-4">
                        <h1>Title</h1>
                        <form onSubmit={this.updateFirebase}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="firstName" value={this.state.firstName} placeholder="Enter frstName" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="lastName" value={this.state.lastName} placeholder="Enter lastname" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" placeholder="Enter age" value={this.state.age} name="age" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="position"  value={this.state.position} placeholder="Enter position" onChange={this.handleChange} />
                            </div>
                        <button className="btn btn-xs btn-primary">Update</button>
                        </form>

                        <button className="btn btn-xs btn-warning" href="javascript:void(0);" onClick={() => this.closeModal()}>Close</button>
                    </div>
                </Modal>
            </div>
        )
    }
}
