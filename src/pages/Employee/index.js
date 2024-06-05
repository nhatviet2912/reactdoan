import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle, FaExclamationCircle, FaPen, FaFileExport, FaUserAltSlash } from 'react-icons/fa';
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
import { checkAuth } from '~/utils/helpers/login';

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
    const [modalMessage, setModalMessage] = useState({
        show: false,
        title: '',
        message: '',
        Id: '',
        Ids: [],
        isUpdateStatus: false,
    });
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(20);
    const [dataById, setDataById] = useState(null);
    const [dataSelectOption, setdataSelectOption] = useState({});
    const [selectedValueStatus, setSelectedValueStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState({});
    const [checkedItems, setCheckedItems] = useState([]);
    var getEleCheckbox = document.querySelectorAll('#data-table input[type="checkbox"]');

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

    useEffect(() => {
        checkAuth();
    });

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
        setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [], isUpdateStatus: false });
    };

    const showConfirm = (Id, Code) => {
        var textMess = `Bạn có muốn xóa thông tin ${namePage} có mã ${Code} khỏi hệ thống?`;
        setModalMessage({
            show: true,
            title: `Xóa thông tin ${namePage}`,
            message: textMess,
            Id: Id,
            Ids: [],
            isUpdateStatus: false,
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
        const res = await EmployeeService.delete(Id);
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

        setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [], isUpdateStatus: false });
        setToastMessage(res.error === 0 ? successMessage : errorMessage);
        if (res.error === 0) getAll();
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

    const handleCheckboxChange = (itemId, isChecked) => {
        if (isChecked) {
            setCheckedItems((prevState) => [...prevState, itemId]);
        } else {
            setCheckedItems((prevState) => prevState.filter((id) => id !== itemId));
        }
    };

    const showDeleteMany = () => {
        var textMess = `Bạn có muốn xóa thông tin nhân viên đã chọn ra khỏi hệ thống?`;
        setModalMessage({
            show: true,
            title: `Xóa thông tin ${namePage}`,
            message: textMess,
            Id: '',
            Ids: checkedItems,
            isUpdateStatus: false,
        });
    };

    const showUpdateStatusMany = () => {
        var textMess = `Bạn có muốn cho nghỉ việc các nhân viên đã chọn ra khỏi hệ thống?`;
        setModalMessage({
            show: true,
            title: `Nhân việc nghỉ việc`,
            message: textMess,
            Id: '',
            Ids: checkedItems,
            isUpdateStatus: true,
        });
    };

    const handleDeleteMany = async (Ids) => {
        const response = await EmployeeService.deleteMany(Ids);
        const errorMessage = {
            show: true,
            type: 'error',
            message: response.data.message,
            style: 'toast-error',
        };
        const successMessage = {
            show: true,
            type: 'success',
            message: 'Thao tác thành công.',
            style: 'toast-success',
        };

        if (response.data.error === 1) {
            setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [], isUpdateStatus: false });
            setToastMessage(errorMessage);
            return;
        }
        getAll();
        setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [], isUpdateStatus: false });
        setToastMessage(successMessage);
        setCheckedItems([]);
        clearCheckbox();
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

    const clearCheckbox = () => {
        getEleCheckbox.forEach((ele) => {
            ele.checked = false;
        });
    };

    const handleUpdateStatus = async (status, e) => {
        let response = await EmployeeService.updateStatus(status);
        const errorMessage = {
            show: true,
            type: 'error',
            message: response.data.message,
            style: 'toast-error',
        };
        const successMessage = {
            show: true,
            type: 'success',
            message: 'Thao tác thành công.',
            style: 'toast-success',
        };

        if (response.data.error === 1) {
            setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [], isUpdateStatus: false });
            setToastMessage(errorMessage);
            return;
        }
        getAll();
        setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [], isUpdateStatus: false });
        setToastMessage(successMessage);
    };

    const handleUpdateStatusMany = async (Ids) => {
        let response = await EmployeeService.updateStatusMany(Ids);

        const errorMessage = {
            show: true,
            type: 'error',
            message: response.data.message,
            style: 'toast-error',
        };
        const successMessage = {
            show: true,
            type: 'success',
            message: 'Thao tác thành công.',
            style: 'toast-success',
        };

        if (response.data.error === 1) {
            setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [], isUpdateStatus: false });
            setToastMessage(errorMessage);
            return;
        }
        getAll();
        setModalMessage({ show: false, title: '', message: '', Id: '', Ids: [], isUpdateStatus: false });
        setToastMessage(successMessage);
        setCheckedItems([]);
        clearCheckbox();
    };

    const handleSelectAllChange = (isChecked) => {
        if (isChecked) {
            const allItemIds = currentRecords.map((item) => item.Id);
            console.log(allItemIds);
            console.log(currentRecords);
            setCheckedItems(allItemIds);
            getEleCheckbox.forEach((ele) => {
                ele.checked = true;
            });
        } else {
            setCheckedItems([]);
            clearCheckbox();
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
                        <div className={cx('d-flex-between')} style={{ marginTop: '8px' }}>
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
                                    style={{ marginBottom: '0px' }}
                                    placeholder={'Nhập thông tin tìm kiếm'}
                                ></Input>
                            </div>
                            <div style={{ marginBottom: '0' }}>
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
                            style={{
                                visibility: checkedItems.length > 1 ? 'visible' : 'hidden',
                                marginBottom: '0',
                                display: 'flex',
                                columnGap: '12px',
                            }}
                        >
                            <Button btn__warning onClick={showDeleteMany}>
                                Xóa nhân viên
                            </Button>
                            <Button btn__warning onClick={showUpdateStatusMany}>
                                Nghỉ việc
                            </Button>
                        </div>

                        <div
                            className={cx('manager__container table-data')}
                            style={{ overflowX: 'scroll', height: '450px' }}
                        >
                            <table className={cx('table', 'table__data')} id="data-table">
                                <thead style={{ position: 'sticky', top: '0px', background: '#f1f5f7' }}>
                                    <tr className={cx('table__data-tr')}>
                                        <th style={{ minWidth: '50px' }}>
                                            <input
                                                type="checkbox"
                                                style={{ width: '24px', height: '24px' }}
                                                checked={checkedItems.length === currentRecords.length}
                                                onChange={(e) => handleSelectAllChange(e.target.checked)}
                                            />
                                        </th>
                                        <th className={cx('table__data-th')}>Mã nhân viên</th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '250px' }}>
                                            Tên nhân viên
                                        </th>
                                        <th className={cx('table__data-th')} style={{ minWidth: '300px' }}>
                                            Tên phòng ban
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
                                        <th style={{ minWidth: '100px' }}>
                                            Cập nhập <br></br> trạng thái
                                        </th>
                                        <th>Sửa</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        currentRecords.map((item) => (
                                            <tr
                                                key={item.Id}
                                                onDoubleClickCapture={(event) => {
                                                    if (event.target.tagName !== 'INPUT' && item.Status !== 1) {
                                                        showFormEdit(item.Id);
                                                    }
                                                }}
                                                style={{
                                                    backgroundColor: checkedItems.includes(item.Id)
                                                        ? '#b9b9b9'
                                                        : 'transparent',
                                                }}
                                            >
                                                <td className={cx(item.Status === 0 ? 'd-flex-center' : '')}>
                                                    {item.Status !== 1 ? (
                                                        <input
                                                            type="checkbox"
                                                            value={item.Id}
                                                            style={{ width: '24px', height: '24px' }}
                                                            onChange={(e) =>
                                                                handleCheckboxChange(item.Id, e.target.checked)
                                                            }
                                                        />
                                                    ) : null}
                                                </td>
                                                <td>{item.EmployeeCode}</td>
                                                <td>{item.EmployeeName}</td>
                                                <td>{item.DepartmentName}</td>
                                                <td>{item.PositionName}</td>
                                                <td>{formatDate(item.DateOfBirth)}</td>
                                                <td>{formatGender(item.Gender)}</td>
                                                <td>{item.Email}</td>
                                                <td>{item.PhoneNumber}</td>
                                                <td>{item.Address}</td>
                                                <td>{formartStatus(item.Status)}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <FaUserAltSlash
                                                        onClick={
                                                            item.Status !== 1
                                                                ? handleUpdateStatus.bind(this, item.Id)
                                                                : null
                                                        }
                                                        style={{ cursor: item.Status === 1 ? 'no-drop' : 'pointer' }}
                                                    ></FaUserAltSlash>
                                                </td>
                                                <td>
                                                    <FaPen
                                                        style={{
                                                            marginRight: '12px',
                                                            color: '#5664d2',
                                                            cursor: item.Status === 1 ? 'no-drop' : 'pointer',
                                                        }}
                                                        onClick={
                                                            item.Status !== 1 ? showFormEdit.bind(this, item.Id) : null
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <RiDeleteBin6Line
                                                        style={{
                                                            color: '#ff3d60',
                                                            cursor: item.Status === 1 ? 'no-drop' : 'pointer',
                                                        }}
                                                        onClick={
                                                            item.Status !== 1
                                                                ? showConfirm.bind(this, item.Id, item.EmployeeCode)
                                                                : null
                                                        }
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
                    onSuccess={() => {
                        if (modalMessage.Ids.length > 0 && modalMessage.isUpdateStatus === false) {
                            handleDeleteMany(modalMessage.Ids);
                        }
                        if (modalMessage.Ids.length > 0 && modalMessage.isUpdateStatus) {
                            handleUpdateStatusMany(modalMessage.Ids);
                        } else {
                            handleDelete(modalMessage.Id);
                        }
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

export default Employee;
