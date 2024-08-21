import { RootState } from "@/store";
import { IUser } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const useUser = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return {user, setUser};
}
