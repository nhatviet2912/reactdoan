import classNames from 'classnames/bind';
import styles from './Select.module.scss';
import { useState, useEffect, useRef } from 'react';

import { FaChevronDown } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Select({ options, label, onSelect, labelKey, value, error }) {
    const [initValue, setInitValue] = useState(value || '');
    const [open, setOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        if (value != null) {
            const setText = options.find((item) => item.Id === value);
            if (setText) {
                setInitValue(setText[labelKey]);
            }
        }
    }, [value]);

    const onClickElementCheck = (key, item) => {
        setInitValue(key);
        onSelect(item);
        handleCloseOption();
    };

    const handleCloseOption = () => {
        setOpen((prev) => !prev);
    };

    const handleClickOutSide = (e) => {
        if (!selectRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    return (
        <div onClick={handleClickOutSide}>
            <div className={cx('form__item')}>
                <label className={cx('text__no-wrap', 'form__label')}>{label}</label>
                <div className={cx('input__select')} ref={selectRef}>
                    <div
                        className={cx('form-control', 'form__input-select', { 'error-input': error })}
                        onClick={handleCloseOption}
                    >
                        {initValue}
                    </div>
                    <div className={cx('input__select-icon')}>
                        <FaChevronDown />
                    </div>
                    {open && (
                        <div className={cx('input__list-option')}>
                            {options.map((item) => (
                                <div
                                    className={cx('input__option')}
                                    key={item.Id}
                                    onClick={() => onClickElementCheck(item[labelKey], item.Id)}
                                >
                                    <span>{item[labelKey]}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={cx('error-message')} style={{ bottom: '-20px' }}>
                        {error}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Select;
