import Pagination from "react-bootstrap/Pagination";

interface CustomPaginationProps {
  setPageNum: CallableFunction;
  pageNum: number;
  dataTotal: number;
  dataPerPage: number;
}

export function CustomPagination({
  setPageNum,
  pageNum,
  dataTotal,
  dataPerPage,
}: CustomPaginationProps) {
  const pageNums = Array.from(
    Array(Math.ceil(dataTotal / dataPerPage)).keys(),
    (n) => n + 1
  );
  const clickHandler = (page: number) => {
    setPageNum(page);
  };

  const toStartPage = () => {
    setPageNum(1);
  };

  const toPrevPage = () => {
    pageNum > 1 ? --pageNum : pageNum;
    setPageNum(pageNum);
  };

  const toNextPage = () => {
    pageNum < pageNums.length ? ++pageNum : pageNum;
    setPageNum(pageNum);
  };

  const toLastPage = () => {
    setPageNum(pageNums.length);
  };

  return (
    <Pagination>
      <Pagination.First onClick={toStartPage} disabled={pageNum === 1} />
      <Pagination.Prev onClick={toPrevPage} disabled={pageNum === 1} />
      {pageNums.map((page) => (
        <Pagination.Item
          key={page}
          active={page === pageNum}
          onClick={() => clickHandler(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={toNextPage}
        disabled={pageNum === pageNums.length}
      />
      <Pagination.Last
        onClick={toLastPage}
        disabled={pageNum === pageNums.length}
      />
    </Pagination>
  );
}
