import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle, FaExclamationCircle, FaPen, FaFileExport } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

import Button from '~/components/Button';
import Input from '~/components/Input';
import FormModal from '~/components/Form';
import Message from '~/components/Message';
import Pagination from '~/components/Pagination';
import ToastMessage from '~/components/toast-Message';
import PositionService from '~/service/PositionService';
import EmployeeService from '~/service/EmployeeService';
import { formatDate, formatGender, formartStatus, downloadFile } from '~/utils/helpers';
import { isValidPhone, isValidEmail } from '~/utils/helpers/regex';

const cx = classNames.bind(styles);
var namePage = 'nhân viên';
let titleModal = `Nhập thông tin ${namePage}`;
var nameSelect = 'PositionName';
const labelArray = [
    {
        title: `Mã ${namePage}`,
        name: 'EmployeeCode',
        isSelect: false,
    },
    {
        title: `Tên ${namePage}`,
        name: 'EmployeeName',
        isSelect: false,
    },
    {
        title: 'Chức vụ',
        name: 'Position_id',
        isSelect: true,
    },
    {
        title: 'Ngày sinh',
        name: 'DateOfBirth',
        isSelect: false,
        type: 'date',
    },
    {
        title: 'Giới tính',
        name: 'Gender',
        isSelect: false,
    },
    {
        title: 'Email',
        name: 'Email',
        isSelect: false,
    },
    {
        title: 'Số điện thoại',
        name: 'PhoneNumber',
        isSelect: false,
    },
    {
        title: 'Địa chỉ',
        name: 'Address',
        isSelect: false,
    },
];

