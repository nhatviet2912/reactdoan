import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faSearch, faBookmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Images';

import { IoIosLogOut } from 'react-icons/io';

const cx = classNames.bind(styles);

function Header() {
    const handleLogOut = () => {
        sessionStorage.clear();
        window.location.href = '/Login';
    };

    return (
        <header className={cx('header')}>
            <div className={cx('navbar__header')}>
                <div className={cx('navbar__container')}>
                    <div className={cx('navbar__brand')}>
                        <a className={cx('navbar__brand-logo')} href="../index.html">
                            <Image
                                className={cx('img-cover-center')}
                                src="https://aiacademy.edu.vn/assets/images/logo.jpg"
                                alt="logo-it-utehy"
                            />
                        </a>
                        <h3>AIACADEMY</h3>
                    </div>

                    <Button size effect dropdown__btn>
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </Button>

                    <form className={cx('navbar__search')}>
                        <div className={cx('navbar__search-wrap')}>
                            <input type="text" className={cx('navbar__search-input')} placeholder="Tìm kiếm..." />
                            <span className={cx('navbar__search-icon')}>
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </form>
                </div>

                <div className={cx('navbar__container')}>
                    <div className={cx('navbar__dropdown')}>
                        <Button size effect dropdown__btn>
                            <Image
                                className={cx('img-cover-center')}
                                src="https://aiacademy.edu.vn/assets/images/flags/vietnamflag.png"
                                alt="Header Language"
                            />
                        </Button>
                    </div>

                    <div className={cx('navbar__dropdown')}>
                        <Button size effect dropdown__btn>
                            <FontAwesomeIcon icon={faBookmark} />
                        </Button>
                    </div>

                    <div class="navbar__dropdown">
                        <Button size effect dropdown__btn onClick={handleLogOut}>
                            <IoIosLogOut></IoIosLogOut>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
