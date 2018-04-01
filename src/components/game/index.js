import React from 'react';
import PropTypes from 'prop-types';

import connectToStores from '../../helpers/connectToStores';
import CurrentGameStore from '../../stores/CurrentGameStore';
import GameRecord from '../../records/Game';

function _getStateFromStores () {
    const currentGame = CurrentGameStore.getAll();
    return { currentGame };
}

class Game extends React.PureComponent {
    static propTypes = {
        currentGame: PropTypes.instanceOf(GameRecord)
    };

    render () {
        return (
            <div>
                TODO: Game view
            </div>
        );
    }
}

export default connectToStores(Game, [ CurrentGameStore ], _getStateFromStores);
