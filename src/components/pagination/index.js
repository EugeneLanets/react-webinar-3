import { cn as bem } from '@bem-react/classname';
import './style.css';
import { NavLink } from 'react-router-dom';
import getPages from '../../utils';
import propTypes from 'prop-types';

function Pagination({ totalPages, currentPage, separator = '…', pathname }) {
  const cn = bem('Pagination');
  const pages = getPages({
    totalPages,
    currentPage,
    separator,
  });

  if (totalPages < 2) return null;

  return (
    <div className={cn()}>
      {pages.map((item, idx) => {
        if (item === separator) {
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
                  (isActive || pathname === '/catalog') && item === currentPage,
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

Pagination.propTypes = {
  totalPages: propTypes.number,
  currentPage: propTypes.number,
  separator: propTypes.string,
  pathname: propTypes.string,
};

export default Pagination;
