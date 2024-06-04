import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useEffect, useState } from 'react';

import ReportService from '~/service/ReportService';
import { checkAuth } from '~/utils/helpers/login';

const cx = classNames.bind(styles);
function Home() {
    const [totalEmployee, setTotalEmployee] = useState(0);
    const [totalDepartment, setTotalDepartment] = useState(0);
    const [totalEmployeeOut, setTotalEmployeeOut] = useState(0);
    const [dataJson, setDataJson] = useState({});

    useEffect(() => {
        getTotalEmployee();
        getTotalDepartment();
        getTotalEmployeeOut();
    }, []);

    useEffect(() => {
        checkAuth();
        var json = JSON.parse(sessionStorage.getItem('Auth')) || null;
        setDataJson(json);
    }, []);

    async function getTotalEmployee() {
        let response = await ReportService.getTotalEmployee();
        setTotalEmployee(response.data);
    }

    async function getTotalDepartment() {
        let response = await ReportService.getTotalDepartment();
        setTotalDepartment(response.data);
    }

    async function getTotalEmployeeOut() {
        let response = await ReportService.getTotalEmployeeOut();
        setTotalEmployeeOut(response.data);
    }

    return (
        <>
            {dataJson?.Id === 1 ? (
                <div className={cx('main-content')}>
                    <div className={cx('page__title')}>
                        <h4>Dashboard</h4>
                    </div>

                    <section className={cx('firts-section')}>
                        <div className={cx('report')}>
                            <div className={cx('report__card', 'report__box')}>
                                <div className={cx('report__box-header')}>
                                    <div className={cx('report__container')}>
                                        <p className={cx('report__title--normal')}>Tổng số nhân viên</p>
                                        <h5 id="numberclassName" className={cx('report__data')}>
                                            {totalEmployee}
                                        </h5>
                                    </div>

                                    <div className={cx('report__icon')}>
                                        <i className="far fa-users"></i>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('report__card', 'report__box')}>
                                <div className={cx('report__box-header')}>
                                    <div className={cx('report__container')}>
                                        <p className={cx('report__title--normal')}>Tổng phòng ban</p>
                                        <h5 id="numberStudent" className={cx('report__data')}>
                                            {totalDepartment}
                                        </h5>
                                    </div>

                                    <div className={cx('report__icon')}>
                                        <i className="fas fa-user-graduate"></i>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('report__card', 'report__box')}>
                                <div className={cx('report__box-header')}>
                                    <div className={cx('report__container')}>
                                        <p className={cx('report__title--normal')}>Số nhân viên đã nghỉ việc</p>
                                        <h5 id="numberTeacher" className={cx('report__data')}>
                                            {totalEmployeeOut}
                                        </h5>
                                    </div>

                                    <div className={cx('report__icon')}>
                                        <i className="fad fa-chalkboard-teacher"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <div className={cx('main-content')}>
                    <div className={cx('d-flex-center')}>
                        Chào mừng bạn đã đến với hệ thống quản lý nhân sự Công ty AIACADEMY
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
