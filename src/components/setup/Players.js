import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Button } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { playerLimits } from '../../constants/AppConstants';
import Player from '../../records/Player';
import Leaderboard from '../../records/Leaderboard';
import LeaderboardActions from '../../actions/LeaderboardActions';
import LeaderboardStore from '../../stores/LeaderboardStore';
import connectToStores from '../../helpers/connectToStores';

import PlayerInput from './PlayerInput';

function _getStateFromStores () {
    const leaderboard = LeaderboardStore.getAll();
    return { leaderboard };
}

class Players extends React.PureComponent {
    static propTypes = {
        players: PropTypes.instanceOf(List),
        leaderboard: PropTypes.instanceOf(Leaderboard),
        onAddPlayer: PropTypes.func.isRequired,
        onRemovePlayer: PropTypes.func.isRequired
    };

    static defaultProps = {
        players: new List(),
        leaderboard: new Leaderboard()
    };

    state = {
        value: ''
    }

    handleChange = (e) => {
        this.setState({ 'value': e.target.value });
    }

    onAddNewPlayer = () => {
        const player = new Player({ name: this.state.value });
        if (!this.props.leaderboard.matchesSavedPlayer(player)) {
            LeaderboardActions.addPlayer(player);
        }
        this.handleAddPlayer(player);
    }

    handleAddPlayer = player => {
        this.props.onAddPlayer(player);
        this.setState({ value: '' });
        this.inputEl.focus();
    }

    onRemovePlayer = name => () => {
        this.props.onRemovePlayer(name);
        if (this.inputEl) {
            this.inputEl.focus();
        }
    }

    render () {
        const { players, leaderboard } = this.props;
        const tooFew = players.size < playerLimits.min;
        const tooMany = players.size >= playerLimits.max;
        return (
            <div>
                <div className="players-panel panel panel-default">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th width="60"/>
                                <th>Name</th>
                                <th width="100">Points</th>
                                <th width="45"/>
                            </tr>
                        </thead>
                        <ReactCSSTransitionGroup
                            component="tbody"
                            transitionName="player-rows"
                            transitionEnterTimeout={ 200 }
                            transitionLeaveTimeout={ 200 }>
                            { players.map((player, key) => {
                                const points = player.get('points') > 0
                                    ? player.get('points') : 'New player';
                                return (<tr key={ key }>
                                    <td width="60">{ key + 1 }</td>
                                    <td>{ player.get('name') }</td>
                                    <td width="100">{ points }</td>
                                    <td width="45">
                                        <Button bsStyle="link"
                                            onClick={ this.onRemovePlayer(player.name) }>
                                            <span className="glyphicon glyphicon-remove-circle" />
                                        </Button>
                                    </td>
                                </tr>);
                            }) }
                            { players.size < playerLimits.max &&
                                <tr>
                                    <td width="60">{ players.size + 1 }</td>
                                    <td>
                                        <PlayerInput onChange={ this.handleChange }
                                            chosenPlayers={ players }
                                            leaderboard={ leaderboard }
                                            onSelectExisting={ this.handleAddPlayer }
                                            inputValue={ this.state.value }
                                            inputRef={ el => { this.inputEl = el; } } />
                                    </td>
                                    <td width="100">
                                        <Button onClick={ this.onAddNewPlayer }>Add player</Button>
                                    </td>
                                    <td width="45"/>
                                </tr> }
                        </ReactCSSTransitionGroup>
                    </table>
                </div>
                { (tooFew || tooMany) && (<div>
                    <em>
                        { tooFew ? 'Min. 3 players' : 'Max. 7 players' }
                    </em>
                </div>) }
            </div>
        );
    }
}
export default connectToStores(Players, [ LeaderboardStore ], _getStateFromStores);
