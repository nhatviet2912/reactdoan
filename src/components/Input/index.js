import classNames from 'classnames/bind';
import styles from './Input.module.scss';

import { useState } from 'react';

const cx = classNames.bind(styles);

function Input({ type = 'text', classNames, placeholder, textLabel, onChange }) {
    const classes = cx('form-control', classNames);

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className={cx('form__item')}>
            <label className={cx('text__no-wrap', 'form__label')}>{textLabel}</label>
            <input type={type} className={cx(classes)} placeholder={placeholder} onChange={handleChange} />
        </div>
    );
}

export default Input;
