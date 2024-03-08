import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import { IoClose } from 'react-icons/io5';
import Input from '../Input';
import Button from '../Button';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function FormModal({ title, onSubmit, onClose, labelsInput }) {
    const modalRef = useRef(null);

    const handleClickOutside = (e) => {
        if (!modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div className={cx('manager__modal', 'd-flex-center')} onClick={handleClickOutside}>
            <div className={cx('manager__modal-content', 'scale-up-center')} ref={modalRef}>
                <div className={cx('manager__container', 'modal__header', 'd-flex-center')}>
                    <div className={cx('manager__modal-title')}>
                        <h5>{title}</h5>
                    </div>

                    <div className={cx('manager__modal-close')} onClick={() => onClose()}>
                        <IoClose />
                    </div>
                </div>

                <div className={cx('manager__container', 'modal__body')}>
                    <form className={cx('form')} action="#">
                        {labelsInput.map((label, index) => (
                            <Input key={index} classNames="filter__data" textLabel={label} />
                        ))}

                        <Button btn__primary>Xác nhận</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormModal;
