interface PaginationControlsProps {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({
  currentPage,
  hasNextPage,
  onPageChange,
}: PaginationControlsProps) => {
  return (
    <div className="pagination-controls">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>

      <span className="pagination-info">
        Page {currentPage}
      </span>

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
