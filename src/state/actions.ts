import { QLLabelInfoService } from '../service/ql.label.info.service';
import { LabelInfos, LabelInfo, ACTION_LABEL, LABELACTIONSTATE} from './types';
import { Dispatch } from 'redux';

export interface LabelActionType {
    type: ACTION_LABEL,
    data: LabelInfos
}

export const requestAddLabel = (label: LabelInfo) => {
    const qlLabel = QLLabelInfoService.Instance;
    return async (dispatch: Dispatch<any>) => {
        dispatch( () => {
            return {type: ACTION_LABEL.CHANGESTATELABEL, data: {state: LABELACTIONSTATE.START}};
        });
        const result = await qlLabel.addLable(label.title, label.color, label.desc);
        if(result.data.createLabel) {
            dispatch(acAddLabel(label));
            dispatch(requestLabels("AAA"));
        } else {
            dispatch(acAddLabelFail());
        }
        dispatch( () => {
            return {type: ACTION_LABEL.CHANGESTATELABEL, data: {state: LABELACTIONSTATE.COMPLETE}};
        });

    }
}
export const requestLabels = (user: string) => {
    const qlLabel = QLLabelInfoService.Instance;

    return async (dispatch: Dispatch<any>) => {
        dispatch( () => {
            return {type: ACTION_LABEL.CHANGESTATELABEL, data: {state: LABELACTIONSTATE.START}};
        });

        const result = await qlLabel.getLabels(user);
        if(result.data.labels) {
            dispatch(acGetLabel(result.data.labels as LabelInfo[]));
        }

        dispatch( () => {
            return {type: ACTION_LABEL.CHANGESTATELABEL, data: {state: LABELACTIONSTATE.COMPLETE}};
        });
    }
}
export const acAddLabelFail = () => {
    return {type: ACTION_LABEL.ADDLABEL, data: {state: LABELACTIONSTATE.ADDFAIL}}
}

export const acAddLabel = (labelInfo: LabelInfo) => {
    return {type: ACTION_LABEL.ADDLABEL, data: {state: LABELACTIONSTATE.LOADING, label: labelInfo}}
}
export const acGetLabel = (labelInfos: LabelInfo[]) => {
    return { type: ACTION_LABEL.GETMINLABEL, data: {state: LABELACTIONSTATE.LOADING, labels:  labelInfos}}
};
