import React from 'react';
import PropTypes from 'prop-types';

import { playerLimits } from '../../constants/AppConstants';
import Settings from '../../records/Settings';
import Step from '../general/steppableInterface/Step';

import connectToStores from '../../helpers/connectToStores';
import SettingsActions from '../../actions/SettingsActions';
import SettingsStore from '../../stores/SettingsStore';

import SteppableInterface from '../general/steppableInterface';
import Players from './Players';
import Options from './Options';

function _getStateFromStore () {
    return {
        settings: SettingsStore.getAll()
    }
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
        SettingsActions.updateSettings(this.props.settings.addPlayer(name));
    }

    handleRemovePlayer = (name) => {
        SettingsActions.updateSettings(this.props.settings.removePlayer(name));
    }

    handleToggleCheckbox = (field) => () => {
        SettingsActions.updateSettings(
            this.props.settings.set(field, !this.props.settings.get(field))
        );
    }

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
                nextDisabled: settings.get('players').size < playerLimits.get('min'),
                hideBack: true
            }),
            new Step({
                name: 'Select options',
                element: Options,
                elementProps: {
                    settings: settings,
                    onToggleCheckbox: this.handleToggleCheckbox
                },
                nextAction: () => this.context.router.history.push('/')
            })
        ];
    }

    render () {
        return (
            <div className="setup__wrapper">
                <SteppableInterface steps={ this.steps() }/>
            </div>
        );
    }
}

export default connectToStores(Setup, [ SettingsStore ], _getStateFromStore);
