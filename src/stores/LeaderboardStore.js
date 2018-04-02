import _ from 'lodash';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';
import Leaderboard from '../records/Leaderboard';

class LeaderboardStore extends BaseStore {
    constructor ({ storeName, type }) {
        super({ storeName, type });

        AppDispatcher.register(payload => {
            switch (payload.actionType) {
                case ActionTypes.ADD_PLAYER:
                    this.addPlayer(payload);
                    break;
                default:
                    _.noop();
            }
        });
    }

    addPlayer ({ player }) {
        this.updateState(this.state.set('players', this.state.get('players').push(player)));
    }
}

const instance = new LeaderboardStore({ storeName: 'leaderboard', type: Leaderboard });

export default instance;
