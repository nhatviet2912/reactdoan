import classNames from 'classnames/bind';
import styles from './Toast-Message.module.scss';

import { IoIosCloseCircle } from 'react-icons/io';

const cx = classNames.bind(styles);

function ToastMessage({ type, message, onclose, icon, style }) {
    return (
        <section className={cx('toast-message', style)}>
            <div className={cx('total', 'total-sussces')}>
                <div className={cx('total-info')}>
                    <div className={cx('total-info_icon', 'icon-bg', 'icon-check')}>{icon}</div>
                    <div className={cx('total-info_text')}>
                        <p>
                            <span style={{ color: style === 'toast-success' ? 'green' : 'red' }}>{type}!</span>{' '}
                            {message}
                        </p>
                    </div>
                </div>
                <div className={cx('total-close')}>
                    <p onClick={() => onclose()}>Hoàn tác</p>
                    <IoIosCloseCircle style={{ fontSize: '20px' }} onClick={() => onclose()} />
                </div>
            </div>
        </section>
    );
}

export default ToastMessage;
