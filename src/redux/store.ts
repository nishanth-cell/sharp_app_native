import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import attendanceReducer from "./slices/attendanceSlice";
import peopleReducer from "./slices/peopleSlice";
import commonFloorReducer from "./slices/commonFloorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    people: peopleReducer,
     commonFloor: commonFloorReducer,
  },
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;