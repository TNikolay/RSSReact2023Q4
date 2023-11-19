import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { charactersApi } from './CharactersApi';

const LS_ITEMS_PER_PAGE_NAME = 'TN_ItemsPerPage2';

export interface ISearchState {
  query: string;
  itemsPerPage: number;
  isLoadingList: boolean;
  isLoadingCard: boolean;
}

const initialState: ISearchState = {
  query: '',
  itemsPerPage: +(localStorage.getItem(LS_ITEMS_PER_PAGE_NAME) ?? '20'),
  isLoadingList: false,
  isLoadingCard: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setItemPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      localStorage.setItem(LS_ITEMS_PER_PAGE_NAME, action.payload.toString());
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(charactersApi.endpoints.getCharacters.matchPending, (state) => {
      state.isLoadingList = true;
    });
    builder.addMatcher(charactersApi.endpoints.getCharacters.matchFulfilled, (state) => {
      state.isLoadingList = false;
    });
    builder.addMatcher(charactersApi.endpoints.getCharacters.matchRejected, (state) => {
      state.isLoadingList = false;
    });
    builder.addMatcher(charactersApi.endpoints.getCharacter.matchPending, (state) => {
      state.isLoadingCard = true;
    });
    builder.addMatcher(charactersApi.endpoints.getCharacter.matchFulfilled, (state) => {
      state.isLoadingCard = false;
    });
    builder.addMatcher(charactersApi.endpoints.getCharacter.matchRejected, (state) => {
      state.isLoadingCard = false;
    });
  },
});

export const { setQuery, setItemPerPage } = searchSlice.actions;
export default searchSlice.reducer;
