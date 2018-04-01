import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Button, FormControl } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { playerLimits } from '../../constants/AppConstants';

export default class Players extends React.PureComponent {
    static propTypes = {
        players: PropTypes.instanceOf(List),
        onAddPlayer: PropTypes.func.isRequired,
        onRemovePlayer: PropTypes.func.isRequired
    };

    static defaultProps = {
        players: new List()
    };

    state = {
        value: ''
    }

    handleChange = (e) => {
        this.setState({ 'value': e.target.value });
    }

    onAddPlayer = () => {
        this.props.onAddPlayer(this.state.value);
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
        const { players } = this.props;
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
                                        <FormControl type="text"
                                            value={ this.state.value }
                                            onChange={ this.handleChange }
                                            inputRef={ el => { this.inputEl = el; } }/>
                                    </td>
                                    <td width="100">
                                        <Button onClick={ this.onAddPlayer }>Add player</Button>
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
