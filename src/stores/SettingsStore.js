import AppDispatcher from '../dispatcher/AppDispatcher';

import BaseStore from './BaseStore';
import ActionTypes from '../constants/ActionTypes';
import Settings from '../records/Settings';

class SettingsStore extends BaseStore {
    constructor({ storeName, type }) {
        super({ storeName, type });

        AppDispatcher.register((payload) => {
            switch (payload.actionType) {
                case ActionTypes.UPDATE_SETTINGS:
                    this.updateSettings(payload);
                    break;
            }
        });
    }

    updateSettings ({ settings }) {
        this.updateState(settings);
    }

}

const instance = new SettingsStore({ storeName: 'settings', type: Settings });

export default instance;
