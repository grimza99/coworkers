import Image from 'next/image';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="my-8 flex items-center justify-center gap-2">
      <button
        title="이전 페이지"
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-bg100 h-8 w-8 rounded-full disabled:opacity-30"
      >
        <Image src="/icons/prev-arrow-icon.svg" alt="이전" width={32} height={32} />
      </button>

      {pages.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={`text-lg-md h-8 w-8 rounded-full ${
            page === currentPage ? 'bg-bg100 text-primary' : 'bg-bg100 text-gray300'
          } hover:bg-primary hover:text-white`}
        >
          {page}
        </button>
      ))}

      <button
        title="다음 페이지"
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-bg100 h-8 w-8 rounded-full disabled:opacity-30"
      >
        <Image src="/icons/next-arrow-icon.svg" alt="다음" width={32} height={32} />
      </button>
    </div>
  );
}
