import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';

import { useState } from 'react';

import { CiUser, CiLock } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';

import LoginService from '~/service/LoginService';

const cx = classNames.bind(styles);

function Login() {
    const [selectedValue, setSelectedValue] = useState('');
    const [acc, setAcc] = useState('');
    const [pass, setPass] = useState('');

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleAcc = (e) => {
        setAcc(e.target.value);
    };

    const handlePass = (e) => {
        setPass(e.target.value);
    };

    const handleLogin = async () => {
        if (acc === '' || pass === '') {
            alert('Vui lòng nhập tài khoản hoặc mật khẩu');
            return;
        }

        let data = {
            Type: parseInt(selectedValue),
            Acc: acc,
            Pass: pass,
        };

        var response = await LoginService.post(data);
        if (response.error === 0) {
            sessionStorage.setItem('Auth', JSON.stringify(response.data));
            window.location.href = '/';
            return;
        }

        alert('Tài khoản hoặc mật khẩu không đúng');
    };

    return (
        <section className={cx('firts-section_login')}>
            <div className={cx('sign-in')} style={{ textAlign: 'center' }}>
                <div className={cx('sign-in__title')}>
                    <h3>ĐĂNG NHẬP</h3>
                    <p>
                        Chưa có tài khoản?{' '}
                        <a className={cx('anchor-blue')} href="/SignIn">
                            Đăng ký tài khoản mới
                        </a>{' '}
                        tại đây.
                    </p>
                </div>

                <div className={cx('sign-in__form')}>
                    <div className={cx('sign-in__form-content')}>
                        <div className={cx('sign-in__body')}>
                            <div className={cx('form-input__wrap')}>
                                <h5>Loại tài khoản:</h5>
                                <div className={cx('sign-input')}>
                                    <select
                                        className={cx('dropdown')}
                                        name="keyStatus"
                                        id="keyStatus"
                                        value={selectedValue}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn loại tài khoản</option>
                                        <option value="2">Nhân viên</option>
                                        <option value="1">Quản lý</option>
                                        <option value="0">Quản trị hệ thống</option>
                                    </select>
                                    <CiUser className={cx('icon')}></CiUser>
                                </div>
                            </div>

                            <div className={cx('form-input__wrap')}>
                                <h5>Tên tài khoản</h5>
                                <div className={cx('sign-input')}>
                                    <input
                                        type="text"
                                        id="acc"
                                        value={acc}
                                        placeholder="Tài khoản"
                                        onChange={(value) => handleAcc(value)}
                                    />
                                    <FaRegUserCircle className={cx('icon')}></FaRegUserCircle>
                                </div>
                            </div>

                            <div className={cx('form-input__wrap')}>
                                <h5>Mật khẩu</h5>
                                <div className={cx('sign-input')}>
                                    <input
                                        id="pass"
                                        type="password"
                                        value={pass}
                                        placeholder="Mật khẩu"
                                        onChange={(value) => handlePass(value)}
                                    />
                                    <CiLock className={cx('icon')}></CiLock>
                                </div>
                            </div>

                            <div className={cx('form-action__wrap')}>
                                <div className={cx('sign__agree')}>
                                    <input className={cx('m-check-input')} type="checkbox" id="m-agree" />
                                    <label className={cx('m-check-label')} for="m-agree">
                                        Lưu đăng nhập
                                    </label>
                                </div>
                                <div className={cx('sign__forgot')}>
                                    <a>Quên mật khẩu?</a>
                                </div>
                            </div>

                            <a className={cx('sign-in__btn', 'e-btn')} onClick={handleLogin}>
                                Đăng nhập
                            </a>
                            <p id="mes"></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
