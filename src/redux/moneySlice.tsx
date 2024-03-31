import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MoneyType = {
  currencyUnit: string;
  budgeted: number;
  allocated: number;
  remaining: number;
};

const initialState: MoneyType = {
  currencyUnit: "",
  budgeted: 0,
  allocated: 0,
  remaining: 0,
};

export const MoneySlice = createSlice({
  name: "money",
  initialState,
  reducers: {
    moneyCalc: (state, action: PayloadAction<MoneyType>) =>
      (state = action.payload),
    budgetedChanged: (state, action) => {
      state.budgeted = action.payload;
    },
    currencyUnitChanged: (state, action: PayloadAction<string>) => {
      state.currencyUnit = action.payload;
    },
  },
});

export const MoneyCalcReducer = MoneySlice.reducer;
export const { moneyCalc, budgetedChanged, currencyUnitChanged } =
  MoneySlice.actions;
