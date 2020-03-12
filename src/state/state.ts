
import { labelReducer } from './reducer';
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    label: labelReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;