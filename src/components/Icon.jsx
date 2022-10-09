import { ReactComponent as arrowLeft } from '../assets/icon/arrow-left.svg';
import { ReactComponent as arrowRight } from '../assets/icon/arrow-right.svg';
import { ReactComponent as back } from '../assets/icon/back.svg';
import { ReactComponent as profile } from '../assets/icon/profile.svg';
import { ReactComponent as spinner } from '../assets/icon/profile.svg';

const icons = {
    arrowLeft,
    arrowRight,
    back,
    profile,
    spinner,
};

export const Icon = ({ name, ...props }) => {
    const Element = icons[name];
    return <Element {...props}></Element>;
};
