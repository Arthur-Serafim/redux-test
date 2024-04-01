import axios from 'axios';

const baseUrl = 'https://api.github.com';

export const fetchSearchResults = async (searchTerm: string) => {
  const url = `${baseUrl}/search/repositories?q=${searchTerm}`;
  const response = await axios.get(url);
  return response.data.items 
};
