import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';

import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle, FaExclamationCircle, FaPen } from 'react-icons/fa';
import { TbAntennaBars1 } from 'react-icons/tb';

import Button from '~/components/Button';
import FormModal from '~/components/Form';
import Message from '~/components/Message';
import Pagination from '~/components/Pagination';
import ToastMessage from '~/components/toast-Message';

import { formatDate, formatVND } from '~/utils/helpers';
import { checkAuth } from '~/utils/helpers/login';

import EmployeeService from '~/service/EmployeeService';
import UserService from '~/service/LoginService';

const cx = classNames.bind(styles);
var namePage = 'tài khoản';
let titleModal = `Nhập thông tin ${namePage}`;
var nameSelectDepartment = 'EmployeeName';
const labelArray = [
    {
        title: `Mã ${namePage}`,
        name: 'BenefitCode',
        isSelect: false,
    },
    {
        title: 'Nhân viên',
        name: 'Employee_id',
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
        name: 'EndDate',
        isSelect: false,
        type: 'date',
    },
    {
        title: 'Loại bảo hiểm',
        name: 'BenefitType',
        isSelect: false,
    },
    {
        title: 'Mô tả',
        name: 'Description',
        isSelect: false,
    },
];

function User() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({ show: false, title: '', message: '', Id: '' });
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [dataById, setDataById] = useState(null);
    const [dataSelectOption, setdataSelectOption] = useState({});
    const [isRole, setIsRole] = useState(false);
    const [showOptions, setShowOptions] = useState([]);

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
    });

    const handleSubmit = async (data, isEdit) => {
        const res = isEdit ? await UserService.put(data.Id, data) : await UserService.post(data);

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
        const getAllData = await UserService.getAll();
        setData(getAllData.data);
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

    const showConfirm = (Id, Code, isRoles) => {
        setIsRole(isRoles);
        var text = '';
        if (isRoles === true) {
            text = 'quản lý';
        } else {
            text = 'nhân viên';
        }
        var textMess = `Bạn có cấp quyền cho nhân viên có mã ${Code} thành ${text} không`;
        setModalMessage({
            show: true,
            title: `Xóa thông tin ${namePage}`,
            message: textMess,
            Id: Id,
        });
    };

    const showFormEdit = async (Id) => {
        const res = await UserService.getById(Id);
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

    const handleManager = async (Id) => {
        var res = await UserService.updateManager(Id, 1);
        if (res.error === 0) {
            getAll();
            setModalMessage({ show: false, title: '', message: '', Id: '' });
            setToastMessage({
                show: true,
                type: 'success',
                message: 'Thao tác thành công.',
                style: 'toast-success',
            });
            setShowOptions([]);
        }
    };

    const handleEmployee = async (Id) => {
        var res = await UserService.updateManager(Id, 2);
        if (res.error === 0) {
            getAll();
            setModalMessage({ show: false, title: '', message: '', Id: '' });
            setToastMessage({
                show: true,
                type: 'success',
                message: 'Thao tác thành công.',
                style: 'toast-success',
            });
            setShowOptions([]);
        }
    };

    const handleClick = (index) => {
        const newShowOptions = [...showOptions];
        newShowOptions[index] = !newShowOptions[index];
        setShowOptions(newShowOptions);
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
                    Đang hoạt động
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
                Ngừng hoạt động
            </div>
        );
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
                            {/* <Button btn__success effect onClick={() => setModalOpen(true)}>
                                <div className={cx('d-flex-center', 'px-4')}>
                                    <FaPlus />
                                    Thêm {namePage}
                                </div>
                            </Button> */}
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
                                        <th className={cx('table__data-th')} style={{ minWidth: '250px' }}>
                                            Email
                                        </th>
                                        <th className={cx('table__data-th')}>Tài khoản</th>
                                        <th className={cx('table__data-th')}>Mật khẩu</th>
                                        <th className={cx('table__data-th')}>Quyền hạn</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '150px' }}>
                                            Trạng thái
                                        </th>
                                        <th className={cx('table__data-th')}>Cấp quyền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        currentRecords.map((item) => (
                                            <tr key={item.IdUser}>
                                                <td>{item.EmployeeCode}</td>
                                                <td>{item.EmployeeName}</td>
                                                <td>{item.PositionName}</td>
                                                <td>{item.DepartmentName}</td>
                                                <td>{item.Email}</td>
                                                <td>{item.Account}</td>
                                                <td>****</td>
                                                <td>{item.UserName}</td>
                                                <td>{formartStatus(item.Status)}</td>
                                                <td
                                                    className={cx('table__data-td')}
                                                    style={{ textAlign: 'center', position: 'relative' }}
                                                >
                                                    <div
                                                        style={{
                                                            backgroundColor: '#dae9e9',
                                                            borderRadius: '50%',
                                                            width: '25%',
                                                        }}
                                                        onClick={() => handleClick(item.IdUser)}
                                                    >
                                                        <TbAntennaBars1></TbAntennaBars1>
                                                    </div>
                                                    {showOptions[item.IdUser] && (
                                                        <div className={cx('action__btn')}>
                                                            <p
                                                                style={{ textAlign: 'left', paddingLeft: '8px' }}
                                                                onClick={showConfirm.bind(
                                                                    this,
                                                                    item.IdUser,
                                                                    item.EmployeeCode,
                                                                    true,
                                                                )}
                                                            >
                                                                Quản lý
                                                            </p>
                                                            <p
                                                                style={{ textAlign: 'left', paddingLeft: '8px' }}
                                                                onClick={showConfirm.bind(
                                                                    this,
                                                                    item.IdUser,
                                                                    item.EmployeeCode,
                                                                    false,
                                                                )}
                                                            >
                                                                Nhân viên
                                                            </p>
                                                        </div>
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
                    onSuccess={() =>
                        isRole === true ? handleManager(modalMessage.Id) : handleEmployee(modalMessage.Id)
                    }
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

export default User;
