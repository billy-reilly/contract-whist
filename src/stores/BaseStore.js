import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

export default class BaseStore extends EventEmitter {
    constructor({ storeName, type }) {
        super();
        this.storeName = storeName;
        this.type = type;
        this.state = this.getStateFromLocalStorage();
    }

    addChangeListener (callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange () {
        this.emit(CHANGE_EVENT);
    }

    getAll () {
        return this.state;
    }

    getStateFromLocalStorage () {
        const Type = this.type;
        const savedJSONState = localStorage.getItem(this.storeName);
        if (savedJSONState) {
            return Type.fromJSON(JSON.parse(savedJSONState));
        }
        return new Type();
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
