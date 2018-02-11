import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Step from './Step';

import StepHeader from './StepHeader';
import StepFooter from './StepFooter';

export default class SteppableInterface extends React.PureComponent {
    static propTypes = {
        steps: PropTypes.arrayOf(PropTypes.instanceOf(Step)).isRequired
    };

    state = {
        number: 0,
        // loading: false
    };

    goNext = () => {
        const { steps } = this.props;
        const { number } = this.state;
        const step = steps[number];
        if (step) {
            step.nextAction();
            if (number < steps.length - 1) {
                this.setState({ number: number + 1 });
            }
        }
    };

    goBack = () => {
        const { steps } = this.props;
        const { number } = this.state;
        const step = steps[number];
        if (step) {
            step.backAction();
            if (number > 0) {
                this.setState({ number: number - 1 });
            }
        }
    }

    render () {
        const { steps } = this.props;
        const { number } = this.state;
        const step = steps[number];
        const Element = step.element;
        const footerProps = _.pick(step,
            ['nextText', 'backText', 'nextDisabled', 'backDisabled', 'hideNext', 'hideBack']);
        return (
            <div>
                <StepHeader number={ number + 1 }
                            totalSteps={ steps.length }
                            name={ step.name } />
                <Element { ...step.elementProps } />
                <StepFooter { ...footerProps }
                            onNext={ this.goNext }
                            onBack={ this.goBack } />
            </div>
        );
    };
}
