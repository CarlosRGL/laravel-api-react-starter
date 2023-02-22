import React from "react";

function Loading() {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr>
        <td
          colSpan={5}
          className=" whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6"
        >
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default Loading;
