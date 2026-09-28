import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export type Person = {
  id: string;
  name: string;
  username: string;
  role: string;
  college_id: number | null;
  org: string | null;
  batch: string | null;
  mobile: string | null;
  email: string | null;
  status: string;
  must_change_password: boolean;
  initials: string;
  color: string;
  last_login: string | null;
  created_at: string;
};

type PeopleState = {
  users: Person[];
  loading: boolean;
  error: string | null;
};

const initialState: PeopleState = {
  users: [],
  loading: false,
  error: null,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,

  reducers: {
    setPeopleLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },

    setPeople: (
      state,
      action: PayloadAction<Person[]>
    ) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },

    setPeopleError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearPeople: (state) => {
      state.users = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setPeopleLoading,
  setPeople,
  setPeopleError,
  clearPeople,
} = peopleSlice.actions;

export default peopleSlice.reducer;

