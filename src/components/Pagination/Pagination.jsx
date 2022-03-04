import React from 'react';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from 'components/Button';
import { ReactComponent as ChevronLeft } from 'assets/icons/chevron-left.svg';
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg';
import css from './Pagination.module.scss';

const range = (start, end) => {
  const res = [];
  let i = start;
  while (i <= end) {
    res.push(i);
    i++;
  }
  return res;
};

const Pagination = ({ className, pages, page, setPage }) => {
  let visiblePages = [];

  if (pages === 7) {
    visiblePages = [...range(1, 7)];
  } else if (pages > 7) {
    if (page <= 4) {
      visiblePages = [...range(1, 5), '...', pages];
    } else if (page > 4 && page < pages - 3) {
      visiblePages = [1, '...', ...range(page - 1, page + 1), '...', pages];
    } else if (page >= pages - 3 && page <= pages) {
      visiblePages = [1, '...', ...range(pages - 4, pages)];
    }
  } else if (pages < 7) {
    visiblePages = [...range(1, pages)];
  }

  const changePage = (activePage) => {
    if (activePage === page) {
      return;
    }
    setPage(activePage);
  };

  const handleArrowClick = (val, boundary) => {
    if (page === boundary) {
      return;
    }
    setPage(page + val);
  };

  return (
    <nav className={clsx(css.pagination, className)}>
      <ul className={css.list}>
        <li className={css.listItem}>
          <button
            type="button"
            className={clsx(css.chevron, page === 1 && css.disabled)}
            onClick={() => handleArrowClick(-1, 1)}
            disabled={page === 1}
          >
            <ChevronLeft className={css.chevronIcon} />
          </button>
        </li>
        {visiblePages.map((p, idx) => (
          <li key={idx} className={css.listItem}>
            {typeof p === 'string' ? (
              <Button className={css.button} disabled>
                {p}
              </Button>
            ) : (
              <Button
                className={css.button}
                active={page === p}
                disabled={page === p && css.active}
                onClick={() => changePage(p)}
              >
                {p}
              </Button>
            )}
          </li>
        ))}
        <li className={css['pagination-item']}>
          <button
            type="button"
            className={clsx(css.chevron, page === pages && css.disabled)}
            onClick={() => handleArrowClick(1, pages)}
            disabled={page === pages}
          >
            <ChevronRight className={css.chevronIcon} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

// Pagination.defaultProps = {
//   className: '',
// };

// Pagination.propTypes = {
//   className: PropTypes.string,
//   pages: PropTypes.number.isRequired,
//   page: PropTypes.number.isRequired,
//   setPage: PropTypes.func.isRequired,
// };

export default Pagination;
