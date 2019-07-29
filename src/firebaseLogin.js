
import React,{Component} from 'react';
import firebase from './firebase';
class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            userName:"",
            password:"",
            errors:[]
            
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value })
    };
    login=(e)=>{
         e.preventDefault()
         firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.password)
         .then(()=>{
         firebase.auth().onAuthStateChanged((user)=>{
             if(user){
                 console.log(user,"user")
                 if(user&& user.emailVerified){
                    this.props.history.push('/home')
                 }
                 else{
                 let error={message:"please verify login details"}
                 this.setState({errors:this.state.errors.concat(error)})
                }
             }
             else{
                this.setState({errors:[]})
                 this.props.history('/login')
             }
             
         })
         })
         .catch(err=>{
             this.setState({errors:this.state.errors.concat(err)})
         })
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="col-md-6">
                    <form onSubmit={this.login}>
                    <div className="form-group">
                    <input type="email" className="form-control" name="userName" value={this.state.userName} onChange={this.handleChange} />
                    <input type="password"  className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <button className="btn btn-xs btn-primary">submit</button>
                    </form>
                    {this.state.errors.length>0?this.state.errors.map((error, i) => <p key={i} className="text-center">{error.message}</p>):null}
               
               
                </div>
            </div>
        )
    }
}
export default Login;