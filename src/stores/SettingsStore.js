import { fromJS } from 'immutable'

import BaseStore from './BaseStore';
import ActionTypes from '../constants/ActionTypes';
import Settings from '../records/Settings';
import Player from '../records/Player';

class SettingsStore extends BaseStore {

    getActionHandlers () {
        return {
            [ActionTypes.UPDATE_SETTINGS]: this.updateSettings
        };
    }

    updateSettings ({ settings }) {
        this.updateState(settings);
    }

    getStateFromLocalStorage () {
        const savedJSONState = localStorage.getItem(this.storeName);
        if (savedJSONState) {
            const immutableData = fromJS(JSON.parse(savedJSONState));
            const correctedPlayers = immutableData.get('players').map(data => new Player(data));
            return new Settings(immutableData.set('players', correctedPlayers));
        }
        return new Settings();
    }

}

const instance = new SettingsStore({ storeName: 'settings' });

export default instance;
