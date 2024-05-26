import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';

import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle, FaExclamationCircle, FaPen } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';

import Button from '~/components/Button';
import FormModal from '~/components/Form';
import Message from '~/components/Message';
import Pagination from '~/components/Pagination';
import ToastMessage from '~/components/toast-Message';
import WorkService from '~/service/WorkService';
import EmployeeService from '~/service/EmployeeService';
import { formatDate } from '~/utils/helpers';
import { checkAuth } from '~/utils/helpers/login';

const cx = classNames.bind(styles);
var namePage = 'lịch công tác';
let titleModal = `Nhập thông tin ${namePage}`;
var nameSelectDepartment = 'EmployeeName';
const labelArray = [
    {
        title: `Mã ${namePage}`,
        name: 'WorkCode',
        isSelect: false,
    },
    {
        title: 'Nhân viên',
        name: 'Work_Employee',
        isSelect: true,
    },
    {
        title: `Ngày bắt đầu`,
        name: 'StartDate',
        isSelect: false,
        type: 'date',
    },
    {
        title: 'Ngày kết thúc',
        name: 'StartEnd',
        isSelect: false,
        type: 'date',
    },
    {
        title: 'Địa chỉ',
        name: 'Address',
        isSelect: false,
    },
    {
        title: 'Lý do',
        name: 'Reason',
        isSelect: false,
    },
];

