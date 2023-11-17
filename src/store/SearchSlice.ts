import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const LS_ITEMS_PER_PAGE_NAME = 'TN_ItemsPerPage2';

export interface ISearchState {
  query: string;
  itemsPerPage: number;
}

const initialState: ISearchState = {
  query: '',
  itemsPerPage: +(localStorage.getItem(LS_ITEMS_PER_PAGE_NAME) ?? '20'),
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
});

export const { setQuery, setItemPerPage } = searchSlice.actions;
export default searchSlice.reducer;
