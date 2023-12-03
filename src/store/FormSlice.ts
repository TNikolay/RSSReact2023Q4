import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ListOfCountries } from '../const';
import { IUserModel } from '../interfaces';

export interface IFormState {
  data: IUserModel[];
  countries: string[];
}

const initialState: IFormState = {
  data: [],
  countries: ListOfCountries,
};

export const formSlice = createSlice({
  name: 'formdata',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<IUserModel>) => {
      state.data.unshift(action.payload);
    },
  },
});

export const { addData } = formSlice.actions;
export default formSlice.reducer;
