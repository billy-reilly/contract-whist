/* eslint-disable react/no-multi-comp */

// import React from 'react';
// import { Redirect } from 'react-router-dom';

import Menu from '../components/home/Menu';
import Setup from '../components/setup/Setup';

const routes = [
    {
        path: '/',
        exact: true,
        component: Menu
    },
    {
        path: '/setup',
        component: Setup
    }
];

export default routes;