function Work() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({ show: false, title: '', message: '', Id: '' });
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [dataById, setDataById] = useState(null);
    const [dataSelectOption, setdataSelectOption] = useState({});
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
        getAll();
        getAllSelect();
    }, []);

    useEffect(() => {
        checkAuth();
        var json = JSON.parse(sessionStorage.getItem('Auth')) || null;
        setDataJson(json);
    }, []);

    const handleSubmit = async (data, isEdit) => {
        const res = isEdit ? await WorkService.put(data.Id, data) : await WorkService.post(data);

        if (res.error === 0) {
            setModalOpen(false);
            setDataById(null);
            setToastMessage({
                show: true,
                type: 'success',
                message: 'Thao tác thành công.',
                style: 'toast-success',
            });
            getAll();
        } else {
            setToastMessage({
                show: true,
                type: 'error',
                message: res.data.message,
                style: 'toast-error',
            });
        }
    };

    async function getAll() {
        let json = JSON.parse(sessionStorage.getItem('Auth')) || null;
        if (json.Id === 1) {
            const getAllData = await WorkService.getAll();
            setData(getAllData.data);
        } else {
            console.log(json.EmployeeId);
            const getDetail = await WorkService.getDetail(json.EmployeeId);
            setData(getDetail.data);
        }
    }

    async function getAllSelect() {
        const getAllData = await EmployeeService.getStatus(0);
        setdataSelectOption(getAllData.data);
    }

    const handleCloseModal = () => {
        setDataById(null);
        setModalOpen(false);
    };

    const handleCloseMess = () => {
        setModalMessage({ show: false, title: '', message: '', Id: '' });
    };

    const showConfirm = (Id, Code) => {
        var textMess = `Bạn có muốn xóa thông tin ${namePage} có mã ${Code} khỏi hệ thống?`;
        setModalMessage({
            show: true,
            title: `Xóa thông tin ${namePage}`,
            message: textMess,
            Id: Id,
        });
    };

    const showFormEdit = async (Id) => {
        const res = await WorkService.getById(Id);
        if (res.error === 0) {
            setDataById(res.data);
            setModalOpen(true);
        } else {
            setToastMessage({
                show: true,
                type: 'error',
                message: res.message,
                style: 'toast-error',
            });
        }
    };

    const handleDelete = async (Id) => {
        var res = await WorkService.delete(Id);
        if (res.error === 0) {
            getAll();
            setModalMessage({ show: false, title: '', message: '', Id: '' });
            setToastMessage({
                show: true,
                type: 'success',
                message: 'Thao tác thành công.',
                style: 'toast-success',
            });
        }
    };

    const handleConfirm = async () => {};

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
                    Chờ xác nhận
                </div>
            );
        }

        if (status === 1) {
            return (
                <div
                    style={{
                        padding: '0 4px',
                        background: '#4caf50',
                        color: '#fff',
                        borderRadius: '10px',
                        textAlign: 'center',
                    }}
                >
                    Đồng ý
                </div>
            );
        }

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
                Từ chối
            </div>
        );
    };

    const handleConfirmCheck = async (Id, Code, status) => {
        let reponse = await WorkService.confirmCheck(Id, Code);
        console.log(reponse);
        if (reponse.error === 0) {
            getAll();
            setModalMessage({ show: false, title: '', message: '', Id: '' });
            setToastMessage({
                show: true,
                type: 'success',
                message: 'Thao tác thành công.',
                style: 'toast-success',
            });
        }
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = dataReponse.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(dataReponse.length / recordsPerPage);

    return (
        <div className={cx('main-content')}>
            <div className={cx('page__title')}>
                <h4>Quản lý {namePage}</h4>
            </div>
            <section className={cx('firts-section')}>
                <div className={cx('training')}>
                    <div className={cx('table__card')}>
                        <div className={cx('manager__container')}>
                            {dataJson?.Id === 1 && (
                                <Button btn__success effect onClick={() => setModalOpen(true)}>
                                    <div className={cx('d-flex-center', 'px-4')}>
                                        <FaPlus />
                                        Thêm {namePage}
                                    </div>
                                </Button>
                            )}
                        </div>

                        <div
                            className={cx('manager__container table-data')}
                            style={{ overflowX: 'scroll', height: '450px', marginTop: '36px' }}
                        >
                            <table className={cx('table', 'table__data')}>
                                <thead>
                                    <tr className={cx('table__data-tr')}>
                                        <th className={cx('table__data-th')}>Mã công tác</th>
                                        <th className={cx('table__data-th')}>Mã nhân viên</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '250px' }}>
                                            Tên nhân viên
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '300px' }}>
                                            Chức vụ
                                        </th>
                                        <th className={cx('table__data-th')}>Ngày bắt đầu</th>
                                        <th className={cx('table__data-th')}>Ngày kết thúc</th>
                                        <th className={cx('table__data-th')}>Địa điểm</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '300px' }}>
                                            Mục đích
                                        </th>
                                        <th className={cx('table__data-th')}>Trạng thái</th>
                                        <th className={cx('table__data-th')} styles={{ textAlign: 'center' }}>
                                            {dataJson?.Id === 2 ? 'Đồng ý' : 'Sửa'}
                                        </th>
                                        <th className={cx('table__data-th')} styles={{ textAlign: 'center' }}>
                                            {dataJson?.Id === 2 ? 'Từ chối' : 'Xóa'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        currentRecords.map((item) => (
                                            <tr key={item.Id} onDoubleClickCapture={showFormEdit.bind(this, item.Id)}>
                                                <td>{item.WorkCode}</td>
                                                <td>{item.EmployeeCode}</td>
                                                <td>{item.EmployeeName}</td>
                                                <td>{item.PositionName}</td>
                                                <td>{formatDate(item.StartDate)}</td>
                                                <td>{formatDate(item.StartEnd)}</td>
                                                <td>{item.Address}</td>
                                                <td>{item.Reason}</td>
                                                <td>{formartStatus(item.Status)}</td>
                                                <td className={cx('table__data-td')}>
                                                    {dataJson?.Id === 2 ? (
                                                        <>
                                                            <FaCheckCircle
                                                                style={{ color: '#5664d2' }}
                                                                onClick={handleConfirmCheck.bind(this, item.Id, 1)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaPen
                                                                style={{
                                                                    marginRight: '12px',
                                                                    color: '#5664d2',
                                                                    cursor: 'pointer',
                                                                }}
                                                                onClick={showFormEdit.bind(this, item.Id)}
                                                            />
                                                        </>
                                                    )}
                                                </td>
                                                <td className={cx('table__data-td')}>
                                                    {dataJson?.Id === 2 ? (
                                                        <>
                                                            <TiDeleteOutline
                                                                style={{ color: '#ff3d60', textAlign: 'center' }}
                                                                onClick={handleConfirmCheck.bind(this, item.Id, 2)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <RiDeleteBin6Line
                                                                style={{ color: '#ff3d60', cursor: 'pointer' }}
                                                                onClick={showConfirm.bind(
                                                                    this,
                                                                    item.Id,
                                                                    item.PositionCode,
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </section>

            {modalOpen && (
                <FormModal
                    title={titleModal}
                    onSubmit={handleSubmit}
                    onClose={handleCloseModal}
                    labelsInput={labelArray}
                    nameOption={nameSelectDepartment}
                    dataById={dataById}
                    dataSelect={dataSelectOption}
                ></FormModal>
            )}

            {modalMessage.show && (
                <Message
                    title={modalMessage.title}
                    message={modalMessage.message}
                    onClose={handleCloseMess}
                    onSuccess={() => handleDelete(modalMessage.Id)}
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

export default Work;
