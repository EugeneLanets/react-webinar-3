import useSelector from '../../store/use-selector';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import usePagination, { DOTS } from './use-pagination';
import PropTypes from 'prop-types';
function Pagination({ onPageChange }) {
  const totalPages = useSelector((state) => state.catalog.totalPages);
  const currentPage = useSelector((state) => state.catalog.currentPage);
  const cn = bem('Pagination');
  const pages = usePagination({
    totalPages: totalPages,
    currentPage: currentPage,
  });

  if (totalPages < 2) return null;

  return (
    <div className={cn()}>
      {pages.map((item, idx) => {
        const isActive = item === currentPage;
        if (item === DOTS) {
          return (
            <span className={cn('dots')} key={idx}>
              {item}
            </span>
          );
        }

        return (
          <button
            disabled={isActive}
            className={cn('item')}
            key={idx}
            onClick={() => {
              console.log('1111');
              onPageChange(item);
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func,
};
export default Pagination;
