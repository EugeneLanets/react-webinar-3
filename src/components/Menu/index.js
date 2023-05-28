import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useTranslation from '../../store/use-translation';

function Menu() {
  const cn = bem('Menu');
  const dict = useTranslation('basketTool');
  return (
    <Link to="/" className={cn('link')}>
      {dict.mainLink}
    </Link>
  );
}

export default Menu;
