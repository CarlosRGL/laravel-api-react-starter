import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchBar({ setSearch }) {
  const { pathname } = useLocation();
  const [inputValue, setInputValue] = useState(false);
  const [timer, setTimer] = useState(null);

  const inputChanged = (e) => {
    setInputValue(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      setSearch(inputValue);
    }, 500);

    setTimer(newTimer);
  };

  useEffect(() => {
    // reset search when pathname changes
    setSearch("");
    setInputValue("");
  }, [pathname]);

  return (
    <form className="flex w-full md:ml-0" action="#" method="GET">
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search-field"
          className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
          placeholder={
            pathname === "/users" ? "Search users.." : "Search posts.."
          }
          type="search"
          name="search"
          value={inputValue}
          onChange={inputChanged}
        />
      </div>
    </form>
  );
}

export default SearchBar;
