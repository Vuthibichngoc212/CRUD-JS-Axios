import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IForm } from "../interface/form";

const initialState: IForm = {
  user: { email: "", name: "" },
};

export const userSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IForm['user']>) => {
      state.user = action.payload;
    },
  },
});
export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
