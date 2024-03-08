import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ type = 'text', classNames, placeholder, textLabel }) {
    const classes = cx('form-control', classNames);

    return (
        <div className={cx('form__item')}>
            <label className={cx('text__no-wrap', 'form__label')}>{textLabel}</label>
            <input type={type} className={cx(classes)} placeholder={placeholder} />
        </div>
    );
}

export default Input;
