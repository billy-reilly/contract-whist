import _ from 'lodash';

export default class Step {
    name = null;
    element = _.noop;
    elementProps = {};

    nextText = 'Save and continue';
    backText = 'Back';

    nextDisabled = false;
    backDisabled = false;

    hideNext = false;
    hideBack = false;

    nextAction = _.noop;
    backAction = _.noop;

    constructor (params = {}) {
        _.forOwn(this, (value, key) => {
            if (params[key]) {
                this[key] = params[key];
            }
        });
    }
}
