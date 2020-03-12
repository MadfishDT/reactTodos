export enum ACTION_LABEL {
    CHANGESTATELABEL = '$label:state',
    GETMINLABEL = '$label:minget',
    ADDLABEL = '$label:addlabel'
}

export enum LABELACTIONSTATE {
    NONE = 0,
    START,
    LOADING,
    COMPLETE,
    ERROR,
    ADDFAIL
}

export interface LabelInfo {
    title: string,
    color: string,
    updatedAt?: number,
    desc?: string
}

export interface LabelInfos {
    labels?: LabelInfo[],
    state: LABELACTIONSTATE
}

export const defaultLabelInfos = {
    labels: [],
    state: LABELACTIONSTATE.NONE,
}