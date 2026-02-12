import AppButton from "@/app/components/button/AppButton";

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export default function TableFooter({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: TableFooterProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span>
        </div>
        <div className="flex items-center gap-2">
          <AppButton
            onPress={handlePrevious}
            label="Previous"
            isDisabled={currentPage === 1}
            type="button"
            className="flex w-auto items-center cursor-pointer justify-center gap-2 rounded-md bg-white border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="text-sm text-gray-700 px-3">
            Page {currentPage} of {totalPages}
          </div>
          <AppButton
            onPress={handleNext}
            label="Next"
            isDisabled={currentPage === totalPages}
            type="button"
            className="flex w-auto items-center cursor-pointer justify-center gap-2 rounded-md bg-white border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
