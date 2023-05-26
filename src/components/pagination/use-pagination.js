import { useMemo } from 'react';
import { range } from '../../utils';

export default function usePagination({ totalPages, currentPage }) {
  const items = useMemo(() => {
    const ITEMS_NUMBER = 7;
    const DOTS = '…';
    console.log(totalPages);
    if (ITEMS_NUMBER >= totalPages) {
      console.log('Option 1');
      return range(1, totalPages);
    }

    const leftSibling = Math.max(currentPage - 1, 1);
    const rightSibling = Math.min(currentPage + 1, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 2;

    if (!showLeftDots && showRightDots) {
      console.log('Option 2');
      console.log(rightSibling);
      return [...range(1, rightSibling + 1), DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      console.log('Option 3');
      return [1, DOTS, ...range(leftSibling - 1, totalPages)];
    }

    if (showLeftDots && showRightDots) {
      console.log('Option 4');
      return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, totalPages];
    }
  }, [totalPages, currentPage]);

  return items;
}
