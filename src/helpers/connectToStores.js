/*
 * adapted from https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
 */

import React from 'react';

export default function connectToStores(Component, stores, getStateFromStores) {
    return class StoreConnection extends React.PureComponent {

        state = getStateFromStores();

        componentDidMount() {
            stores.forEach(store => {
                store.addChangeListener(this.handleStoresChanged)
            });
            this._isMounted = true;
        }

        componentWillUnmount() {
            stores.forEach(store => {
                store.removeChangeListener(this.handleStoresChanged)
            });
            this._isMounted = false
        }

        handleStoresChanged = () => {
            if (this._isMounted) {
                this.setState(getStateFromStores());
            }
        }

        render() {
            return <Component { ...this.state } />;
        }
    };
}
