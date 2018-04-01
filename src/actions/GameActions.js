import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

const GameActions = {

    setUpNewGame () {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_UP_NEW_GAME
        });
    },

    updateSettings (settings) {
        AppDispatcher.dispatch({
            settings,
            actionType: ActionTypes.UPDATE_SETTINGS
        });
    },

    startNewRound () {
        AppDispatcher.dispatch({
            actionType: ActionTypes.START_NEW_ROUND
        });
    }

};

export default GameActions;
