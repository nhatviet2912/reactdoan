import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';

import { FaCheckCircle, FaExclamationCircle, FaEye } from 'react-icons/fa';

import Pagination from '~/components/Pagination';
import Message from '~/components/Message';
import Button from '~/components/Button';
import ToastMessage from '~/components/toast-Message';

import { formatVND } from '~/utils/helpers';
import SalaryService from '~/service/SalaryService';
import { checkAuth } from '~/utils/helpers/login';
import SendMailService from '~/service/SendMailService';

const cx = classNames.bind(styles);
var currentDate = new Date();

function Salary() {
    const [modalMessage, setModalMessage] = useState({ show: false, title: '', message: '', Id: '', Ids: [] });
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [selectedValueStatus, setSelectedValueStatus] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [dataJson, setDataJson] = useState({});

    useEffect(() => {
        if (toastMessage.show) {
            const timer = setTimeout(() => {
                setToastMessage({ ...toastMessage, show: false });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    useEffect(() => {
        getAll(currentDate.getMonth() + 1, currentDate.getFullYear());
    }, []);

    useEffect(() => {
        checkAuth();
        const allStatusOne = dataReponse.every((item) => item.Status === 1);
        setDisabledBtn(allStatusOne);
    });

    async function getAll(Month, Year) {
        let data = {
            Month: parseInt(Month),
            Year: parseInt(Year),
        };
        const getAllData = await SalaryService.get(data);
        var json = JSON.parse(sessionStorage.getItem('Auth')) || null;
        if (json.Id === 2) {
            var dataDetail = getAllData.data.find((item) => item.EmployeeId === json.EmployeeId);
            setData([dataDetail]);
            setDataJson(json);
            return;
        }
        setData(getAllData.data);
    }

    const handleChangeStatus = async (e) => {
        if (e.target.value === '') {
            getAll(currentDate.getMonth() + 1, currentDate.getFullYear());
            return;
        }
        setSelectedValueStatus(e.target.value);
        getAll(e.target.value, currentDate.getFullYear());
    };

    const showConfirm = (Id, Code) => {
        var textMess = `Bạn có muốn thanh toán lương cho nhân viên ${Code}?`;
        setModalMessage({
            show: true,
            title: `Thanh toán lương`,
            message: textMess,
            Id: Id,
            Ids: [],
        });
    };

    const handleCloseMess = () => {
        setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [] });
    };

    const handleSave = async (Id) => {
        var array = [];
        var data = dataReponse.find((t) => t.Id === Id);
        array.push(data);
        const res = await SalaryService.updateStatus(Id);
        await SendMailService.send(array);
        const successMessage = {
            show: true,
            type: 'success',
            message: 'Thao tác thành công.',
            style: 'toast-success',
        };
        const errorMessage = {
            show: true,
            type: 'error',
            message: res.error === 0 ? 'Thao tác thành công.' : res.data.message,
            style: res.error === 0 ? 'toast-success' : 'toast-error',
        };

        setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [] });
        setToastMessage(res.error === 0 ? successMessage : errorMessage);
        if (res.error === 0) getAll(currentDate.getMonth() + 1, currentDate.getFullYear());
    };

    const handleUpdateStatusMany = async () => {
        const allStatusOne = dataReponse.every((item) => item.Status === 1);
        if (!allStatusOne) {
            let Ids = dataReponse.map((item) => {
                return item.Id;
            });
            let res = await SalaryService.updateStatusMany(Ids);
            await SendMailService.send(dataReponse);
            const successMessage = {
                show: true,
                type: 'success',
                message: 'Thao tác thành công.',
                style: 'toast-success',
            };
            const errorMessage = {
                show: true,
                type: 'error',
                message: res.error === 0 ? 'Thao tác thành công.' : res.data.message,
                style: res.error === 0 ? 'toast-success' : 'toast-error',
            };

            setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [] });
            setToastMessage(res.error === 0 ? successMessage : errorMessage);
            if (res.error === 0) getAll(currentDate.getMonth() + 1, currentDate.getFullYear());
        } else {
            setDisabledBtn(true);
        }
    };

    const formartStatus = (status) => {
        if (status === 0) {
            return (
                <div
                    style={{
                        padding: '0 4px',
                        background: '#FFC94A',
                        color: '#fff',
                        borderRadius: '10px',
                        textAlign: 'center',
                    }}
                >
                    Chờ thanh toán
                </div>
            );
        }

        if (status === 1) {
            return (
                <div
                    style={{
                        padding: '0 4px',
                        background: '#f32424',
                        color: '#fff',
                        borderRadius: '10px',
                        textAlign: 'center',
                    }}
                >
                    Đã thanh toán
                </div>
            );
        }
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = dataReponse.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(dataReponse.length / recordsPerPage);

    return (
        <div className={cx('main-content')}>
            <div className={cx('page__title')}>
                <h4>
                    Bảng lương tháng {selectedValueStatus === '' ? currentDate.getMonth() + 1 : selectedValueStatus}
                </h4>
            </div>
            <section className={cx('firts-section')}>
                <div className={cx('training')}>
                    <div className={cx('table__card')}>
                        <div style={{ marginBottom: '32px' }} className={cx('d-flex-between')}>
                            <label className={cx('label-dropdown')}>
                                <span style={{ marginRight: '12px' }}>Tháng</span>
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
                            <Button btn__primary onClick={handleUpdateStatusMany} btn__disabled={disabledBtn}>
                                Thanh toán hàng loạt
                            </Button>
                        </div>
                        <div
                            className={cx('manager__container table-data')}
                            style={{ overflowX: 'scroll', height: '450px', marginTop: '36px' }}
                        >
                            <table className={cx('table', 'table__data')}>
                                <thead>
                                    <tr className={cx('table__data-tr')}>
                                        <th className={cx('table__data-th')}>Mã nhân viên</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '250px' }}>
                                            Tên nhân viên
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '250px' }}>
                                            Chức vụ
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '250px' }}>
                                            Phòng ban
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '180px' }}>
                                            Email
                                        </th>
                                        <th className={cx('table__data-th')}>Số ngày làm việc</th>
                                        <th className={cx('table__data-th')}>Lương theo ngày</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '180px' }}>
                                            Số tiền đóng bảo hiểm
                                        </th>
                                        <th className={cx('table__data-th')}>Lương cơ bản</th>
                                        <th className={cx('table__data-th')}>Lương thực lãnh</th>
                                        {dataJson.Id !== 2 && (
                                            <>
                                                <th className={cx('table__data-th')}>Trạng thái</th>
                                                <th className={cx('table__data-th')} style={{ minWidth: '100px' }}>
                                                    Thanh toán
                                                </th>
                                                <th>Xem</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        currentRecords.map((item) => (
                                            <tr key={item.Id}>
                                                <td>{item.EmployeeCode}</td>
                                                <td>{item.EmployeeName}</td>
                                                <td>{item.PositionName}</td>
                                                <td>{item.DepartmentName}</td>
                                                <td>{item.Email}</td>
                                                <td>{item.DayWork}</td>
                                                <td>{formatVND(item.SalaryDay)}</td>
                                                <td>{formatVND(item.Amount)}</td>
                                                <td>{formatVND(item.SalaryBasic)}</td>
                                                <td>{formatVND(item.NetSalary)}</td>
                                                {dataJson.Id !== 2 && (
                                                    <>
                                                        <td>{formartStatus(item.Status)}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            {item.Status === 0 ? (
                                                                <Button
                                                                    btn__success
                                                                    onClick={() =>
                                                                        showConfirm(item.Id, item.EmployeeCode)
                                                                    }
                                                                >
                                                                    <FaCheckCircle />
                                                                </Button>
                                                            ) : (
                                                                <FaCheckCircle style={{ cursor: 'no-drop' }} />
                                                            )}
                                                        </td>
                                                        <td>
                                                            <FaEye />
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </section>

            {modalMessage.show && (
                <Message
                    title={modalMessage.title}
                    message={modalMessage.message}
                    onClose={handleCloseMess}
                    onSuccess={() => {
                        handleSave(modalMessage.Id);
                    }}
                ></Message>
            )}

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

export default Salary;
