import React from "react";
import SearchBox from "./components/SearchBox";
import RepositoryCard from "./components/RepositoryCard";
import { useSelector } from "react-redux";
import { GitHubSearchState } from "./redux/types";

const App: React.FC = () => {
  const selectedRepository = useSelector(
    (state: { search: GitHubSearchState }) => state.search.selectedRepository
  );

  return (
    <div className="container mx-auto p-4">
      <SearchBox />
      {selectedRepository && <RepositoryCard repository={selectedRepository} />}
    </div>
  );
};

export default App;
