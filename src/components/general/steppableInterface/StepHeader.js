import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Label } from 'react-bootstrap';

export default function StepHeader ({ name, number, totalSteps }) {
    const progress = `(${number}/${totalSteps})`;
    const content = () => (
        <div className="clearfix">
            <Label bsStyle="primary" className="pull-left">{ number }</Label>
            <h4 className="pull-left">{ name }</h4>
            <em className="pull-right">{ progress }</em>
        </div>
    );
    return (
        <div className="step-header">
            <Panel header={ content() }/>
        </div>
    );
}

StepHeader.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired
}
