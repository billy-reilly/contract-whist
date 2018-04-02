import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { List } from 'immutable';
import classnames from 'classnames';

import Leaderboard from '../../records/Leaderboard';

export default class PlayerInput extends React.PureComponent {
    static propTypes = {
        chosenPlayers: PropTypes.instanceOf(List),
        leaderboard: PropTypes.instanceOf(Leaderboard),
        onChange: PropTypes.func.isRequired,
        onSelectExisting: PropTypes.func.isRequired,
        inputValue: PropTypes.string,
        inputRef: PropTypes.func.isRequired
    };

    static defaultProps = {
        chosenPlayers: new List(),
        leaderboard: new Leaderboard(),
        inputValue: ''
    };

    state = {
        suggestions: new List(),
        highlighted: -1,
        showSuggestions: false
    }

    componentWillReceiveProps (newProps) {
        const { inputValue, leaderboard, chosenPlayers } = this.props;
        if (newProps.inputValue !== inputValue) {
            this.setState({ suggestions: leaderboard.searchPlayers(newProps.inputValue, chosenPlayers) });
        }
    }

    handleChange = event => {
        this.setState({ highlighted: -1, showSuggestions: true });
        this.props.onChange(event);
    };

    hideSuggestions = () => {
        this.setState({ showSuggestions: false });
    }

    highlightPrevious = () => {
        let { highlighted } = this.state;
        if (highlighted >= 0) {
            highlighted -= 1;
            this.setState({ highlighted });
        }
    };

    highlightNext = () => {
        let { highlighted, suggestions } = this.state;
        if (highlighted <= suggestions.size) {
            highlighted += 1;
            this.setState({ highlighted });
        }
    };

    selectHighlighted = event => {
        const { suggestions, highlighted } = this.state;
        const selected = suggestions.get(highlighted);
        if (selected) {
            this.props.onSelectExisting(suggestions.get(highlighted));
            event.preventDefault();
        }
    };

    selectClicked = player => () => {
        this.props.onSelectExisting(player);
    }

    handleKeyDown = event => {
        const { keyCode } = event;

        switch (keyCode) {
            case 38:
                this.highlightPrevious();
                event.preventDefault();
                break;
            case 40:
                this.highlightNext();
                event.preventDefault();
                break;
            case 13:
                this.selectHighlighted(event);
                break;
            case 9:
                this.selectHighlighted(event);
                break;
            case 27:
                this.hideSuggestions();
                event.preventDefault();
                break;
            default:
                _.noop();
        }
    };

    render () {
        const { suggestions, showSuggestions } = this.state;
        const { inputValue, inputRef } = this.props;
        return (
            <div className="player-input__container">
                <input type="text"
                    ref={ inputRef }
                    className="form-control"
                    value={ inputValue }
                    onChange={ this.handleChange }
                    onKeyDown={ this.handleKeyDown }
                    autoComplete="off"
                    autoCorrect="off"
                    onFocus={ this.showSuggestions }
                    onBlur={ this.hideSuggestions } />
                { showSuggestions &&
                    <div className="player-input__suggestion-wrapper">
                        { suggestions.map(player => {
                            const highlighted = this.state.highlighted === suggestions.indexOf(player);
                            const cn = classnames('player-input__suggestion', {
                                'player-input__suggestion--highlighted': highlighted
                            });
                            return (
                                <div key={ suggestions.indexOf(player) }
                                    className={ cn }
                                    onMouseDown={ this.selectClicked(player) }>
                                    <span>
                                        { player.get('name') }
                                    </span>
                                </div>
                            ); }) }
                    </div> }
            </div>
        );
    }
}
