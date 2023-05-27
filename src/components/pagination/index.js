import useSelector from '../../store/use-selector';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import usePagination, { DOTS } from './use-pagination';
<<<<<<< HEAD
import { NavLink, useSearchParams } from 'react-router-dom';
function Pagination() {
=======
import PropTypes from 'prop-types';
import { NavLink, useSearchParams } from 'react-router-dom';
function Pagination({ onPageChange }) {
>>>>>>> ed87f3cc48449b085be615b17eed1202b336a431
  const totalPages = useSelector((state) => state.catalog.totalPages);
  const [queryParams] = useSearchParams();
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
<<<<<<< HEAD
            className={({ isActive }) =>
              cn('item', { active: isActive && item === currentPage })
            }
=======
            className={({ isActive }) => {
              console.log(isActive);
              console.log(item, currentPage, item === currentPage);
              return cn('item', { active: isActive && item === currentPage });
            }}
>>>>>>> ed87f3cc48449b085be615b17eed1202b336a431
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
