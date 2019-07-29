import React,{Component} from 'react';
import firebase from './firebase';
import md5 from 'md5';
class Register extends Component {
     constructor(props) {
        super(props)
    
        this.state = {
            userName:"",
            password:"",
            errors:[],
            usersRef: firebase.database().ref("users")
        }
    }
      handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value })
    };
    submit=(e)=>{
       e.preventDefault();
            if(this.isFormVaild()){
                this.setState({ errors: [], loading: true })
                firebase.auth()
                .createUserWithEmailAndPassword(this.state.userName, this.state.password)
                .then(createuser=>{
                   console.log(createuser ,"createuser")
                   createuser.user.updateProfile({
                    displayName: this.state.userName,
                    photoURL: `http://gravatar.com/avatar/${md5(createuser.user.email)}?d=identicon`
                })
                .then(() => {
                    this.saveUserData(createuser).then(() =>
                        console.log("user saved sucsessfully")
                       
                     
                    )
                })
                .then(() => {
                    firebase.auth().currentUser.sendEmailVerification()
                        .then(alt => {
                            window.alert("verification link has sent to your mail please verify the account")
                            this.props.history.push('/login')
                        })
                })
                })
               
            }
        
        }
    isFormVaild = () => {
        let errors = [];
        let error;
        if (this.isFormEmpty(this.state)) {
            error = { message: "Please fill all the details" }
            this.setState({ errors: errors.concat(error) })
            return false
        }
        else if (!this.CheckPassword(this.state)) {
            error = { message: "Password is Invalid" }
            this.setState({ errors: errors.concat(error) })
            return false
        }
        else {
            return true
        }
    }
    saveUserData=(createuser)=>{
        return this.state.usersRef.child(createuser.user.uid).set({
            name: createuser.user.displayName,
            avatar: createuser.user.photoURL
        })

    }
    isFormEmpty = ({ userName, password}) => {
        return !userName.length  || !password.length 
    }
    CheckPassword = ({ password }) => {
        if (password.length < 6) {
            return false
        }
        else {
            return true
        }
    }
    render() {
        return (
            <div>
                <div className="col-md-6">
                    <h1>Register</h1>
                    <form onSubmit={this.submit}>
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
export default Register;