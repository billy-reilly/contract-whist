import { Record as record, List } from 'immutable';

import Player from './Player';

const defaults = {
    players: new List(),
    chooseOwnDealer: false,
    shortGame: false
};

export default class Settings extends record(defaults) {
    hasTooFewPlayers () {
        return this.players.size <= 3;
    }

    hasMaxPlayers () {
        return this.players.size >= 7;
    }

    addPlayer (name) {
        const newPlayers = this.players.push(new Player({ name }));
        return this.set('players', newPlayers);
    }

    removePlayer (name) {
        const indexToRemove = this.players.findIndex(player => player.get('name') === name);
        return this.set('players', this.players.delete(indexToRemove));
    }
}
