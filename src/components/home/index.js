import React from 'react';
import PropTypes from 'prop-types';

import GameActions from '../../actions/GameActions';
import connectToStores from '../../helpers/connectToStores';
import GameRecord from '../../records/Game';
import CurrentGameStore from '../../stores/CurrentGameStore';

import MenuLink from './MenuLink';

function _getStateFromStores () {
    const currentGame = CurrentGameStore.getAll();
    return { currentGame };
}

class Home extends React.PureComponent {
    static propTypes = {
        currentGame: PropTypes.instanceOf(GameRecord)
    }

    render () {
        const { currentGame } = this.props;
        return (
            <div className="home-menu">
                <MenuLink to="/setup" label="Start new game" onClick={ GameActions.setUpNewGame }/>
                { currentGame.isBeingSetUp() &&
                    <MenuLink to="/setup" label="Continue setting up last"/> }
                { currentGame.hasStarted() &&
                    <MenuLink to="/game" label="Continue current game" /> }
                <MenuLink to="/leaderboard" label="View leaderboard" />
            </div>
        );
    }
}

export default connectToStores(Home, [CurrentGameStore], _getStateFromStores);
