import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './routing';
import './firebase';
import '../app.scss';
class App extends React.Component {
    render() {
        return (
            <div>
             
                <Routing />
            

            </div>
        )

    }

}

ReactDOM.render(<App />, document.getElementById("root"))
