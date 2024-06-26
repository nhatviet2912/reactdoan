import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';

import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import Pagination from '~/components/Pagination';
import ToastMessage from '~/components/toast-Message';

import AttendanceService from '~/service/AttendanceService';
import { checkAuth } from '~/utils/helpers/login';

const cx = classNames.bind(styles);
var currentDate = new Date();

function DetailsRole() {
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [titleHeader, setTitleHeader] = useState([]);
    const [selectedValueStatus, setSelectedValueStatus] = useState('');

    useEffect(() => {
        if (toastMessage.show) {
            const timer = setTimeout(() => {
                setToastMessage({ ...toastMessage, show: false });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    useEffect(() => {
        getById(currentDate.getFullYear(), currentDate.getMonth() + 1);
        getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    async function getById(Year, Month) {
        var dataJson = JSON.parse(sessionStorage.getItem('Auth')) || null;
        let Id = dataJson.EmployeeId;
        const result = await AttendanceService.getDetailRole(Year, Month, Id);
        setData(result.data);
    }

    const handleChangeStatus = async (e) => {
        setSelectedValueStatus(e.target.value);
        getById(currentDate.getFullYear(), e.target.value);
        getDaysInMonth(currentDate.getFullYear(), e.target.value);
    };

    const getDaysInMonth = (year, month) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        console.log(daysInMonth);
        setTitleHeader(Array.from({ length: daysInMonth }, (_, i) => 'Ngày ' + (i + 1)));
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = dataReponse.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(dataReponse.length / recordsPerPage);

    return (
        <div className={cx('main-content')}>
            <div className={cx('page__title')}>
                <h4>Bảng công tháng {selectedValueStatus === '' ? currentDate.getMonth() + 1 : selectedValueStatus}</h4>
            </div>
            <section className={cx('firts-section')}>
                <div className={cx('training')}>
                    <div className={cx('table__card')}>
                        <div style={{ marginBottom: '32px' }} className={cx('d-flex-between')}>
                            <label className={cx('label-dropdown')}>
                                <span style={{ marginRight: '12px' }}>Bảng công tháng</span>
                                <select
                                    className={cx('dropdown')}
                                    name="keyStatus"
                                    id="keyStatus"
                                    value={selectedValueStatus}
                                    onChange={handleChangeStatus}
                                    style={{ width: '200px' }}
                                >
                                    <option value=""> -- Chọn tháng -- </option>
                                    {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                                        <option key={month} value={month}>{`Tháng ${month}`}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        {dataReponse.length > 0 ? (
                            <>
                                <div
                                    className={cx('manager__container table-data')}
                                    style={{ overflowX: 'scroll', height: '450px' }}
                                >
                                    <table className={cx('table', 'table__data')}>
                                        <thead>
                                            <tr className={cx('table__data-tr')}>
                                                <th className={cx('table__data-th')}>Mã nhân viên</th>
                                                <th className={cx('table__data-th')} style={{ minWidth: '250px' }}>
                                                    Tên nhân viên
                                                </th>
                                                <th className={cx('table__data-th')} style={{ minWidth: '300px' }}>
                                                    Chức vụ
                                                </th>
                                                <th className={cx('table__data-th')}>Phòng ban</th>
                                                {titleHeader.map((day) => (
                                                    <th key={`${day}`} style={{ minWidth: '100px' }}>
                                                        {`${day}/`}
                                                        {selectedValueStatus === ''
                                                            ? currentDate.getMonth() + 1
                                                            : selectedValueStatus}
                                                    </th>
                                                ))}
                                                <th className={cx('table__data-th')} style={{ minWidth: '150px' }}>
                                                    Số ngày làm việc
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRecords.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.EmployeeCode}</td>
                                                    <td>{item.EmployeeName}</td>
                                                    <td>{item.PositionName}</td>
                                                    <td>{item.DepartmentName}</td>
                                                    {titleHeader.map((day) => {
                                                        const dayNumber = parseInt(day.replace('Ngày ', ''));
                                                        const attendance = item.attendances.find(
                                                            (a) => a.Day === dayNumber && a.Status === 0,
                                                        );

                                                        console.log(attendance);

                                                        return (
                                                            <td
                                                                key={`${item.EmployeeCode}-${day}`}
                                                                style={{ textAlign: 'center' }}
                                                            >
                                                                {attendance ? 'X' : 'O'}
                                                            </td>
                                                        );
                                                    })}
                                                    <td style={{ textAlign: 'center' }}>{item.WorkDays}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                            </>
                        ) : (
                            <div style={{ textAlign: 'center' }}>Không có dữ liệu chấm công trong tháng</div>
                        )}
                    </div>
                </div>
            </section>
            {toastMessage.show && (
                <ToastMessage
                    type={toastMessage.type === 'success' ? 'Thành công' : 'Có lỗi'}
                    message={toastMessage.message}
                    onclose={() => setToastMessage({ ...toastMessage, show: false })}
                    icon={
                        toastMessage.type === 'success' ? (
                            <FaCheckCircle style={{ color: 'white', backgroundColor: 'green', fontSize: '16px' }} />
                        ) : (
                            <FaExclamationCircle style={{ color: 'white', backgroundColor: 'red', fontSize: '16px' }} />
                        )
                    }
                    style={toastMessage.style}
                ></ToastMessage>
            )}
        </div>
    );
}

export default DetailsRole;
