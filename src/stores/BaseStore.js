import { EventEmitter } from 'events';
import { Map } from 'immutable';
import AppDispatcher from '../dispatcher/AppDispatcher';

const CHANGE_EVENT = 'change';

const EMITTERS = {};

export default class BaseStore {
    constructor({ storeName }) {
        Object.assign(this, { storeName });
        let emitter = new EventEmitter();
        emitter.setMaxListeners(0);
        EMITTERS[this.storeName] = emitter;
        this.registerActionHandlers();
        this.state = this.getStateFromLocalStorage();
    }

    registerActionHandlers () { // to change
        const handlers = this.getActionHandlers();
        if (handlers) {
            AppDispatcher.register((payload) => {
                return handlers[payload.actionType] && handlers[payload.actionType].call(this, payload);
            });
        }
    }

    addChangeListener (callback) {
        EMITTERS[this.storeName].on(CHANGE_EVENT, callback);
    }

    removeChangeListener (callback) {
        EMITTERS[this.storeName].on(CHANGE_EVENT, callback);
    }

    emitChange () {
        EMITTERS[this.storeName].emit(CHANGE_EVENT);
    }

    getAll () {
        return this.state;
    }

    getStateFromLocalStorage () {
        const savedJSONState = localStorage.getItem(this.storeName);
        if (savedJSONState) {
            return new Map(JSON.parse(savedJSONState));
        }
        return null;
    }

    setLocalStorage (newState) {
        localStorage.setItem(this.storeName, JSON.stringify(newState.toJS()));
    }

    updateState (newState) {
        this.state = newState;
        this.setLocalStorage(newState);
        this.emitChange();
    }
}
