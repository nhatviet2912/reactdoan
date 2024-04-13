import classNames from 'classnames/bind';
import styles from './Input.module.scss';


const cx = classNames.bind(styles);

function Input({ type = 'text', classNames, placeholder, textLabel, onChange, value, error }) {
    const classes = cx('form-control', classNames);

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className={cx('form__item')}>
            <label className={cx('text__no-wrap', 'form__label')}>{textLabel}</label>
            <div className={cx('w-100')}>
                <input
                    type={type}
                    className={cx(classes, { 'error-input': error })}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
                <div className={cx('error-message')}>{error}</div>
            </div>
        </div>
    );
}

export default Input;
