import React from 'react';
import styles from './Pagination.module.scss';

/**
 * Pagination component for navigating through character pages
 * Provides accessible navigation with current page indication
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}) => {
  /**
   * Generate page numbers to display
   * Shows current page with 2 pages on each side, plus first and last
   */
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Calculate range
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // Always include first page
    if (totalPages > 1) {
      range.push(1);
    }

    // Add pages around current page
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Always include last page
    if (totalPages > 1 && !range.includes(totalPages)) {
      range.push(totalPages);
    }

    // Add dots where needed
    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  /**
   * Handle page click
   */
  const handlePageClick = page => {
    if (page !== currentPage && page !== '...') {
      onPageChange(page);
    }
  };

  /**
   * Handle keyboard navigation
   */
  const handleKeyPress = (e, page) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePageClick(page);
    }
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label='Character pagination' className={styles.paginationNav}>
      <ul className={`pagination ${styles.pagination}`}>
        {/* Previous Button */}
        <li className={`page-item ${!hasPrevious ? 'disabled' : ''}`}>
          <button
            className={`page-link ${styles.pageLink}`}
            onClick={onPrevious}
            disabled={!hasPrevious}
            aria-label='Go to previous page'
            title='Previous page'
          >
            <span aria-hidden='true'>‹</span>
            <span className='visually-hidden'>Previous</span>
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <li
            key={index}
            className={`${styles.pageButton} page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? styles.disabled : ''}`}
          >
            {page === '...' ? (
              <span
                className={`page-link ${styles.ellipsis}`}
                aria-hidden='true'
              >
                ...
              </span>
            ) : (
              <button
                className={`page-link ${styles.pageLink} ${page === currentPage ? styles.active : ''}`}
                onClick={() => handlePageClick(page)}
                onKeyDown={e => handleKeyPress(e, page)}
                aria-label={
                  page === currentPage
                    ? `Current page ${page}`
                    : `Go to page ${page}`
                }
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li className={`page-item ${!hasNext ? 'disabled' : ''}`}>
          <button
            className={`page-link ${styles.pageLink}`}
            onClick={onNext}
            disabled={!hasNext}
            aria-label='Go to next page'
            title='Next page'
          >
            <span aria-hidden='true'>›</span>
            <span className='visually-hidden'>Next</span>
          </button>
        </li>
      </ul>

      {/* Page Info */}
      <div className={styles.pageInfo}>
        <span className={styles.pageInfoText}>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </nav>
  );
};

export default Pagination;
