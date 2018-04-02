import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';
import ActionTypes from '../constants/ActionTypes';
import GameRecord from '../records/Game';

class CurrentGameStore extends BaseStore {
    constructor({ storeName, type }) {
        super({ storeName, type });

        AppDispatcher.register(payload => {
            switch (payload.actionType) {
                case ActionTypes.SET_UP_NEW_GAME:
                    this.refreshStore();
                    break;
                case ActionTypes.UPDATE_SETTINGS:
                    this.updateSettings(payload);
                    break;
                case ActionTypes.START_NEW_ROUND:
                    this.startNewRound();
                    break;
                default:
                    _.noop();
            }
        });
    }

    refreshStore () {
        this.updateState(new GameRecord());
    }

    updateSettings ({ settings }) {
        this.updateState(this.state.set('settings', settings));
    }

    startNewRound () {
        // if (this.state.hasStarted) update overall scores with previous round?
        this.updateState(this.state.startNewRound());
    }

}

const instance = new CurrentGameStore({ storeName: 'current-game', type: GameRecord });

export default instance;
