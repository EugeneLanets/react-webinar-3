import useSelector from '../../store/use-selector';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import usePagination, { DOTS } from './use-pagination';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

function Pagination() {
  const totalPages = useSelector((state) => state.catalog.totalPages);
  const [queryParams] = useSearchParams();
  const location = useLocation();
  const currentPage = Number(queryParams.get('page')) || 1;
  const cn = bem('Pagination');
  const pages = usePagination({
    totalPages,
    currentPage,
  });

  if (totalPages < 2) return null;

  return (
    <div className={cn()}>
      {pages.map((item, idx) => {
        if (item === DOTS) {
          return (
            <span className={cn('dots')} key={idx}>
              {item}
            </span>
          );
        }

        return (
          <NavLink
            to={item === 1 ? '/' : `/catalog/?page=${item}`}
            className={({ isActive }) => {
              return cn('item', {
                active:
                  (isActive || location.pathname === '/catalog') &&
                  item === currentPage,
              });
            }}
            key={idx}
          >
            {item}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Pagination;
