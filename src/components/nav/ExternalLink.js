import React from 'react';
import PropTypes from 'prop-types';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function TopNav ({ url, glyphicon, description }) {
    const tooltip = <Tooltip id="tooltip">{ description }</Tooltip>
    return (
        <OverlayTrigger placement="bottom" overlay={ tooltip }>
            <a className="external-link" target="_blank" href={ url }>
                <span className={ 'glyphicon glyphicon-' + glyphicon }/>
            </a>
        </OverlayTrigger>
    );
}

TopNav.propTypes = {
    url: PropTypes.string.isRequired,
    glyphicon: PropTypes.string.isRequired
}
