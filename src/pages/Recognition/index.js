import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle, FaExclamationCircle, FaPen } from 'react-icons/fa';

import Button from '~/components/Button';
import Input from '~/components/Input';
import FormModal from '~/components/Form';
import Message from '~/components/Message';
import Pagination from '~/components/Pagination';
import ToastMessage from '~/components/toast-Message';
import PositionService from '~/service/PositionService';
import RecognitionService from '~/service/RecognitionService';
import { checkAuth } from '~/utils/helpers/login';
import EmployeeService from '~/service/EmployeeService';
import { formatDate, formatVND, formartStatus, downloadFile } from '~/utils/helpers';


const cx = classNames.bind(styles);
var namePage = 'khen thưởng';
let titleModal = `Nhập thông tin ${namePage}`;
var nameSelectDepartment = 'EmployeeName';
const labelArray = [
    {
        title: `Mã quyết định`,
        name: 'RecognitionCode',
        isSelect: false,
    },
    {
        title: 'Nhân viên',
        name: 'Recognition_employee',
        isSelect: true,
    },
    {
        title: 'Ngày',
        name: 'Date',
        isSelect: false,
        type: 'date',
    },
    {
        title: 'Số tiền thưởng',
        name: 'Amount',
        isSelect: false,
    },
    {
        title: 'Mô tả:',
        name: 'Descriptions',
        isSelect: false,
    },
];

function Recognition() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({ show: false, title: '', message: '', Id: '' });
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(20);
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
        getAllDepartments();
    }, []);

    useEffect(() => {
        checkAuth();
    });

    const handleSubmit = async (data, isEdit) => {
        const res = isEdit ? await RecognitionService.put(data.Id, data) : await RecognitionService.post(data);

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
        const getAllData = await RecognitionService.getAll();
        setData(getAllData.data);
    }

    async function getAllDepartments() {
        const getAllData = await EmployeeService.getAll();
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
        const res = await PositionService.getById(Id);
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
        var res = await PositionService.delete(Id);
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

    const handleSearch = async (value) => {
        debouncedSearch(value);
    };

    const debouncedSearch = debounce(async (value) => {
        if (value !== '') {
            const res = await PositionService.search(value);
            setData(res.data);
        } else {
            getAll();
        }
    }, 1000);

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

                        <div className={cx('control-data')} style={{ width: '25%' }}>
                            <Input
                                classNames="filter__data"
                                textLabel="Tìm kiếm:"
                                onChange={(value) => handleSearch(value)}
                            ></Input>
                        </div>

                        <div
                            className={cx('manager__container table-data')}
                            style={{ overflowX: 'scroll', height: '450px' }}
                        >
                            <table className={cx('table', 'table__data')}>
                                <thead style={{ position: 'sticky', top: '0px', background: '#f1f5f7' }}>
                                    <tr className={cx('table__data-tr')}>
                                        <th className={cx('table__data-th')}>Số quyết định</th>
                                        <th className={cx('table__data-th')}>Tên nhân viên</th>
                                        <th className={cx('table__data-th')}>Chức vụ</th>
                                        <th className={cx('table__data-th')}>Phòng ban</th>
                                        <th className={cx('table__data-th')}>Ngày khen thưởng</th>
                                        <th className={cx('table__data-th')}>Số tiền khen thưởng</th>
                                        <th className={cx('table__data-th')}>Mô tả</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        currentRecords.map((item) => (
                                            <tr key={item.Id} onDoubleClickCapture={showFormEdit.bind(this, item.Id)}>
                                                <td>{item.RecognitionCode}</td>
                                                <td>{item.EmployeeName}</td>
                                                <td>{item.PositionName}</td>
                                                <td>{item.DepartmentName}</td>
                                                <td>{formatDate(item.Date)}</td>
                                                <td>{formatVND(item.Amount)}</td>
                                                <td>{item.Descriptions}</td>
                                                {/* <td className={cx('table__data-td')}>
                                                    <FaPen
                                                        style={{
                                                            marginRight: '12px',
                                                            color: '#5664d2',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={showFormEdit.bind(this, item.Id)}
                                                    />
                                                    <RiDeleteBin6Line
                                                        style={{ color: '#ff3d60', cursor: 'pointer' }}
                                                        onClick={showConfirm.bind(this, item.Id, item.PositionCode)}
                                                    />
                                                </td> */}
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

export default Recognition;
