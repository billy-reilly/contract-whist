import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Button } from 'react-bootstrap';

export default class Players extends React.PureComponent {
    static propTypes = {
        players: PropTypes.instanceOf(List),
        onAddPlayer: PropTypes.func.isRequired
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

    onClick = () => {
        this.props.onAddPlayer(this.state.value);
        this.setState({ value: '' });
    }

    render () {
        const { players } = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Players</div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        { players.map((player, key) => {
                            const points = player.points > 0 ? player.points : 'New player';
                            return (<tr key={ key }>
                                <td>{ key + 1 }</td>
                                <td>{ player.name }</td>
                                <td>{ points }</td>
                            </tr>);
                        }) }
                        <tr>
                            <td>{ players.size + 1 }</td>
                            <td>
                                <input type="text" value={ this.state.value } onChange={ this.handleChange }/>
                            </td>
                            <td><Button onClick={ this.onClick }>Add player</Button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
