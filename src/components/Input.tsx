import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Repository } from "../redux/types";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  history?: Repository[];
}

const Input: React.FC<InputProps> = ({ history, ...rest }) => {
  return (
    <div className="relative flex items-center w-full rounded-lg bg-white shadow-sm">
      <input
        type="text"
        className="custom-input py-3 px-4 w-full rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:block"
        {...rest}
      />
      <SearchIcon className="h-6 w-6 text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2" />
    </div>
  );
};

export default Input;
