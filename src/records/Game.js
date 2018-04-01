import { Record as record, List } from 'immutable';

import Settings from './Settings';
import Round from './Round';

const defaults = {
    settings: new Settings(),
    rounds: new List()
};

export default class Game extends record(defaults) {
    static fromJSON (json) {
        const { settings, rounds } = json;
        return new Game({
            settings: Settings.fromJSON(settings),
            rounds: List.of(...rounds.map(round => new Round(round)))
        });
    }

    get players () {
        return this.settings.get('players');
    }

    startNewRound () {
        const newRound = Round.withPlayers(this.players);
        return this.set('rounds', this.rounds.push(newRound));
    }

    hasStarted () {
        return this.rounds.size > 0;
    }

    isBeingSetUp () {
        return this.players.size > 0 && !this.hasStarted();
    }

    // hasFinished () {}

    // calculateNextDealer () {}
}
