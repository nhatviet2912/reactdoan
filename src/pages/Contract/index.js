import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle, FaExclamationCircle, FaPen } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

import Button from '~/components/Button';
import Input from '~/components/Input';
import FormModal from '~/components/Form';
import Message from '~/components/Message';
import Pagination from '~/components/Pagination';
import ToastMessage from '~/components/toast-Message';
import ContractService from '~/service/ContractService';
import EmployeeService from '~/service/EmployeeService';
import { formatDate, formatVND } from '~/utils/helpers';

const cx = classNames.bind(styles);
var namePage = 'hợp đồng';
let titleModal = `Nhập thông tin ${namePage}`;
var nameSelectDepartment = 'EmployeeName';
const labelArray = [
    {
        title: `Mã ${namePage}`,
        name: 'ContractCode',
        isSelect: false,
    },
    {
        title: `Tên ${namePage}`,
        name: 'ContractName',
        isSelect: false,
    },
    {
        title: `Nhân viên`,
        name: 'Contract_Employee_id',
        isSelect: true,
    },
    {
        title: 'Ngày ký',
        name: 'ContractStartDate',
        isSelect: false,
        type: 'date',
    },
    {
        title: 'Ngày kết thúc',
        name: 'ContractEndDate',
        isSelect: false,
        type: 'date',
    },
    {
        title: 'Hệ số lương',
        name: 'SalaryCoefficient',
        isSelect: false,
    },
    {
        title: 'Lương cơ bản',
        name: 'SalaryBasic',
        isSelect: false,
    },
];

function Contract() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({ show: false, title: '', message: '', Id: '' });
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [dataById, setDataById] = useState(null);
    const [dataSelectOption, setdataSelectOption] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

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
        getAllSelectForm();
    }, []);

    const handleSubmit = async (data, isEdit) => {
        var error = validateData(data);
        if (Object.keys(error).length === 0) {
            try {
                console.log(data);
                const res = isEdit ? await ContractService.put(data.Id, data) : await ContractService.post(data);

                if (res.error === 0) {
                    handleCloseModal();
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
            } catch (err) {
                setToastMessage({
                    show: true,
                    type: 'error',
                    message: 'Đã xảy ra lỗi trong quá trình xử lý.',
                    style: 'toast-error',
                });
            }
        } else {
            setErrorMessage(error);
        }
    };

    async function getAll() {
        const getAllData = await ContractService.getAll();
        setData(getAllData.data);
    }

    async function getAllSelectForm() {
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
        const res = await ContractService.getById(Id);
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
        var res = await ContractService.delete(Id);
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
            const res = await ContractService.search(value);
            setData(res.data);
        } else {
            getAll();
        }
    }, 1000);

    const validateData = (data) => {
        const dataExample = {
            ContractCode: '',
            ContractName: '',
            Contract_Employee_id: '',
            ContractStartDate: '',
            ContractEndDate: '',
            SalaryCoefficient: '',
            SalaryBasic: '',
        };

        const mergedOb = Object.assign({}, dataExample, data);
        const newErrors = {};

        if (mergedOb.ContractCode.trim() === '') {
            newErrors.ContractCode = 'Mã hợp đồng bắt buộc nhập';
        }

        if (mergedOb.ContractName.trim() === '') {
            newErrors.ContractName = 'Tên hợp đồng bắt buộc nhập';
        }

        if (mergedOb.Contract_Employee_id === '') {
            newErrors.Contract_Employee_id = 'Vui lòng chọn nhân viên';
        }

        if (mergedOb.ContractStartDate === '') {
            newErrors.ContractStartDate = 'Ngày ký hợp đồng bắt buộc nhập';
        }

        if (mergedOb.ContractEndDate === '') {
            newErrors.ContractEndDate = 'Ngày kết thúc hợp đồng bắt buộc nhập';
        }

        if (mergedOb.SalaryCoefficient !== '') {
            if (isNaN(mergedOb.SalaryCoefficient)) {
                newErrors.SalaryCoefficient = 'Hệ số lương không hợp lệ! Vui lòng nhập số';
            }
        }

        if (mergedOb.SalaryBasic !== '') {
            if (isNaN(mergedOb.SalaryBasic)) {
                newErrors.SalaryBasic = 'Lương cơ bản không hợp lệ! Vui lòng nhập số';
            }
        }

        return newErrors;
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
                                <thead>
                                    <tr className={cx('table__data-tr')}>
                                        <th className={cx('table__data-th')}>Mã hợp đồng</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '200px' }}>
                                            Tên nhân viên
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '250px' }}>
                                            Tên phòng ban
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '300px' }}>
                                            Tên chức vụ
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '300px' }}>
                                            Tên hợp đồng
                                        </th>
                                        <th className={cx('table__data-th')}>Ngày ký</th>
                                        <th className={cx('table__data-th')}>Ngày kết thúc</th>
                                        <th className={cx('table__data-th')}>Hệ số lương</th>
                                        <th className={cx('table__data-th')}>Lương cơ bản</th>
                                        <th className={cx('table__data-th')}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        currentRecords.map((item) => (
                                            <tr key={item.Id} onDoubleClickCapture={showFormEdit.bind(this, item.Id)}>
                                                <td>{item.ContractCode}</td>
                                                <td>{item.EmployeeName}</td>
                                                <td>{item.DepartmentName}</td>
                                                <td>{item.PositionName}</td>
                                                <td>{item.ContractName}</td>
                                                <td>{formatDate(item.ContractStartDate)}</td>
                                                <td>{formatDate(item.ContractEndDate)}</td>
                                                <td>{item.SalaryCoefficient}</td>
                                                <td>{formatVND(item.SalaryBasic)}</td>
                                                <td className={cx('table__data-td')}>
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
                                                        onClick={showConfirm.bind(this, item.Id, item.ContractCode)}
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
                    errorMessage={errorMessage}
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

export default Contract;
