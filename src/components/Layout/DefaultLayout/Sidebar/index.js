import classNames from 'classnames/bind';
import { FaRegUser, FaUserGraduate, FaMoneyBillAlt, FaBook } from 'react-icons/fa';
import { CiHome } from 'react-icons/ci';
import { MdOutlineWork } from 'react-icons/md';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

const data = [
    {
        name: 'Trang chủ',
        icon: <CiHome />,
        path: '/',
        role: false,
    },
    {
        name: 'Phòng ban',
        icon: <CiHome />,
        path: '/Department',
        role: false,
    },
    {
        name: 'Chức vụ',
        icon: <FaRegUser />,
        path: '/Position',
        role: false,
    },
    {
        name: 'Nhân viên',
        icon: <FaUserGraduate />,
        path: '/Employee',
        role: false,
    },
    {
        name: 'Công tác',
        icon: <MdOutlineWork />,
        path: '/Work',
        role: true,
    },
    {
        name: 'Chấm công',
        icon: <MdOutlineWork />,
        path: '/Attendance',
        role: false,
    },
    {
        name: 'Quản lý lương',
        icon: <FaMoneyBillAlt />,
        path: '/Salary',
        role: false,
    },
    {
        name: 'Hợp đồng',
        icon: <FaBook />,
        path: '/Contract',
        role: false,
    },
    {
        name: 'Bảo hiểm',
        icon: <MdOutlineWork />,
        path: '/Benefits',
        role: false,
    },
];

function Sidebar() {
    let json = JSON.parse(sessionStorage.getItem('Auth')) || [];
    if (json) {
        var filteredData = json?.Id === 1 ? data : data.filter((item) => item.role === true);
    }
    return (
        <div className={cx('leftbar__wrap')}>
            <ul className={cx('leftbar')}>
                <li className={cx('leftbar__title')}>Menu</li>
                {filteredData.map((data, index) => {
                    return (
                        <li className={cx('leftbar__item')} key={index}>
                            <a href={data.path}>
                                {data.icon}
                                <p>{data.name}</p>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
