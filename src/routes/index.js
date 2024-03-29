import Home from '~/pages/Home';
import Follwing from '~/pages/Position';

const publicRoutes = [
    { path: '/', components: Home },
    { path: '/Position', components: Follwing },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
