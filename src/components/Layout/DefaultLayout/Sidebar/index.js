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
    },
    {
        name: 'Phòng ban',
        icon: <CiHome />,
        path: '/Department',
    },
    {
        name: 'Chức vụ',
        icon: <FaRegUser />,
        path: '/Position',
    },
    {
        name: 'Nhân viên',
        icon: <FaUserGraduate />,
        path: '/Employee',
    },
    {
        name: 'Công tác',
        icon: <MdOutlineWork />,
        path: '/Work',
    },
    {
        name: 'Chấm công',
        icon: <MdOutlineWork />,
        path: '/Attendance',
    },
    {
        name: 'Quản lý lương',
        icon: <FaMoneyBillAlt />,
        path: '/Salary',
    },
    {
        name: 'Hợp đồng',
        icon: <FaBook />,
        path: '/Contract',
    },
    {
        name: 'Bảo hiểm',
        icon: <MdOutlineWork />,
        path: '/Benefits',
    },
];

function Sidebar() {
    return (
        <div className={cx('leftbar__wrap')}>
            <ul className={cx('leftbar')}>
                <li className={cx('leftbar__title')}>Menu</li>
                {data.map((data, index) => {
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
