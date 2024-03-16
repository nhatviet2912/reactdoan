import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { FaPlus } from 'react-icons/fa6';

import Button from '~/components/Button';
import Input from '~/components/Input';
import FormModal from '~/components/Form';
import { useState, useEffect } from 'react';
import Message from '~/components/Message';
import DepartmentService from '~/service/DepartmentService';

const cx = classNames.bind(styles);

function Home() {
    let titleModal = 'Chương trình hệ đào tạo';
    let labelArray = ['Mã hệ đào tạo:', 'Tên hệ đào tạo:', 'Phòng ban:', 'Mô tả'];

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState(false);
    const [dataReponse, setData] = useState([]);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleCloseMess = () => {
        setModalMessage(false);
    };

    useEffect(() => {
        getAllDepartments();
    }, []);

    async function getAllDepartments() {
        const getAllData = await DepartmentService.getAllDepartments();
        console.log(getAllData);
        setData(getAllData.data);
    }

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
                                        <th className={cx('table__data-th')}>Mã chuyên ngành</th>
                                        <th className={cx('table__data-th')}>Tên chuyên ngành</th>
                                        <th className={cx('table__data-th')}>Mô tả</th>
                                        <th className={cx('table__data-th')}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReponse.length > 0 &&
                                        dataReponse.map((item) => (
                                            <tr key={item.Id}>
                                                <td>{item.DepartmentCode}</td>
                                                <td>{item.DepartmentName}</td>
                                                <td>{item.Descriptions}</td>
                                                {/* <td>{item.DepartmentName}</td> */}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {modalOpen && (
                <FormModal
                    title={titleModal}
                    onSubmit={null}
                    onClose={handleCloseModal}
                    labelsInput={labelArray}
                ></FormModal>
            )}

            {modalMessage && <Message onClose={handleCloseMess}></Message>}
        </div>
    );
}

export default Home;
