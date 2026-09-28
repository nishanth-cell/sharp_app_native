import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export type CommonFloorMessage = {
  id: number;
  user_id: number;
  message: string;
  flagged: number;
  muted: number;
  created_at: string;
  author_name: string;
  author_role: string;
  avatar_initials: string;
  avatar_color: string;
  author_public_id: string;
};

type CommonFloorState = {
  messages: CommonFloorMessage[];
  loading: boolean;
  error: string | null;
};

const initialState: CommonFloorState = {
  messages: [],
  loading: false,
  error: null,
};

const commonFloorSlice = createSlice({
  name: "commonFloor",
  initialState,

  reducers: {
    setCommonFloorLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },

    setCommonFloor: (
      state,
      action: PayloadAction<CommonFloorMessage[]>
    ) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
    },

    setCommonFloorError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearCommonFloor: (state) => {
      state.messages = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setCommonFloorLoading,
  setCommonFloor,
  setCommonFloorError,
  clearCommonFloor,
} = commonFloorSlice.actions;

export default commonFloorSlice.reducer;