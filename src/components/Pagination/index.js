import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ nPages, currentPage, setCurrentPage }) {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const goToNextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };
    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };
    return (
        <nav className={cx('d-flex-end')}>
            <ul className={cx('d-flex-center', 'page')}>
                <li className={cx('page-item')}>
                    <a className={cx('page-link')} onClick={goToPrevPage} href="#">
                        &lt;&lt;
                    </a>
                </li>
                {pageNumbers.map((pgNumber) => (
                    <li key={pgNumber} className={cx('page-item', `${currentPage == pgNumber ? 'active' : ''}`)}>
                        <a onClick={() => setCurrentPage(pgNumber)} className={cx('page-link')} href="#">
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className={cx('page-item')}>
                    <a className={cx('page-link')} onClick={goToNextPage} href="#">
                        &gt;&gt;
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
