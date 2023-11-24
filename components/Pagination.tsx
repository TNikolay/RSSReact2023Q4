interface IProps {
  readonly total: number;
  readonly itemsPerPage: number;
  readonly current: number;
  readonly onClick: (page: number) => void;
}

export default function Pagination({ total, itemsPerPage, current, onClick }: IProps) {
  const count = Math.ceil(total / itemsPerPage);
  if (count < 2) return null;

  const pages = new Array(count).fill(0);

  return (
    <div className="py-5 pr-20">
      <span className="font-bold">Page:</span>
      {pages.map((_, index) => {
        const page = index + 1;
        return page === current ? (
          <span className="ml-2 font-bold" key={page}>
            {page}
          </span>
        ) : (
          <button
            className="ml-2 cursor-pointer hover:underline hover:font-bold"
            key={page}
            onClick={() => onClick(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
