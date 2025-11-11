import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Component props type definition
type PaginationComponentProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string>;
};

// Configuration constants
const PAGE_RANGE_DELTA = 2; // Number of pages to show on each side of current page
const ELLIPSIS = "...";

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationComponentProps) {
  // Don't render pagination if only one page exists
  if (totalPages <= 1) return null;

  /**
   * Generate URL for a specific page number
   * Merges existing search params with new page number
   */
  const buildPageUrl = (pageNum: number): string => {
    const urlParams = new URLSearchParams({ ...searchParams, page: String(pageNum) });
    return `${baseUrl}?${urlParams.toString()}`;
  };

  /**
   * Calculate which page numbers should be visible
   * Implements smart pagination with ellipsis for large page counts
   * Returns array of page numbers and ellipsis markers
   */
  const calculateVisiblePageNumbers = (): (number | string)[] => {
    const pagesInRange: number[] = [];
    const finalPageList: (number | string)[] = [];

    // Determine the range of pages around current page
    const rangeStart = Math.max(2, currentPage - PAGE_RANGE_DELTA);
    const rangeEnd = Math.min(totalPages - 1, currentPage + PAGE_RANGE_DELTA);

    // Collect pages in the middle range
    for (let pageNum = rangeStart; pageNum <= rangeEnd; pageNum++) {
      pagesInRange.push(pageNum);
    }

    // Add first page and ellipsis if needed
    if (currentPage - PAGE_RANGE_DELTA > 2) {
      finalPageList.push(1, ELLIPSIS);
    } else {
      finalPageList.push(1);
    }

    // Add middle range pages
    finalPageList.push(...pagesInRange);

    // Add ellipsis and last page if needed
    if (currentPage + PAGE_RANGE_DELTA < totalPages - 1) {
      finalPageList.push(ELLIPSIS, totalPages);
    } else {
      finalPageList.push(totalPages);
    }

    return finalPageList;
  };

  // Get the list of pages to display
  const pagesToDisplay = calculateVisiblePageNumbers();

  // Check if navigation buttons should be disabled
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  // Style classes for navigation buttons
  const navButtonStyles = {
    disabled: "text-gray-400 cursor-not-allowed bg-gray-100",
    enabled: "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300",
  };

  // Style classes for page number buttons
  const pageButtonStyles = {
    active: "bg-purple-600 text-white",
    inactive: "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300",
  };

  return (
    <nav className="flex items-center justify-center gap-1">
      {/* Previous page button */}
      <Link
        href={buildPageUrl(currentPage - 1)}
        className={`flex items-center px-3 py-2 text-sm font-meium rounded-lg ${
          isPreviousDisabled ? navButtonStyles.disabled : navButtonStyles.enabled
        }`}
        aria-disabled={isPreviousDisabled}
      >
        <ChevronLeft /> Prevous
      </Link>

      {/* Page number buttons */}
      {pagesToDisplay.map((pageItem, idx) => {
        // Render ellipsis as plain text
        if (pageItem === ELLIPSIS) {
          return (
            <span key={idx} className="px-3 py-2 text-sm text-gray-500">
              {ELLIPSIS}
            </span>
          );
        }

        // Render page number as clickable link
        const pageNum = pageItem as number;
        const isActivePage = pageNum === currentPage;

        return (
          <Link
            key={idx}
            href={buildPageUrl(pageNum)}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              isActivePage ? pageButtonStyles.active : pageButtonStyles.inactive
            }`}
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Next page button */}
      <Link
        href={buildPageUrl(currentPage + 1)}
        className={`flex items-center px-3 py-2 text-sm font-meium rounded-lg ${
          isNextDisabled ? navButtonStyles.disabled : navButtonStyles.enabled
        }`}
        aria-disabled={isNextDisabled}
      >
        Next
        <ChevronRight />
      </Link>
    </nav>
  );
}