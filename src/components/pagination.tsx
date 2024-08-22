import { appendQueryParams, extractQueryParams } from "@/lib/utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PaginationProps {
  totalPages: number;
}
const LIMIT_OPTIONS = ["05", "10", "15", 20];
export const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const navigate = useNavigate();
  const params = extractQueryParams(window.location.href);
  const [currentPage, setPage] = useState(+params.page || 1);
  const [limit, setLimit] = useState(+params.limit || 10);

  const handlePageChange = (page: number) => {
    setPage(page);
    const parameterizedUrl = appendQueryParams(window.location.href, {page: `${page}`})
    navigate(parameterizedUrl);
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
    const parameterizedUrl = appendQueryParams(window.location.href, {limit: `${limit}`})
    navigate(parameterizedUrl);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between">
      <select
        className="w-28 bg-white border p-1 rounded"
        value={limit}
        onChange={(e) => handleLimitChange(+e.target.value)}
      >
        {LIMIT_OPTIONS.map((l) => (
          <option key={l} value={l} className="p-1">
            {l}
          </option>
        ))}
      </select>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4">
        <button
          className="px-3 py-1 text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          onClick={handlePrevious}
          disabled={+currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
