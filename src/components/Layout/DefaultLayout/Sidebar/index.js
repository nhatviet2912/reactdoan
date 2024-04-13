import classNames from 'classnames/bind';
import { FaRegUser, FaUserGraduate } from 'react-icons/fa';
import { CiHome } from 'react-icons/ci';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

const data = [
    {
        name: 'Phòng ban',
        icon: <CiHome />,
        path: '/',
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
