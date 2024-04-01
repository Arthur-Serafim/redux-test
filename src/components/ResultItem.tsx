import { FC } from "react";
import { Repository } from "../redux/types";

const ResultItem: FC<{ data: Repository }> = ({ data }) => {
  return (
    <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
      {data.name} {data.description}
    </div>
  );
};

export default ResultItem;
