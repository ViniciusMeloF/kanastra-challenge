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
import { useCharacters } from "@/contexts/CharactersContext";

export function CharacterListPagination() {
  const { PAGINATION_CONTROLLER, STATE_CONTROLLER } = useCharacters();

  const total = STATE_CONTROLLER.characters.total;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const renderPaginationItems = () => {
    const MAX_VISIBLE_PAGES = 2;
    const ELLIPSIS = -1;

    let localPages = [];

    if (totalPages > 5) {
      const start = Math.max(
        2,
        PAGINATION_CONTROLLER.currentPage - MAX_VISIBLE_PAGES
      );
      const end = Math.min(
        totalPages - 1,
        PAGINATION_CONTROLLER.currentPage + MAX_VISIBLE_PAGES
      );

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
            isActive={PAGINATION_CONTROLLER.currentPage === page}
            onClick={() => PAGINATION_CONTROLLER.handlePageChange(page)}
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
            onClick={() =>
              PAGINATION_CONTROLLER.handlePageChange(
                PAGINATION_CONTROLLER.currentPage - 1
              )
            }
            disabled={PAGINATION_CONTROLLER.currentPage === 1}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() =>
              PAGINATION_CONTROLLER.handlePageChange(
                PAGINATION_CONTROLLER.currentPage + 1
              )
            }
            disabled={
              PAGINATION_CONTROLLER.currentPage ===
              Math.ceil(total / ITEMS_PER_PAGE)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
