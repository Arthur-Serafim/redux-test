import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  fetchSearchResultsThunk,
} from "../redux/slices/searchSlice";
import { Repository } from "../redux/types";
import ResultItem from "./ResultItem";
import Input from "./Input";
import useDebounce from "../hooks/useDebounceSearch";

interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = () => {
  const dispatch = useDispatch<typeof searchState>();
  const searchState = useSelector((state: any) => state.search);
  const debouncedSearch = useDebounce(searchState.searchTerm, 500); // Adjust the delay as needed

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  useEffect(() => {
    if (debouncedSearch.trim()) {
      dispatch(fetchSearchResultsThunk(debouncedSearch));
    }
  }, [debouncedSearch]);

  return (
    <div className="mb-4 relative">
      <Input
        type="text"
        value={searchState.searchTerm}
        onChange={handleSearch}
        placeholder="Search"
      />
      <div className="overflow-y-auto max-h-[320px] absolute bg-white mt-2 w-full">
        {searchState.searchResults.map((result: Repository) => (
          <ResultItem data={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
