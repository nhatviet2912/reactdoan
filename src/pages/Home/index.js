import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';
import { FaPlus } from 'react-icons/fa6';

import Button from '~/components/Button';
import Input from '~/components/Input';
import FormModal from '~/components/Form';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    let titleModal = 'Chương trình hệ đào tạo';
    let labelArray = ['Mã hệ đào tạo:', 'Tên hệ đào tạo:', 'Phòng ban:', 'Mô tả'];

    const [modalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

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
                                        <th className={cx('table__data-th')}>Tình trạng</th>
                                        <th className={cx('table__data-th')}>Mô tả</th>
                                        <th className={cx('table__data-th')}>Thao tác</th>
                                    </tr>
                                </thead>
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
        </div>
    );
}

export default Home;
