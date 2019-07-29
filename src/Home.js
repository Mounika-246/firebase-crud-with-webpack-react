import React,{Component} from 'react';
import firebase from './firebase';

class Home extends Component {
    
    handleLogout=()=>{
    firebase.auth().signOut()
    }
    
    render(){
        return (
            <div>
                
                <h1>homeeeeeeeeeee</h1>
                <div>
                    <button  className="btn btn-xs btn-primary" onClick={this.handleLogout}>signout</button>
                </div>

            </div>
        )
    }
}
export default Home;