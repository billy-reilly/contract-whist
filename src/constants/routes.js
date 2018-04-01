import Home from '../components/home';
import Setup from '../components/setup';
import Game from '../components/game';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/setup',
        component: Setup
    },
    {
        path: '/game',
        component: Game
    }
];

export default routes;
