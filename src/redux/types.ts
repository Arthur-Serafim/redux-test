export interface GitHubSearchState {
  searchTerm: string;
  searchResults: Repository[];
  selectedRepository: Repository | null;
  isLoading: boolean;
  error: string | null;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}
