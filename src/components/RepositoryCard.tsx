import React from "react";
import { Repository } from "../redux/types";

interface Props {
  repository: Repository;
}

const RepositoryCard: React.FC<Props> = ({ repository }) => {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">{repository.name}</h2>
      <p className="mb-2">{repository.description}</p>
      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 mr-2"
      >
        Repository Link
      </a>
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Deploy
      </button>
    </div>
  );
};

export default RepositoryCard;
