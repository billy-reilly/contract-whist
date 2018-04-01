import React from 'react';
import PropTypes from 'prop-types';

import Settings from '../../records/Settings';
import Step from '../general/steppableInterface/Step';

import connectToStores from '../../helpers/connectToStores';
import GameActions from '../../actions/GameActions';
import CurrentGameStore from '../../stores/CurrentGameStore';

import SteppableInterface from '../general/steppableInterface';
import Players from './Players';
import Options from './Options';

function _getStateFromStore () {
    return {
        settings: CurrentGameStore.getAll().get('settings')
    };
}

class Setup extends React.PureComponent {

    static propTypes = {
        settings: PropTypes.instanceOf(Settings)
    };

    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.shape({
                push: PropTypes.func
            })
        })
    };

    handleAddPlayer = (name) => {
        GameActions.updateSettings(this.props.settings.addPlayer(name));
    };

    handleRemovePlayer = (name) => {
        GameActions.updateSettings(this.props.settings.removePlayer(name));
    };

    handleToggleCheckbox = (field) => () => {
        GameActions.updateSettings(
            this.props.settings.set(field, !this.props.settings.get(field))
        );
    };

    steps = () => {
        const { settings } = this.props;
        return [
            new Step({
                name: 'Enter players',
                element: Players,
                elementProps: {
                    players: settings.get('players'),
                    onAddPlayer: this.handleAddPlayer,
                    onRemovePlayer: this.handleRemovePlayer
                },
                nextDisabled: settings.hasTooFewPlayers(),
                hideBack: true
            }),
            new Step({
                name: 'Select options',
                element: Options,
                elementProps: {
                    settings: settings,
                    onToggleCheckbox: this.handleToggleCheckbox
                },
                nextAction: () => {
                    GameActions.startNewRound();
                    this.context.router.history.push('/game');
                }
            })
        ];
    };

    render () {
        return (
            <div className="setup__wrapper">
                <SteppableInterface steps={ this.steps() }/>
            </div>
        );
    }
}

export default connectToStores(Setup, [ CurrentGameStore ], _getStateFromStore);
