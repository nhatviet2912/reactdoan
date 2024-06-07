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
import Login from '~/pages/Login';
import DefautLogin from '~/components/Layout/LayoutLogin';
import SignIn from '~/pages/Login/SingIn';
import User from '~/pages/User';
import DetailsRole from '~/pages/Attendance/detailsRole';
import Recognition from '~/pages/Recognition';

const publicRoutes = [
    { path: '/', components: Home },
    { path: '/Department', components: Department },
    { path: '/Position', components: Follwing },
    { path: '/Employee', components: Employee },
    { path: '/Work', components: Work },
    { path: '/Attendance', components: Attendance },
    { path: '/Attendance/DetailMonth', components: DetailMonth },
    { path: '/Attendance/DetailRole', components: DetailsRole },
    { path: '/Contract', components: Contract },
    { path: '/Salary', components: Salary },
    { path: '/Benefits', components: Benefits },
    { path: '/User', components: User },
    { path: '/Recognition', components: Recognition },
    { path: '/Login', components: Login, layout: DefautLogin },
    { path: '/SignIn', components: SignIn, layout: DefautLogin },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
