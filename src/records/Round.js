import { Record as record, List } from 'immutable';

const defaults = {
    players: new List(), // names in order of play
    bets: new List(),
    tricks: new List()
};

export default class Round extends record(defaults) {
    static withPlayers (players) {
        return new Round({ 'players': players.map(player => player.get('name')) });
    }
}
