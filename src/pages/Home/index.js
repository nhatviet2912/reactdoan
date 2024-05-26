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

    useEffect(() => {
        getTotalEmployee();
        getTotalDepartment();
        getTotalEmployeeOut();
    }, []);

    useEffect(() => {
        checkAuth();
    });

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
        <div className={cx('main-content')}>
            <div className={cx('page__title')}>
                <h4>Dashboard</h4>
            </div>

            <section className={cx('firts-section')}>
                <div className={cx('report')}>
                    <div className={cx('report__card', 'report__box')}>
                        <div className="report__box-header">
                            <div className="report__container">
                                <p className="report__title--normal">Tổng số nhân viên</p>
                                <h5 id="numberclassName" className="report__data">
                                    {totalEmployee}
                                </h5>
                            </div>

                            <div className="report__icon">
                                <i className="far fa-users-className"></i>
                            </div>
                        </div>
                    </div>

                    <div className="report__card report__box">
                        <div className="report__box-header">
                            <div className="report__container">
                                <p className="report__title--normal">Tổng phòng ban</p>
                                <h5 id="numberStudent" className="report__data">
                                    {totalDepartment}
                                </h5>
                            </div>

                            <div className="report__icon">
                                <i className="fas fa-user-graduate"></i>
                            </div>
                        </div>
                    </div>

                    <div className="report__card report__box">
                        <div className="report__box-header">
                            <div className="report__container">
                                <p className="report__title--normal">Số nhân viên đã nghỉ việc</p>
                                <h5 id="numberTeacher" className="report__data">
                                    {totalEmployeeOut}
                                </h5>
                            </div>

                            <div className="report__icon">
                                <i className="fad fa-chalkboard-teacher"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
