import { useMemo } from "react";

const range = (start: number, end: number): Array<number> => {
  let length = end - start;

  return Array.from({ length }, (_, index) => index + start);
};

const DOTS = "...";

type Arguments = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount: number;
};

const usePagination = (args: Arguments) => {
  const { totalCount, pageSize, currentPage, siblingCount = 1 } = args;

  const paginatioRange: (number | string)[] =
    useMemo(() => {
      const totalPageCount = Math.ceil(totalCount / pageSize);

      // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
      const totalPageNumbers = siblingCount + 5;

      if (totalPageNumbers > totalPageCount) return range(0, totalPageCount);

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 0);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount - 1
      );

      /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

      const firstPageIndex = 0;
      const lastPageIndex = totalPageCount - 1;

      /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = range(0, leftItemCount);

        return [...leftRange, DOTS, totalPageCount];
      }

      /*
    	Case 3: No right dots to show, but left dots to be shown
    */
      if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = range(totalPageCount - rightItemCount, totalPageCount - 1);
        return [firstPageIndex, DOTS, ...rightRange];
      }

      /*
    	Case 4: Both left and right dots to be shown
    */
      if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }
    }, [totalCount, pageSize, currentPage, siblingCount]) || [];

  return paginatioRange;
};

export default usePagination;
