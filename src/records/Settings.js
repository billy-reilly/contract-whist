import { Record as record, List } from 'immutable';

import Player from './Player';
import { playerLimits } from '../constants/AppConstants';

const defaults = {
    players: new List(),
    chooseOwnDealer: false,
    shortGame: false
};

export default class Settings extends record(defaults) {
    static fromJSON (json) {
        if (json) {
            const { players, chooseOwnDealer, shortGame } = json;
            return new Settings({
                players: List.of(...players.map(player => new Player(player))),
                chooseOwnDealer,
                shortGame
            });
        }
        return new Settings();
    }

    hasTooFewPlayers () {
        return this.players.size < playerLimits.min;
    }

    // hasMaxPlayers () {
    //     return this.players.size >= playerLimits.max;
    // }

    addPlayer (player) {
        const newPlayers = this.players.push(player);
        return this.set('players', newPlayers);
    }

    removePlayer (name) {
        const indexToRemove = this.players.findIndex(player => player.get('name') === name);
        return this.set('players', this.players.delete(indexToRemove));
    }
}
