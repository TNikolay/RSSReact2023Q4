import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserModel } from '../interfaces';

export interface IFormState {
  data: IUserModel[];
}

const initialState: IFormState = {
  data: [],
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
