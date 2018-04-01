import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import _ from 'lodash';

import Settings from '../../records/Settings';

export default function Options ({ settings, onToggleCheckbox }) {
    return (
        <div>
            <Checkbox checked={ settings.get('chooseOwnDealer') }
                onChange={ onToggleCheckbox('chooseOwnDealer') }
                inline>
                Choose your own dealer
            </Checkbox>
            <br/>
            <Checkbox checked={ settings.get('shortGame') } 
                onChange={ onToggleCheckbox('shortGame') }
                inline>
                Fast games (7 rounds instead of 13)
            </Checkbox>
        </div>
    );
}

Options.propTypes = {
    settings: PropTypes.instanceOf(Settings).isRequired,
    onToggleCheckbox: PropTypes.func
}

Options.defaultProps = {
    onToggleCheckbox: _.noop
}
