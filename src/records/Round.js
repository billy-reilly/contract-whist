import { Record as record, List } from 'immutable';

const defaults = {
    players: new List(), // names in order of play
    bets: new List(),
    tricks: new List()
};

export default class Round extends record(defaults) {
    static fromJSON (json) {
        const { players, bets, tricks } = json;
        return new Round({
            players: List.of(players),
            bets: List.of(bets),
            tricks: List.of(tricks)
        });
    }

    static withPlayers (players) { // should also take last dealer and set this round's dealer as a field in the record
        return new Round({ 'players': players.map(player => player.get('name')) });
    }
}
