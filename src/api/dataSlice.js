import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../data/db.json';

const initialState = {
  data: []
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { loadData } = dataSlice.actions;

export const fetchDataFromJson = () => (dispatch) => {
  dispatch(loadData(fetchData));
};

export default dataSlice.reducer;