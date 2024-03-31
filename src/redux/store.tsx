import { configureStore } from "@reduxjs/toolkit";
import allocatedSlice from "./allocatedSlice";
import { MoneyCalcReducer } from "./moneySlice";

export const store = configureStore({
  reducer: {
    allocatedBudget: allocatedSlice,
    moneyCalc: MoneyCalcReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
