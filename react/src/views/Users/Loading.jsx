import React from "react";

function Loading({ items }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {Array.from({ length: items }, (_, i) => (
        <tr key={i}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6 ">
            <div className="animate-pulse h-4 bg-gray-300 w-1/4 rounded-lg"></div>
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
            <div className="animate-pulse h-4 bg-gray-300 w-1/2 rounded-lg"></div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="animate-pulse h-4 bg-gray-300 w-1/2 rounded-lg"></div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="animate-pulse h-4 bg-gray-300 w-1/2 rounded-lg"></div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="animate-pulse h-4 bg-gray-300 w-1/2 rounded-lg"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default Loading;
