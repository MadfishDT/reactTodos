import React from 'react';
import { useState } from 'react';

import './Label.style.css';
import { connect, ConnectedProps } from 'react-redux';
import { LabelInfos, LabelInfo, LABELACTIONSTATE } from './state/types';
import { requestLabels, requestAddLabel } from './state/actions';
import { SimpleAlterModal } from './SimpleModal';

import { Card, CardBody, CardFooter, Input, Button, CardTitle, CardText, Row,
     Col, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';

import { faPlus, faMinus, faCheck, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { stat } from 'fs';

type PropsFromRedux = ConnectedProps<typeof connector>;



interface AddLabelInfo {
    title: string;
    color: string;
    textColor: string;
}

interface LabelHeaderProps {
    onAdd: () => void;
    onDel: () => void;
}

export const HeaderLabel: React.FC<LabelHeaderProps> = (props: LabelHeaderProps) => {

    return (
        <div className="p-2 d-flex label-header justify-content-end" >
            <ButtonGroup className="mb-1">
                <Button outline={false} color="primary" onClick={props.onAdd}><FontAwesomeIcon icon={faPlus} size="1x" /></Button>
                <Button outline={false} color="danger" onClick={props.onDel}><FontAwesomeIcon icon={faMinus} size="1x" /></Button>
            </ButtonGroup>
        </div>)
}

HeaderLabel.defaultProps = {
    onAdd: () => { },
    onDel: () => { }
}


interface AddLabelProps {
    show: boolean;
    onConfirm?: (info?: AddLabelInfo) => void;
    onCancel?: () => void;
}

export const ModalAddLabel: React.FC<AddLabelProps> = (props: AddLabelProps) => {

    const [labelTitle, setTitle] = useState('');
    const [labelColor, setColor] = useState('');
    const [labelTextColor, setTextColor] = useState('#000000');

    const comfirm = () => {
        if (props.onConfirm) {
            props.onConfirm({
                title: labelTitle,
                color: labelColor,
                textColor: labelTextColor
            });
        }
    }

    const cancel = () => {
        if (props.onCancel) {
            props.onCancel();
        }
    }

    return (<Modal isOpen={props.show} >
        <ModalHeader>Add Label</ModalHeader>
        <ModalBody>
            <Input placeholder="title" value={labelTitle} onChange={(e: any) => setTitle(e.currentTarget.value)}/>
            <div className="d-flex label-add-color-panel justify-content-end" >
            <ButtonGroup className="label-add-color-panel mb-1 mt-1">
                    <Button onClick={ () => setColor("#007BFF") } className="ml-1" outline={false} style={{ backgroundColor: "#007BFF"}}>
                        <FontAwesomeIcon color="white" icon={faCheck} size="1x"/>
                    </Button>
                    <Button onClick={ () => setColor("#28A745") } className="ml-1" outline={false} style={{ backgroundColor: "#28A745"}}>
                        <FontAwesomeIcon color="white" icon={faCheck} size="1x" />
                    </Button>
                    <Button onClick={ () => setColor("#17A2b8") }  className="ml-1" outline={false} style={{ backgroundColor: "#17A2b8"}}>
                        <FontAwesomeIcon color="white" icon={faCheck} size="1x" />
                    </Button>
                    <Button onClick={ () => setColor("#FFC107") } className="ml-1" outline={false} style={{ backgroundColor: "#FFC107"}}>
                        <FontAwesomeIcon color="white" icon={faCheck} size="1x" />
                    </Button>
                    <Button onClick={ () => setColor("#DC3545") } className="ml-1" outline={false} style={{ backgroundColor: "#DC3545"}}>
                        <FontAwesomeIcon color="white" icon={faCheck} size="1x" />
                    </Button>
            </ButtonGroup>
            </div>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={comfirm}>Confirm</Button>{' '}
            <Button color="secondary" onClick={cancel}>Cancel</Button>
        </ModalFooter>
    </Modal>)
}

ModalAddLabel.defaultProps = {
    show: false,
    onConfirm: () => { },
    onCancel: () => { }
}

const mapLabelState = (state: { labels: LabelInfos }, ownProps: any) => {
    console.log(state);
    return {
        labelInfos: state.labels
    };
};

const mapLabelDispatch = {
    GetLabel: (userID: string) => requestLabels(userID),
    AddLabel: (info: LabelInfo) => requestAddLabel(info)
}

const connector = connect(
    mapLabelState,
    mapLabelDispatch
)

interface LabelState {
    isShowAddModal: boolean;
    isShowAlertModal: boolean;
}

export class Label extends React.Component<PropsFromRedux, LabelState> {

    public alertTitle: string;
    public alertContents: string;

    constructor(props: PropsFromRedux) {
        super(props);
        this.state = {
            isShowAddModal: false,
            isShowAlertModal: false,
        };
        this.alertContents = '';
        this.alertTitle = '';
    }

    public componentDidMount() {
        this.props.GetLabel('user');
    }

    public addLabel = () => {
        this.setState({
            isShowAddModal: true
        })
    }

    public deleteLabel = () => {

    }
    public componentWillUpdate = (preProps: PropsFromRedux, preState: LabelState) => {
       
    }
    public componentWillReceiveProps = (nextProps: PropsFromRedux) => {
        if(nextProps.labelInfos.state == LABELACTIONSTATE.ADDFAIL) {
            this.alertContents = 'Fail to add Label';
            this.alertTitle = "Error";
            this.setState({isShowAddModal: false,  isShowAlertModal: true});
        }
    }
    public componentDidUpdate = (preProps: PropsFromRedux, preState: LabelState) => {
      
    }
    public confirmAddLabel = (info?: AddLabelInfo) => {
        if(info) {
            this.props.AddLabel({title: info.title, color: info.color});
        }
    }

    public okAlert = () => {
        this.setState({ isShowAlertModal: false })
    }
    public closeAlert = () => {
        this.setState({ isShowAlertModal: false })
    }
    public cancleAddLabel = () => {
        this.setState({isShowAddModal: false})
    }

    public render(): any {
        // this.props.brandsInfo
        const showModal = this.state.isShowAddModal;
        const showAlert = this.state.isShowAlertModal;
        const alertTitle = this.alertTitle;
        const alertContents = this.alertContents;
        let labelCards = null;
        if(this.props.labelInfos && this.props.labelInfos.labels) {
            labelCards = this.props.labelInfos.labels.map( (item, index) => {
                let lastUpdateTime = new Date();
                if(item.updatedAt) {
                    lastUpdateTime = new Date(item.updatedAt);
                }
                return (
                <Card className="mt-1" outline key={index} inverse style={{ backgroundColor: item.color, borderColor: item.color }}>
                    <CardBody className="lable-contents-card-body">
                    <CardTitle color="primary" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faDotCircle} size="1x" /> {item.title}</CardTitle>
                    <CardText >{item.color}: </CardText>
                    </CardBody>

                    <CardFooter className="lable-contents-card-footer text-right" style={{fontSize:"12px"}}>{`${lastUpdateTime.toLocaleDateString()} ${lastUpdateTime.toLocaleTimeString()}`}</CardFooter>
                </Card>)
            })
        }
        
        return (
            <main className="label-container">
                <HeaderLabel onAdd={this.addLabel} onDel={this.deleteLabel} />
                <SimpleAlterModal show={showAlert} 
                    title={alertTitle} contents={alertContents} 
                    onOk={this.okAlert} onClose={this.closeAlert} />
                <ModalAddLabel show={showModal} onConfirm={this.confirmAddLabel} onCancel={this.cancleAddLabel} />
                {labelCards}
            </main>
        );
    }
}
export const LabelConn = connector(Label);
//const connector = connect(mapState, mapDispatch);

//export const LabelConn = connector(Label);
