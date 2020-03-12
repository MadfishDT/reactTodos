import React from 'react';
import { useState } from 'react';
import { Input, Button,
    Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface SimpleModalProps {
    show: boolean;
    title: string;
    contents?: string;
    onOk?: () => void;
    onClose?: () => void;
}
export const SimpleAlterModal: React.FC<SimpleModalProps> = (props: SimpleModalProps) => {

    const ok = () => {
        if (props.onOk) {
            props.onOk();
        }
    }

    const close = () => {
        if (props.onClose) {
            props.onClose();
        }
    }

    return (<Modal isOpen={props.show} >
        <ModalHeader>Add Label</ModalHeader>
        {props.contents ? (<ModalBody>{props.contents}</ModalBody>) : null}
        <ModalFooter>
            <Button color="primary" onClick={ok}>OK</Button>{' '}
            <Button color="secondary" onClick={close}>Close</Button>
        </ModalFooter>
    </Modal>)
}