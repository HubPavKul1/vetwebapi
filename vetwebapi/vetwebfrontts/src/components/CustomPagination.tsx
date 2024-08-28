import Pagination from "react-bootstrap/Pagination";

interface CustomPaginationProps {
  setPageNum: CallableFunction;
  dataTotal: number;
  dataPerPage: number;
  pageNum: number;
}

export function CustomPagination({
  setPageNum,
  dataTotal,
  dataPerPage,
  pageNum,
}: CustomPaginationProps) {
  const pageNums = Array.from(
    Array(Math.ceil(dataTotal / dataPerPage)).keys(),
    (n) => n + 1
  );
  const clickHandler = (page: number) => {
    pageNum = page;
    setPageNum(pageNum);
  };
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      {pageNums.map((page, index) => (
        <Pagination.Item key={index} onClick={() => clickHandler(page)}>
          {page}
        </Pagination.Item>
      ))}

      {/* <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item> */}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}
