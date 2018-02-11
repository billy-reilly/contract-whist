import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

const SettingsActions = {

    updateSettings (settings) {
        AppDispatcher.dispatch({
            settings,
            actionType: ActionTypes.UPDATE_SETTINGS
        })
    }

};

export default SettingsActions;
