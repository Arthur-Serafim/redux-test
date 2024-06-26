import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSearchResults } from "../api";
import { GitHubSearchState, Repository } from "../types";

const initialState: GitHubSearchState = {
  searchTerm: "",
  history: [],
  searchResults: [],
  selectedRepository: null,
  isLoading: false,
  error: null,
};

export const fetchSearchResultsThunk = createAsyncThunk<Repository[], string>(
  "search/fetchResults",
  async (searchTerm: string) => await fetchSearchResults(searchTerm)
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedRepository(state, action) {
      const existingIndex = state.history.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex !== -1) {
        state.history = state.history.filter(
          (item) => item.id !== action.payload.id
        );
      }

      state.history = [action.payload, ...state.history].slice(0, 3);
      state.selectedRepository = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResultsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResultsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResultsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const { setSearchTerm, setSelectedRepository, setSearchResults } =
  searchSlice.actions;
export default searchSlice.reducer;
