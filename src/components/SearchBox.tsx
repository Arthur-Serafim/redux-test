import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  fetchSearchResultsThunk,
} from "../redux/slices/searchSlice";
import { Repository } from "../redux/types";
import ResultItem from "./ResultItem";
import Input from "./Input";
import useDebounce from "../hooks/useDebounceSearch";
import OutsideClickHandler from "react-outside-click-handler";
interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = () => {
  const dispatch = useDispatch<typeof searchState>();
  const searchState = useSelector((state: any) => state.search);
  const debouncedSearch = useDebounce(searchState.searchTerm, 500); // Adjust the delay as needed
  const [isFocused, setIsFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  useEffect(() => {
    if (debouncedSearch.trim()) {
      dispatch(fetchSearchResultsThunk(debouncedSearch));
    }
  }, [debouncedSearch, dispatch]);

  return (
    <div className="mb-4 relative">
      <OutsideClickHandler
        onOutsideClick={() => {
          setShowSearchResults(false);
          setIsFocused(false);
        }}
      >
        <Input
          type="text"
          value={searchState.searchTerm}
          onChange={handleSearch}
          history={searchState.searchResults.length ? [] : searchState.history}
          onFocus={() => {
            setIsFocused(true);
            setShowSearchResults(true);
          }}
          placeholder="Search"
        />
        <div
          className="overflow-y-auto max-h-[320px] absolute bg-white mt-2 w-full"
          onClick={() => setIsFocused(false)}
        >
          {showSearchResults &&
            searchState.searchResults.map((result: Repository) => (
              <ResultItem key={result.id} data={result} />
            ))}
          {isFocused &&
            !searchState.searchResults.length &&
            searchState.history?.map((result: Repository) => (
              <ResultItem key={result.id} data={result} history />
            ))}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default SearchBox;
