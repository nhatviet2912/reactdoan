import classNames from 'classnames/bind';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

function Image({ src, alt, className }) {
    const classes = cx(className);

    return <img src={src} alt={alt} className={classes} />;
}

export default Image;
