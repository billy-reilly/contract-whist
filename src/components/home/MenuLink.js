import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function MenuButton (props) {
    return (
        <Link to={ props.to } className="home-menu__button">
            <Button bsStyle="default" bsSize="lg">
                <h3>{ props.label }</h3>
            </Button>
        </Link>
    );
}

MenuButton.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};
