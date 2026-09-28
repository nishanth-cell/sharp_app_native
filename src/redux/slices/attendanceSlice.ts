import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AttendanceRecord = {
  id: number;
  student_id: number;
  att_date: string;
  status: "Present" | "Manual" | "Absent";
  reason: string | null;
  marked_by: number | null;
  created_at: string;
  marked_by_name: string | null;
};

type AttendanceStudent = {
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

type AttendanceState = {
  student: AttendanceStudent | null;
  rate: number;
  records: AttendanceRecord[];
  loading: boolean;
  error: string | null;
};

const initialState: AttendanceState = {
  student: null,
  rate: 0,
  records: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",

  initialState,

  reducers: {
    setAttendanceLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },

    setAttendance: (
      state,
      action: PayloadAction<{
        student: AttendanceStudent;
        rate: number;
        records: AttendanceRecord[];
      }>
    ) => {
      state.student = action.payload.student;
      state.rate = action.payload.rate;
      state.records = action.payload.records;
      state.loading = false;
      state.error = null;
    },

    setAttendanceError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearAttendance: (state) => {
      state.student = null;
      state.rate = 0;
      state.records = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setAttendanceLoading,
  setAttendance,
  setAttendanceError,
  clearAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;