import { LabelInfos, LabelInfo, ACTION_LABEL, LABELACTIONSTATE, defaultLabelInfos} from './types';
import { LabelActionType } from './actions';


export function labelReducer(state:LabelInfos = defaultLabelInfos, action: LabelActionType): LabelInfos {
    switch (action.type) {
        case ACTION_LABEL.CHANGESTATELABEL:
            return {...action.data};
        case ACTION_LABEL.ADDLABEL:
            if(action.data.state === LABELACTIONSTATE.ADDFAIL) {
                return {state: LABELACTIONSTATE.ADDFAIL, labels: state.labels}
            } 
        case ACTION_LABEL.GETMINLABEL:
            if(action.data.labels) {
                return {state: action.data.state, labels: [...action.data.labels]};
            } else {
                return {state: action.data.state, labels: []};
            }
        default:
            return state;
    }
}
