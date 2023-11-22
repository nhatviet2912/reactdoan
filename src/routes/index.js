import Home from '~/pages/Home';
import Follwing from '~/pages/Follwing';

const publicRoutes = [
    { path: '/', components: Home },
    { path: '/Follwing', components: Follwing },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
