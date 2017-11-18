import React from 'react';

import MenuLink from './MenuLink';

export default function Menu () {
    return (
        <div className="home-menu">
            <MenuLink to="/setup" label="Start new game" />
            <MenuLink to="/game" label="Continue current game" />
            <MenuLink to="/leaderboard" label="Leaderboard" />
        </div>
    );
}
