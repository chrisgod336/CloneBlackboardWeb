import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

type PageItem = {
  label: string | number;
  page: number;
};

type BootstrapPaginationProps = {
  pages: PageItem[];
  activePage: number;
  onChange: (page: number) => void;
};

export const Pagination: React.FC<BootstrapPaginationProps> = ({
  pages,
  activePage,
  onChange
}) => {
  return (
    <BootstrapPagination>
      {pages.map(({ label, page }) => (
        <BootstrapPagination.Item
          key={page}
          active={page === activePage}
          onClick={() => onChange(page)}
        >
          {label}
        </BootstrapPagination.Item>
      ))}
    </BootstrapPagination>
  );
};
