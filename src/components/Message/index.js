import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../Button';

const cx = classNames.bind(styles);

function Message({ title, message, onClose, onSuccess }) {
    let messageTitle = title || 'Xóa thông tin';
    return (
        <div className={cx('manager__alert', 'active')}>
            <div className={cx('manager__alert-content', 'scale-up-center')}>
                <div className={cx('manager__container', 'modal__header', 'active')}>
                    <div className={cx('manager__modal-title')}>
                        <h5>{messageTitle}</h5>
                    </div>

                    <div className={cx('manager__modal-close')} onClick={() => onClose()}>
                        <IoClose />
                    </div>
                </div>

                <div className={cx('manager__container', 'alert__body')}>
                    <h6>{message}</h6>
                    <div className={cx('alert__btn')}>
                        <Button btn__primary onClick={() => onSuccess()}>
                            Xác nhận
                        </Button>
                        <Button btn__muted onClick={() => onClose()}>
                            Bỏ qua
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
