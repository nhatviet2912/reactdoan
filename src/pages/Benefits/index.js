import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';

import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle, FaExclamationCircle, FaPen } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

import Button from '~/components/Button';
import FormModal from '~/components/Form';
import Message from '~/components/Message';
import Pagination from '~/components/Pagination';
import ToastMessage from '~/components/toast-Message';

import { formatDate } from '~/utils/helpers';

import EmployeeService from '~/service/EmployeeService';
import BenefitService from '~/service/BenefitService';

const cx = classNames.bind(styles);
var namePage = 'bảo hiểm';
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

function Benefits() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({ show: false, title: '', message: '', Id: '' });
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [dataById, setDataById] = useState(null);
    const [dataSelectOption, setdataSelectOption] = useState({});

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

    const handleSubmit = async (data, isEdit) => {
        const res = isEdit ? await BenefitService.put(data.Id, data) : await BenefitService.post(data);

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
        const getAllData = await BenefitService.getAll();
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
        const res = await BenefitService.getById(Id);
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
        var res = await BenefitService.delete(Id);
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
                            <Button btn__success effect onClick={() => setModalOpen(true)}>
                                <div className={cx('d-flex-center', 'px-4')}>
                                    <FaPlus />
                                    Thêm {namePage}
                                </div>
                            </Button>
                        </div>

                        <div
                            className={cx('manager__container table-data')}
                            style={{ overflowX: 'scroll', height: '450px', marginTop: '36px' }}
                        >
                            <table className={cx('table', 'table__data')}>
                                <thead>
                                    <tr className={cx('table__data-tr')}>
                                        <th className={cx('table__data-th')}>Mã bảo hiểm</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '250px' }}>
                                            Tên nhân viên
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '300px' }}>
                                            Chức vụ
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '300px' }}>
                                            Phòng ban
                                        </th>
                                        <th className={cx('table__data-th')}>Ngày bắt đầu</th>
                                        <th className={cx('table__data-th')}>Ngày kết thúc</th>
                                        <th className={cx('table__data-th')}>Loại bảo hiểm</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '300px' }}>
                                            Mô tả
                                        </th>
                                        <th>Sửa</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        currentRecords.map((item) => (
                                            <tr key={item.Id} onDoubleClickCapture={showFormEdit.bind(this, item.Id)}>
                                                <td>{item.BenefitCode}</td>
                                                <td>{item.EmployeeName}</td>
                                                <td>{item.PositionName}</td>
                                                <td>{item.DepartmentName}</td>
                                                <td>{formatDate(item.StartDate)}</td>
                                                <td>{formatDate(item.EndDate)}</td>
                                                <td>{item.BenefitType}</td>
                                                <td>{item.Description}</td>
                                                <td className={cx('table__data-td')}>
                                                    <FaPen
                                                        style={{
                                                            marginRight: '12px',
                                                            color: '#5664d2',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={showFormEdit.bind(this, item.Id)}
                                                    />
                                                </td>
                                                <td>
                                                    <RiDeleteBin6Line
                                                        style={{ color: '#ff3d60', cursor: 'pointer' }}
                                                        onClick={showConfirm.bind(this, item.Id, item.Id)}
                                                    />
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

export default Benefits;
