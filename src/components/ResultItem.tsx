import { FC } from "react";
import { Repository } from "../redux/types";
import { setSearchResults, setSelectedRepository } from "../redux/slices/searchSlice";
import { useDispatch } from "react-redux";

const ResultItem: FC<{ data: Repository }> = ({ data }) => {
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(setSelectedRepository(data));
    dispatch(setSearchResults([]))
  };

  return (
    <div
      className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
      onClick={handleClick}
    >
      {data.name}
    </div>
  );
};

export default ResultItem;
