import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { useState, useEffect } from 'react';

import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle, FaExclamationCircle, FaPen } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

import Button from '~/components/Button';
import Input from '~/components/Input';
import FormModal from '~/components/Form';
import Message from '~/components/Message';
import Pagination from '~/components/Pagination';
import ToastMessage from '~/components/toast-Message';
import DepartmentService from '~/service/DepartmentService';

const cx = classNames.bind(styles);
let titleModal = 'Nhập thông tin phòng ban';
const labelArray = [
    {
        title: 'Mã phòng ban',
        name: 'DepartmentCode',
    },
    {
        title: 'Tên phòng ban:',
        name: 'DepartmentName',
    },
    {
        title: 'Mô tả:',
        name: 'Descriptions',
    },
];

function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({ show: false, title: '', message: '', Id: '' });
    const [toastMessage, setToastMessage] = useState({ show: false, type: '', message: '', style: '' });
    const [dataReponse, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    useEffect(() => {
        if (toastMessage.show) {
            const timer = setTimeout(() => {
                setToastMessage({ ...toastMessage, show: false });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    useEffect(() => {
        getAllDepartments();
    }, []);

    const handleSubmit = async (data) => {
        var res = await DepartmentService.post(data);
        if (res.error === 0) {
            setModalOpen(false);
            setToastMessage({
                show: true,
                type: 'success',
                message: 'Thao tác thành công.',
                style: 'toast-success',
            });
            getAllDepartments();
        } else {
            setToastMessage({
                show: true,
                type: 'error',
                message: res.data.message,
                style: 'toast-error',
            });
        }
    };

    async function getAllDepartments() {
        const getAllData = await DepartmentService.getAllDepartments();
        setData(getAllData.data);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleCloseMess = () => {
        setModalMessage({ show: false, title: '', message: '', Id: '' });
    };

    const showConfirm = (Id, Code) => {
        var textMess = `Bạn có muốn xóa thông tin chuyên ngành có mã ${Code} khỏi hệ thống?`;
        setModalMessage({
            show: true,
            title: 'Xóa thông tin phòng ban',
            message: textMess,
            Id: Id,
        });
    };

    const showFormEdit = async (Id) => {
        const res = await DepartmentService.getById(Id);
        // console.log(res);
        if (res.error == 0) {
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
        var res = await DepartmentService.delete(Id);
        if (res.error == 0) {
            getAllDepartments();
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
                <h4>Quản lý phòng ban</h4>
            </div>
            <section className={cx('firts-section')}>
                <div className={cx('training')}>
                    <div className={cx('table__card')}>
                        <div className={cx('manager__container')}>
                            <Button btn__success effect onClick={() => setModalOpen(true)}>
                                <div className={cx('d-flex-center', 'px-4')}>
                                    <FaPlus />
                                    Thêm chuyên ngành
                                </div>
                            </Button>
                        </div>

                        <div className={cx('control-data')} style={{ width: '25%' }}>
                            <Input classNames="filter__data" textLabel="Tìm kiếm:"></Input>
                        </div>

                        <div className={cx('manager__container table-data')}>
                            <table className={cx('table', 'table__data')}>
                                <thead>
                                    <tr className={cx('table__data-tr')}>
                                        <th className={cx('table__data-th')}>Mã phòng ban</th>
                                        <th className={cx('table__data-th')}>Tên phòng ban</th>
                                        <th className={cx('table__data-th')}>Mô tả</th>
                                        <th className={cx('table__data-th')}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        currentRecords.map((item) => (
                                            <tr key={item.Id}>
                                                <td>{item.DepartmentCode}</td>
                                                <td>{item.DepartmentName}</td>
                                                <td>{item.Descriptions}</td>
                                                <td className={cx('table__data-td')}>
                                                    <FaPen
                                                        style={{ marginRight: '12px', color: '#5664d2' }}
                                                        onClick={showFormEdit.bind(this, item.Id)}
                                                    />
                                                    <RiDeleteBin6Line
                                                        style={{ color: '#ff3d60' }}
                                                        onClick={showConfirm.bind(this, item.Id, item.DepartmentCode)}
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

export default Home;
