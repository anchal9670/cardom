import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import stateSlice from "./stateSlice";
import brandSlice from "./cars/brandSlice";
import modelSlice from "./cars/modelSlice";
import loadingSlice from "./loadingSlice";
import variantSlice from "./cars/variantSlice";
import carSlice from "./cars/carSlice";
import colorModeReducer from "./colorModeSlice";
import testDriveSlice from "./testDriveSlice";

const carsReducer = combineReducers({
  brand: brandSlice,
  model: modelSlice,
  variant: variantSlice,
  cars: carSlice,
});

export const store = configureStore({
  reducer: {
    auth: authSlice,
    state: stateSlice,
    cars: carsReducer,
    loading: loadingSlice,
    colorMode: colorModeReducer,
    testDrive: testDriveSlice,
  },
});
