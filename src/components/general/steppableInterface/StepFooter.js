import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'react-bootstrap';

export default function StepFooter ({
    nextText,
    backText,
    nextDisabled,
    backDisabled,
    hideNext,
    hideBack,
    onNext,
    onBack,
    // loading
}) {
    return (
        <div className="step-footer">
            <hr/>
            { !hideNext && <Button bsStyle="primary"
                                   className="pull-right"
                                   onClick={ onNext }
                                   disabled={ nextDisabled }>
                { nextText }
            </Button> }
            { !hideBack && <Button bsStyle="default"
                                   className="pull-left"
                                   onClick={ onBack }
                                   disabled={ backDisabled }>
                { backText }
            </Button> }
        </div>
    );
}

StepFooter.propTypes = {
    nextText: PropTypes.string,
    backText: PropTypes.string,
    nextDisabled: PropTypes.bool,
    backDisabled: PropTypes.bool,
    hideNext: PropTypes.bool,
    hideBack: PropTypes.bool,
    onNext: PropTypes.func,
    onBack: PropTypes.func,
    // loading: PropTypes.bool
}

StepFooter.defaultProps = {
    nextText: 'Continue',
    backText: 'Back',
    nextDisabled: false,
    backDisabled: false,
    hideNext: false,
    hideBack: false,
    onNext: _.noop,
    onBack: _.noop,
    // loading: false
}
