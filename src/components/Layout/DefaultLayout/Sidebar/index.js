import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faSearch, faBookmark } from '@fortawesome/free-solid-svg-icons';


import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

const data = [
    {
        name: 'Tổng quan',
        icon: faAlignLeft,
        path: '/'
    },
    {
        name: 'Followings',
        icon: faAlignLeft,
        path: '/Follwing'
    }
]

function Sidebar() {
    return (
        <div className={cx('leftbar__wrap')}>
            <ul className={cx('leftbar')}>
                <li className={cx('leftbar__title')}>
                    Menu
                </li>
                {data.map((data, index) => {
                    return (
                        <li className={cx('leftbar__item')} key={index}>
                            <a href={data.path}>
                                <FontAwesomeIcon icon={data.icon} />
                                <p>{data.name}</p>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
