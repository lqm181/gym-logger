import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

const initialState: User = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  weight_unit: 'lbs',
  img_url: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;

      state.email = user.email;
      state.id = user.id;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.weight_unit =
        user.weight_unit &&
        (user.weight_unit === 'kg' || user.weight_unit === 'lbs')
          ? user.weight_unit
          : 'lbs';
      state.img_url = user.img_url;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
