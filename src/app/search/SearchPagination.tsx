"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { pagination } from "@/utils";
import React from "react";

type Props = {
  search: string;
  page: number;
  totalPages: number;
};

const SearchPagination = ({ search, page, totalPages }: Props) => {
  return (
    <Pagination className="py-4">
      <PaginationContent className="flex-wrap">
        <PaginationItem>
          <PaginationPrevious
            href={`/search?search=${search}&page=${page > 1 ? page - 1 : page}`}
          />
        </PaginationItem>
        {pagination(5, "...")(page, totalPages).map((_page) => (
          <PaginationItem key={_page}>
            <PaginationLink
              href={`/search?search=${search}&page=${
                _page === "..." ? (page < totalPages ? page + 1 : page) : _page
              }`}
              isActive={page === _page}
            >
              {_page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={`/search?search=${search}&page=${
              page < totalPages ? page + 1 : page
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default SearchPagination;
