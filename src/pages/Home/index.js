import classNames from 'classnames/bind';
import styles from '../../assets/css/main.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('main-content')}>
            <div className={cx('page__title')}>
                <h4>Quản lý phòng ban</h4>
            </div>
            <section className={cx('firts-section')}>
                <div className={cx('training')}>
                    <div className={cx('table__card')}>
                        <div className={cx('manager__container')}>
                            <div className={cx('add__btn')}>
                                <a href="#" className={cx('btn btn--success')}><i className="fal fa-plus"></i>Thêm chuyên ngành</a>
                            </div>
                        </div>

                        <div className={cx('control-data manager__container')}>
                            <div className={cx('select__data-lenght')}>
                                <label>Hiển thị 
                                    <select className={cx('form-control')}>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select> bản ghi
                                </label>
                            </div>

                            <div className="filter__data">
                                <label>Tìm kiếm:<input type="search" className={cx('form-control')} placeholder="" aria-controls="DataTables_Table_0" /></label>
                            </div>
                        </div>

                        <div className={cx('manager__container table-data')}>
                            <table className={cx('table table__data')}>
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
        </div>
    );
}

export default Home;
