import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "../utils/functions/classes";

export default function Pagination({ pagination, setPage }) {
  const { current_page, last_page, from, to, total } = pagination;
  const handleClick = (ev) => {
    ev.preventDefault();
    setPage(ev.target.dataset.page);
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-6 sm:px-8">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{from}</span> to{" "}
            <span className="font-medium">{to}</span> of{" "}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {current_page > 1 && (
              <a
                href="#"
                onClick={handleClick}
                data-page={current_page - 1}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {Array.from({ length: last_page }, (_, i) => (
              <a
                key={i}
                href="#"
                onClick={handleClick}
                data-page={i + 1}
                className={classNames(
                  i + 1 === current_page
                    ? "z-10 bg-indigo-100 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                  "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium focus:z-20"
                )}
              >
                {i + 1}
              </a>
            ))}
            {current_page < last_page && (
              <a
                onClick={handleClick}
                data-page={current_page + 1}
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
