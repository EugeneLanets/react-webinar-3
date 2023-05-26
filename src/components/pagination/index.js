import useSelector from '../../store/use-selector';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import usePagination from './use-pagination';
function Pagination() {
  const totalPages = useSelector((state) => state.catalog.totalPages);
  const currentPage = useSelector((state) => state.catalog.currentPage);
  const cn = bem('Pagination');
  const pages = usePagination({
    totalPages: totalPages,
    currentPage: currentPage,
  });

  if (totalPages < 2) return null;

  console.log(pages);

  return (
    <div className={cn()}>
      {pages.map((item) => {
        const isActive = item === currentPage;
        return (
          <a
            href={!isActive && '#'}
            className={cn('item', { active: isActive })}
            key={item}
          >
            {item}
          </a>
        );
      })}
    </div>
  );
}
export default Pagination;
