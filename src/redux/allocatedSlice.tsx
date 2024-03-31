import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Allocated = {
  id: string;
  department: string;
  amountForDepartment: number;
};

export type AllocatedArrayType = Allocated[];

const initialState: AllocatedArrayType = [];

export const AllocatedSlice = createSlice({
  name: "allocatedBudget",
  initialState,
  reducers: {
    allocate: (state: AllocatedArrayType, action: PayloadAction<Allocated>) => {
      state.push(action.payload);
      console.log(state);

      // let array: number[] = [];
    },
    deleteItem: (state: AllocatedArrayType, action: PayloadAction<string>) => {
      // console.log("payload" + state[0]);
      let filtered = state.filter((element) => {
        return element.id !== action.payload;
      });
      return filtered;
    },
    increaseAmount: (
      state: AllocatedArrayType,
      action: PayloadAction<string>
    ) => {
      return state.map((element) => {
        if (element.id === action.payload) {
          return {
            ...element,
            amountForDepartment: element.amountForDepartment + 10,
          };
          //return element;
        } else {
          return element;
        }
      });

      // console.log(newAllocated);
    },
    decreaseAmount: (
      state: AllocatedArrayType,
      action: PayloadAction<string>
    ) => {
      return state.map((element) => {
        if (element.id === action.payload) {
          return {
            ...element,
            amountForDepartment: element.amountForDepartment - 10,
          };
          //return element;
        } else {
          return element;
        }
      });

      // console.log(newAllocated);
    },
  },
});

export default AllocatedSlice.reducer;
export const { allocate, deleteItem, increaseAmount, decreaseAmount } =
  AllocatedSlice.actions;
export type AllocatedSliceType = ReturnType<
  typeof AllocatedSlice.getInitialState
>;