function Employee() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({ show: false, title: '', message: '', Id: '' });
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [dataById, setDataById] = useState(null);
    const [dataSelectOption, setdataSelectOption] = useState({});
    const [selectedValueStatus, setSelectedValueStatus] = useState('');
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
        getAllSelectPosition();
    }, []);

    const handleSubmit = async (data, isEdit) => {
        var error = validateData(data);
        if (Object.keys(error).length === 0) {
            try {
                console.log(data);
                const res = isEdit ? await EmployeeService.put(data.Id, data) : await EmployeeService.post(data);

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
        const getAllData = await EmployeeService.getAll();
        setData(getAllData.data);
    }

    async function getAllSelectPosition() {
        const getAllData = await PositionService.getAll();
        setdataSelectOption(getAllData.data);
    }

    const handleCloseModal = () => {
        setErrorMessage({});
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
        const res = await EmployeeService.getById(Id);
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
        var res = await EmployeeService.delete(Id);
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
            const res = await EmployeeService.search(value);
            setData(res.data);
        } else {
            getAll();
        }
    }, 1000);

    const handleExportData = async () => {
        var res = await EmployeeService.exportData();
        console.log(res);
        if (res.status === 500) {
            setToastMessage({
                show: true,
                type: 'error',
                message: 'Xuất File không thành công',
                style: 'toast-error',
            });
            return;
        }
        downloadFile(res, 'DanhSachNhanVien.xlsx');
    };

    const handleChangeStatus = async (e) => {
        setSelectedValueStatus(e.target.value);
        if (e.target.value !== '') {
            const res = await EmployeeService.getStatus(e.target.value);
            setData(res.data);
        } else {
            getAll();
        }
    };

    const validateData = (data) => {
        const dataExample = {
            EmployeeCode: '',
            EmployeeName: '',
            Position_id: '',
            Gender: '',
            PhoneNumber: '',
            Email: '',
        };

        const mergedOb = Object.assign({}, dataExample, data);
        const newErrors = {};

        if (mergedOb.EmployeeCode.trim() === '') {
            newErrors.EmployeeCode = 'Mã nhân viên bắt buộc nhập';
        }

        if (mergedOb.EmployeeName.trim() === '') {
            newErrors.EmployeeName = 'Tên nhân viên bắt buộc nhập';
        }

        if (mergedOb.Position_id === '') {
            newErrors.Position_id = 'Vui lòng chọn chức vụ';
        }

        if (mergedOb.Gender.trim() === '') {
            newErrors.Gender = 'Giới tính bắt buộc nhập';
        } else {
            const genderLowerCase = mergedOb.Gender.toLowerCase();
            if (genderLowerCase !== 'nam' && genderLowerCase !== 'nữ') {
                newErrors.Gender = 'Giới tính phải là Nam hoặc Nữ';
            }
        }

        if (mergedOb.PhoneNumber !== '') {
            if (!isValidPhone(mergedOb.PhoneNumber)) {
                newErrors.PhoneNumber = 'Số điện thoại không hợp lệ';
            }
        }

        if (mergedOb.Email !== '') {
            if (!isValidEmail(mergedOb.Email)) {
                newErrors.Email = 'Email không hợp lệ';
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
                        <div className={cx('d-flex-between')}>
                            <Button btn__success effect onClick={() => setModalOpen(true)}>
                                <div className={cx('d-flex-center', 'px-4')}>
                                    <FaPlus />
                                    Thêm {namePage}
                                </div>
                            </Button>
                            <Button btn__success effect onClick={handleExportData}>
                                <div className={cx('d-flex-center', 'px-4')} style={{ columnGap: '6px' }}>
                                    <FaFileExport />
                                    <span>Xuất File</span>
                                </div>
                            </Button>
                        </div>

                        <div className={cx('control-data', 'd-flex-between')}>
                            <div>
                                <Input
                                    classNames="filter__data"
                                    textLabel="Tìm kiếm:"
                                    onChange={(value) => handleSearch(value)}
                                ></Input>
                            </div>
                            <div style={{ marginBottom: '32px' }}>
                                <label className={cx('label-dropdown')}>
                                    <span style={{ marginRight: '12px' }}>Trạng thái</span>
                                    <select
                                        className={cx('dropdown')}
                                        name="keyStatus"
                                        id="keyStatus"
                                        value={selectedValueStatus}
                                        onChange={handleChangeStatus}
                                    >
                                        <option value=""></option>
                                        <option value="0">Đang làm việc</option>
                                        <option value="1">Đã nghỉ việc</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div
                            className={cx('manager__container table-data')}
                            style={{ overflowX: 'scroll', height: '450px' }}
                        >
                            <table className={cx('table', 'table__data')}>
                                <thead style={{ position: 'sticky', top: '0px', background: '#f1f5f7' }}>
                                    <tr className={cx('table__data-tr')}>
                                        <th className={cx('table__data-th')}>Mã nhân viên</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '250px' }}>
                                            Tên nhân viên
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '300px' }}>
                                            Tên chức vụ
                                        </th>
                                        <th className={cx('table__data-th')}>Ngày sinh</th>
                                        <th className={cx('table__data-th')}>Giới tính</th>
                                        <th className={cx('table__data-th')}>Email</th>
                                        <th className={cx('table__data-th')}>Số điện thoại</th>
                                        <th className={cx('table__data-th')}>Địa chỉ</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '150px' }}>
                                            Trạng thái
                                        </th>
                                        <th>Sửa</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        currentRecords.map((item) => (
                                            <tr key={item.Id} onDoubleClickCapture={showFormEdit.bind(this, item.Id)}>
                                                <td>{item.EmployeeCode}</td>
                                                <td>{item.EmployeeName}</td>
                                                <td>{item.PositionName}</td>
                                                <td>{formatDate(item.DateOfBirth)}</td>
                                                <td>{formatGender(item.Gender)}</td>
                                                <td>{item.Email}</td>
                                                <td>{item.PhoneNumber}</td>
                                                <td>{item.Address}</td>
                                                <td>{formartStatus(item.Delete_Flag)}</td>
                                                <td>
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
                                                        onClick={showConfirm.bind(this, item.Id, item.EmployeeCode)}
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
                    nameOption={nameSelect}
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

export default Employee;
