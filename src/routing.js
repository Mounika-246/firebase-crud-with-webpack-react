import React,{Component} from 'react';
import {BrowserRouter , Route,Switch} from 'react-router-dom';
import Register from './FireBaseregister';
import Login from './firebaseLogin';
import Home from './Home';
import PostDataTofirebase from './postDataTofirebase';
import GetdataFromFirebase from './getdataFromFirebase';

class Routing extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                    {/* firebase authentication
                         <Route exact={true} path="/" component={Register} /> */}
                        <Route exact={true} path="/" component={PostDataTofirebase} />
                        <Route path="/get" component={GetdataFromFirebase} />
                        
                        <Route path="/login" component={Login} />

                        <Route path="/home" component={Home} />
                    </Switch>
                </BrowserRouter>
            </div>
        )

    }

}
export default Routing;