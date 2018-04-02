import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

const LeaderboardActions = {
    addPlayer (player) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.ADD_PLAYER,
            player
        });
    }
};

export default LeaderboardActions;
