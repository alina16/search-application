import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Service from './../service';
import { RootState } from '../rootReducer';
import { Params } from '../service'

export enum errorTypes {
  ERROR = 'error',
  WARNING = 'warning',
}
export const NO_ITEMS_FOUND = 'No items found';
export const NO_ITEMS_ERROR = { type: errorTypes.WARNING, message: NO_ITEMS_FOUND };

export type GithubItem = {
  avatar_url: string, 
  events_url: string,
  id: number,
  login: string,
  node_id: string,
  repos_url: string,
  url: string,
}

export type User = GithubItem & {
  followers_url: string,
  following_url: string,
  gists_url: string,
  gravatar_id: string,
  html_url: string,
  organizations_url: string,
  received_events_url: string,
  score: number,
  site_admin: boolean,
  starred_url: string,
  subscriptions_url: string,
  type: string,
}

export const searchUsers = createAsyncThunk(
  'search/users',
  async (params: Params) => {
      const res = await Service.searchUsers(params);
      return res.data
  }
)

type Error = {
  type: errorTypes.ERROR | errorTypes.WARNING,
  message: string,
}

type SearchState = {
  loading: boolean,
  error: Error | null,
  users: User[],
}

const initialState: SearchState = {
  loading: false,
  error: null,
  users: [],
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.users = [];
    });
    builder.addCase(searchUsers.fulfilled, (state, { payload: { items } }) => {
      state.loading = false;
      state.users = items;
      state.error = items.length ? null : NO_ITEMS_ERROR;
    });
    builder.addCase(searchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error =  { type: errorTypes.ERROR, message: action?.error?.message || 'error' };
      state.users = [];
    });
  } 
})

export const selectUsers = (state: RootState) => state.search.users;
export const selectLoading = (state: RootState) => state.search.loading;
export const selectError = (state: RootState) => state.search.error;

export default searchSlice.reducer