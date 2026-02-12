"use client";

import { useState } from "react";
import TableFooter from "@/app/components/home/TableFooter/TableFooter";

interface TableData {
  name: string;
  status: string;
  species: string;
  gender: string;
}

interface TableProps {
  data: TableData[];
  itemsPerPage?: number;
}

export default function Table({ data, itemsPerPage = 10 }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const headers = ["Name", "Status", "Species", "Gender"];

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden h-full flex flex-col">
      <div className="overflow-x-auto flex-1 min-h-0 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6 sm:py-4 sm:text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-4 py-8 text-center text-sm text-gray-500 sm:px-6"
                >
                  No data available
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap sm:px-6 sm:py-4">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap sm:px-6 sm:py-4">
                    {row.status}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap sm:px-6 sm:py-4">
                    {row.species}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap sm:px-6 sm:py-4">
                    {row.gender}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {data.length > 0 && (
        <TableFooter
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
}
