import { useMemo } from 'react';
import { range } from '../../utils';

export const DOTS = '…';
export default function usePagination({ totalPages, currentPage }) {
  return useMemo(() => {
    const ITEMS_NUMBER = 7;
    if (ITEMS_NUMBER >= totalPages) {
      return range(1, totalPages);
    }

    const leftSibling = Math.max(currentPage - 1, 1);
    const rightSibling = Math.min(currentPage + 1, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const lastItem = currentPage === 1 ? rightSibling + 1 : rightSibling;
      return [...range(1, lastItem), DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const firstItem =
        currentPage === totalPages ? leftSibling - 1 : leftSibling;
      return [1, DOTS, ...range(firstItem, totalPages)];
    }

    if (showLeftDots && showRightDots) {
      return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, totalPages];
    }
  }, [totalPages, currentPage]);
}
