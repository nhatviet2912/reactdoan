import Employee from '~/pages/Employee';
import Home from '~/pages/Home';
import Follwing from '~/pages/Position';

const publicRoutes = [
    { path: '/', components: Home },
    { path: '/Position', components: Follwing },
    { path: '/Employee', components: Employee },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
