import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';

import Pagination from '~/components/Pagination';
import AttendanceService from '~/service/AttendanceService';

const cx = classNames.bind(styles);

function DetailMonth() {
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [titleHeader, setTitleHeader] = useState([]);

    useEffect(() => {
        if (toastMessage.show) {
            const timer = setTimeout(() => {
                setToastMessage({ ...toastMessage, show: false });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    useEffect(() => {
        getAll();
        getDaysInMonth(2024, 4);
    }, []);

    async function getAll() {
        const result = await AttendanceService.getWithMonth();
        setData(result.data);
        const dates = result.data.reduce((acc, employee) => {
            employee.attendances.forEach((attendance) => {
                const dateStr = `${attendance.Day}/${attendance.Month}/${attendance.Year}`;
                if (!acc.includes(dateStr)) {
                    acc.push(dateStr);
                }
            });
            return acc;
        }, []);
        console.log(dates);
    }

    const getDaysInMonth = (year, month) => {
        const daysInMonth = new Date(2024, 5, 0).getDate();
        var x = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        setTitleHeader(x);
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = dataReponse.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(dataReponse.length / recordsPerPage);

    return (
        <div className={cx('main-content')}>
            <div className={cx('page__title')}>
                <h4>Bảng công hàng tháng</h4>
            </div>
            <section className={cx('firts-section')}>
                <div className={cx('training')}>
                    <div className={cx('table__card')}>
                        <div
                            className={cx('manager__container table-data')}
                            style={{ overflowX: 'scroll', height: '450px' }}
                        >
                            <table className={cx('table', 'table__data')}>
                                <thead>
                                    <tr className={cx('table__data-tr')}>
                                        <th className={cx('table__data-th')}>Mã nhân viên</th>
                                        <th className={cx('table__data-th')}>Tên nhân viên</th>
                                        <th className={cx('table__data-th')}>Chức vụ</th>
                                        <th className={cx('table__data-th')}>Phòng ban</th>
                                        {titleHeader.map((day) => (
                                            <th key={`${day}`}>{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        currentRecords.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.EmployeeCode}</td>
                                                <td>{item.EmployeeName}</td>
                                                <td>{item.PositionName}</td>
                                                <td>{item.DepartmentName}</td>
                                                {titleHeader.map((day) => {
                                                    const attendance = item.attendances.find((a) => a.Day === day);
                                                    return (
                                                        <td key={`${item.EmployeeCode}-${day}`}>
                                                            {attendance ? 'X' : 'O'}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DetailMonth;
