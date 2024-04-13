import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import { IoClose } from 'react-icons/io5';
import Input from '../Input';
import Button from '../Button';
import Select from '../Select';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function FormModal({ title, onSubmit, onClose, labelsInput, dataById, dataSelect, nameOption, errorMessage = {} }) {
    const titleButton = dataById !== null ? 'Cập nhập' : 'Thêm mới';
    const modalRef = useRef(null);
    const [formData, setFormData] = useState(dataById || {});

    const handleClickOutside = (e) => {
        if (!modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    document.onkeydown = function (e) {
        if (e.keyCode === 27) {
            onClose();
        }
    };

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData, dataById !== null);
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
                    <form className={cx('form')} onSubmit={handleSubmit}>
                        {labelsInput.map((label, index) =>
                            label.isSelect ? (
                                <Select
                                    key={index}
                                    options={dataSelect}
                                    label={label.title}
                                    onSelect={(value) => handleInputChange(label.name, value)}
                                    labelKey={nameOption}
                                    value={formData[label.name] || ''}
                                    error={errorMessage[label.name] || ''}
                                />
                            ) : (
                                <Input
                                    type={label.type || 'text'}
                                    key={index}
                                    classNames="filter__data"
                                    textLabel={label.title}
                                    value={formData[label.name] || ''}
                                    onChange={(value) => handleInputChange(label.name, value)}
                                    error={errorMessage[label.name] || ''}
                                />
                            ),
                        )}

                        <div className={cx('d-flex-between')}>
                            <Button btn__primary>{titleButton}</Button>
                            <Button btn__muted onClick={() => onClose()}>
                                Bỏ qua
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormModal;
