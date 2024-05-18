import Attendance from '~/pages/Attendance/index';
import Employee from '~/pages/Employee';
import Department from '~/pages/Deparmtent';
import Follwing from '~/pages/Position';
import Work from '~/pages/Work';
import DetailMonth from '~/pages/Attendance/month';
import Contract from '~/pages/Contract';
import Salary from '~/pages/Salary';
import Benefits from '~/pages/Benefits';
import Home from '~/pages/Home';

const publicRoutes = [
    { path: '/', components: Home },
    { path: '/Department', components: Department },
    { path: '/Position', components: Follwing },
    { path: '/Employee', components: Employee },
    { path: '/Work', components: Work },
    { path: '/Attendance', components: Attendance },
    { path: '/Attendance/DetailMonth', components: DetailMonth },
    { path: '/Contract', components: Contract },
    { path: '/Salary', components: Salary },
    { path: '/Benefits', components: Benefits },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
