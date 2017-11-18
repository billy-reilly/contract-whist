import React from 'react';
import { Checkbox } from 'react-bootstrap';

import Players from './Players';

import Settings from '../../records/Settings';

export default class Setup extends React.PureComponent {
    state = {
        settings: new Settings()
    }

    handleAddPlayer = (name) => {
        this.setState({ 'settings': this.state.settings.addPlayer(name) })
    }

    handleToggleCheckbox = (field) => () => {
        this.setState({ 'settings': this.state.settings.set(field, !this.state.settings.get(field)) })
    }

    render () {
        console.log(this.state.settings);
        return (
            <div>
                <h2>Settings</h2>
                <Players players={ this.state.settings.get('players') }
                         onAddPlayer={ this.handleAddPlayer } />
                <Checkbox checked={ this.state.settings.get('chooseOwnDealer') } 
                          onChange={ this.handleToggleCheckbox('chooseOwnDealer') }
                          inline>
                    Choose your own dealer
                </Checkbox>
                <br/>
                <Checkbox checked={ this.state.settings.get('shortGame') } 
                          onChange={ this.handleToggleCheckbox('shortGame') }
                          inline>
                    Play fast games (7 rounds instead of 13)
                </Checkbox>
            </div>
        );
    }
}
