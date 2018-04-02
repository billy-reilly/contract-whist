import { Record as record, List } from 'immutable';

import Player from './Player';

const defaults = {
    players: new List()
};

export default class Leaderboard extends record(defaults) {
    static fromJSON(json) {
        if (json) {
            const { players } = json;
            return new Leaderboard({
                players: List.of(...players.map(player => new Player(player)))
            });
        }
        return new Leaderboard();
    }

    matchesSavedPlayer(player) {
        return this.get('players').some(p =>
            player.get('name').toLowerCase() === p.get('name').toLowerCase());
    }

    searchPlayers (searchString, listToIgnore) {
        if (searchString) {
            const searchRegex = new RegExp(searchString.toLowerCase());
            return this.get('players').filter(player =>
                searchRegex.test(player.get('name').toLowerCase())
                && !listToIgnore.includes(player));
        }
        return new List();
    }
}
