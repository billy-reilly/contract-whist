/* eslint-disable react/no-multi-comp */

import React from 'react';
import { Redirect } from 'react-router-dom';

const routes = [
    {
        path: '/',
        exact: true,
        component: () => <div>HOME PAGE</div>
    },
];

export default routes;
