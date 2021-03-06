import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ExternalLink from './ExternalLink';

export default function TopNav () {
    return (
        <div role="navigation" className="top-nav">
            <div className="container">
                <Link to="/" className="home-link">
                    <h1>Contract Whist</h1>
                </Link>
                <div className="pull-right">
                    <ExternalLink url="https://www.theguardian.com/lifeandstyle/2008/nov/22/rules-card-games-oh-hell" glyphicon="list-alt" description="Rules"/>
                    <ExternalLink url="https://github.com/billy-reilly/contract-whist" glyphicon="console" description="Source code" />
                </div>
            </div>
        </div>
    );
}
