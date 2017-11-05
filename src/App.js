import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import routes from './constants/routes';

import './styles/main.css';

export default class App extends React.PureComponent {

    render() {
        return (
            <div className="App">
                <Router>
                    
                    <Switch>
                        { routes.map((route, index) => (
                            <Route key={ index }
                                exact={ route.exact }
                                path={ route.path }
                                component={ route.component } />
                        )) }
                        <Route component={ () => <div>redirected</div> } />
                    </Switch>

                </Router>
            </div>
        );
    }
}
