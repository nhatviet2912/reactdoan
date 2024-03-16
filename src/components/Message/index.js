import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../Button';

const cx = classNames.bind(styles);

function Message({ onClose }) {
    return (
        <div className={cx('manager__alert', 'active')}>
            <div className={cx('manager__alert-content', 'scale-up-center')}>
                <div className={cx('manager__container', 'modal__header', 'active')}>
                    <div className={cx('manager__modal-title')}>
                        <h5>Xóa thông tin chuyên ngành</h5>
                    </div>

                    <div className={cx('manager__modal-close')} onClick={() => onClose()}>
                        <IoClose />
                    </div>
                </div>

                <div className={cx('manager__container', 'alert__body')}>
                    <h6>
                        Bạn có chức muốn xóa thông tin chuyên ngành có mã <span className={cx('get-id-del')}>1161</span>{' '}
                        khỏi hệ thống?
                    </h6>
                    <div className={cx('alert__btn')}>
                        <Button btn__primary>Xác nhận</Button>
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
