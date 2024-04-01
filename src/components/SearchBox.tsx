import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  fetchSearchResultsThunk,
} from "../redux/slices/searchSlice";
import { Repository } from "../redux/types";
import ResultItem from "./ResultItem";
import Input from "./Input";

interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = () => {
  const dispatch = useDispatch<typeof searchState>();
  const searchState = useSelector((state: any) => state.search);
  console.log(searchState.searchResults);
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));

    if (event.target.value.trim()) {
      dispatch(fetchSearchResultsThunk(event.target.value));
    }
  };

  return (
    <div className="mb-4">
      <Input
        type="text"
        value={searchState.searchTerm}
        onChange={handleSearch}
        placeholder="Search"
      />
      <div className="overflow-y-auto max-h-[320px]">
        {searchState.searchResults.map((result: Repository) => (
          <ResultItem data={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
