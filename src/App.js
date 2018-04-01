import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import routes from './constants/routes';
import config from './constants/config';

import TopNav from './components/nav/TopNav';
import Home from './components/home';

import './styles/main.css';

export default class App extends React.PureComponent {

    render() {
        const colWidths = config.get('mainContentColWidths');
        return (
            <div className="app-container container-fluid">
                <Row>
                    <Router>
                        <div>
                            <TopNav />
                            <section className="main container-fluid">
                                <Row>
                                    <Col { ...colWidths }>
                                        <Switch>
                                            { routes.map((route, index) => (
                                                <Route key={ index }
                                                    exact={ route.exact }
                                                    path={ route.path }
                                                    component={ route.component } />
                                            )) }
                                            <Route component={ Home } />
                                        </Switch>
                                    </Col>
                                </Row>
                            </section>
                        </div>
                    </Router>
                </Row>
            </div>
        );
    }
}
