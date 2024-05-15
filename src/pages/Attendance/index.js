import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useRef, useEffect } from 'react';

import { CiImport, CiExport } from 'react-icons/ci';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import Button from '~/components/Button';
import ToastMessage from '~/components/toast-Message';
import Pagination from '~/components/Pagination';

import { downloadFile } from '~/utils/helpers';
import AttendanceService from '~/service/AttendanceService';
import DepartmentService from '~/service/DepartmentService';

const cx = classNames.bind(styles);

function Attendance() {
    const fileInputRef = useRef(null);
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [selectedValueStatus, setSelectedValueStatus] = useState('');
    const [dataSelectOption, setdataSelectOption] = useState([]);
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
        getAllSelectDepartment();
    }, []);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append('file', selectedFile);
        var res = await AttendanceService.import(formData);
        getAll();

        const errorMessage = {
            show: true,
            type: res.error === 0 ? 'success' : 'error',
            message: res.error === 0 ? 'Thao tác thành công.' : res.data.message,
            style: res.error === 0 ? 'toast-success' : 'toast-error',
        };

        setToastMessage(errorMessage);
    };

    const handleExportTemplate = async () => {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        if (selectedValueStatus === '') {
            setToastMessage({
                show: true,
                type: 'error',
                message: 'Vui lòng chọn phòng ban để xuất File',
                style: 'toast-error',
            });
            return;
        }

        var res = await AttendanceService.export(year, month, day, selectedValueStatus);
        if (res.status === 500 && res.status === 400 && res.status === 404) {
            setToastMessage({
                show: true,
                type: 'error',
                message: 'Xuất File không thành công',
                style: 'toast-error',
            });
            return;
        }
        downloadFile(res, 'FileMauChamCong.xlsx');
    };

    const handleChangeStatus = async (e) => {
        setSelectedValueStatus(e.target.value);
    };

    async function getAllSelectDepartment() {
        const getAllData = await DepartmentService.getAllDepartments();
        setdataSelectOption(getAllData.data);
    }

    async function getAll() {
        const result = await AttendanceService.getAll();
        setData(result.data);
        if (result.data.length > 0) {
            setTitleHeader(result.data[0].attendances);
        }
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = dataReponse.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(dataReponse.length / recordsPerPage);

    return (
        <div className={cx('main-content')}>
            <div className={cx('page__title')}>
                <h4>Quản lý bảng công theo tuần</h4>
            </div>
            <section className={cx('firts-section')}>
                <div className={cx('training')}>
                    <div className={cx('table__card')}>
                        <div className={cx('d-flex-between')}>
                            <div>
                                <label className={cx('label-dropdown')}>
                                    <span style={{ marginRight: '12px' }}>Phòng ban</span>
                                    <select
                                        className={cx('dropdown')}
                                        name="keyStatus"
                                        id="keyStatus"
                                        value={selectedValueStatus}
                                        onChange={handleChangeStatus}
                                        style={{ width: '200px' }}
                                    >
                                        <option value=""> -- Chọn phòng ban -- </option>
                                        {dataSelectOption.map((label) => (
                                            <option key={label.Id} value={label.Id}>
                                                {label.DepartmentName}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <Button btn__success effect onClick={handleExportTemplate}>
                                    <div className={cx('d-flex-center', 'px-4')}>
                                        <CiExport />
                                        Export Template
                                    </div>
                                </Button>
                            </div>
                            <Button btn__success effect onClick={handleButtonClick}>
                                <div className={cx('d-flex-center', 'px-4')}>
                                    <CiImport />
                                    Import
                                </div>
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className={cx('d-flex-center')} style={{ margin: '12px 0', justifyContent: 'flex-end' }}>
                            <Button
                                btn__success
                                effect
                                onClick={() => {
                                    window.location.href = '/Attendance/DetailMonth';
                                }}
                            >
                                Bảng công hàng tháng
                            </Button>
                        </div>

                        {dataReponse && dataReponse.length > 0 && (
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
                                            {titleHeader.map((item, index) => (
                                                <th
                                                    key={index}
                                                    style={{ minWidth: '100px' }}
                                                >{`Ngày ${item.Day}/${item.Month} `}</th>
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
                                                    {item.attendances.map((itemAttendance, index) => (
                                                        <td key={index} style={{ textAlign: 'center' }}>
                                                            {itemAttendance.Status === 0 ? 'x' : 'o'}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {dataReponse && dataReponse.length > 0 && (
                            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
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

export default Attendance;
