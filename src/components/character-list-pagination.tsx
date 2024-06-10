import { ITEMS_PER_PAGE } from "@/utils/pagination";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface CharacterListPaginationProps {
  total: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export function CharacterListPagination({
  currentPage,
  handlePageChange,
  total,
}: CharacterListPaginationProps) {
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const renderPaginationItems = () => {
    const MAX_VISIBLE_PAGES = 2;
    const ELLIPSIS = -1;

    let localPages = [];

    if (totalPages > 5) {
      const start = Math.max(2, currentPage - MAX_VISIBLE_PAGES);
      const end = Math.min(totalPages - 1, currentPage + MAX_VISIBLE_PAGES);

      localPages.push(1);
      if (start > 2) localPages.push(ELLIPSIS);

      for (let i = start; i <= end; i++) {
        localPages.push(i);
      }

      if (end < totalPages - 1) localPages.push(ELLIPSIS);
      localPages.push(totalPages);
    } else {
      localPages = pages;
    }

    return localPages.map((page, index) => (
      <PaginationItem key={index}>
        {page === ELLIPSIS ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            isActive={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(total / ITEMS_PER_PAGE)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
