import Pagination from "react-bootstrap/Pagination";
import usePagination from "../hooks/usePagination";

interface Props {
  currentPage: number;
  totalCount: number;
  siblingCount: number;
  pageSize: number;
  setPage(wantedPage: number): void;
}

export default function PokemonPagination({
  currentPage,
  totalCount,
  siblingCount,
  pageSize,
  setPage,
}: Props) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  return (
    <Pagination>
      <Pagination.Prev onClick={() => setPage(currentPage - 1)} />
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return <Pagination.Ellipsis />;
        }
        return (
          <Pagination.Item
            active={pageNumber === currentPage}
            key={index}
            onClick={() => setPage(Number(pageNumber))}
          >
            {Number(pageNumber) + 1}
          </Pagination.Item>
        );
      })}
      <Pagination.Next onClick={() => setPage(currentPage + 1)} />
    </Pagination>
  );
}
