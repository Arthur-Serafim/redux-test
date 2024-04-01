import { FC } from "react";
import { Repository } from "../redux/types";
import {
  setSearchResults,
  setSearchTerm,
  setSelectedRepository,
} from "../redux/slices/searchSlice";
import { useDispatch } from "react-redux";
import HistoryIcon from "@mui/icons-material/History";

const ResultItem: FC<{ data: Repository; history?: boolean }> = ({
  data,
  history,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedRepository(data));
    dispatch(setSearchTerm(""));
    dispatch(setSearchResults([]));
  };
  return (
    <button
      className="p-2 hover:bg-gray-100 rounded-md cursor-pointer flex align-center w-full focus:outline-none focus:bg-gray-100"
      onClick={handleClick}
    >
      {history && <HistoryIcon className="mr-1" />}
      {data.name}
    </button>
  );
};

export default ResultItem;
