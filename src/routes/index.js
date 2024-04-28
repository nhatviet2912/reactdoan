import Attendance from '~/pages/Attendance/index';
import Employee from '~/pages/Employee';
import Home from '~/pages/Home';
import Follwing from '~/pages/Position';
import Work from '~/pages/Work';
import DetailMonth from '~/pages/Attendance/month';

const publicRoutes = [
    { path: '/', components: Home },
    { path: '/Position', components: Follwing },
    { path: '/Employee', components: Employee },
    { path: '/Work', components: Work },
    { path: '/Attendance', components: Attendance },
    { path: '/Attendance/DetailMonth', components: DetailMonth },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
