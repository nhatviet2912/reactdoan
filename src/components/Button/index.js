import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    size = false,
    effect = false,
    dropdown__btn = false,
    btn__success = false,
    btn__primary = false,
    btn__warning = false,
    btn__muted = false,
    btn__disabled = false,
    children,
    onClick,
}) {
    let Comp = 'button';
    const props = {
        onClick,
    };
    if (to) {
        props.to = to;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('btn', {
        size,
        effect,
        dropdown__btn,
        btn__success,
        btn__primary,
        btn__warning,
        btn__muted,
        btn__disabled,
    });

    return (
        <Comp className={classes} {...props}>
            {children}
        </Comp>
    );
}

export default Button;
