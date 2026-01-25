import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function CustomModal(props) {

    return (
        <div>
            <Modal isOpen={props.show} toggle={props.onClose} className={props.className} >
                <ModalHeader onClose={props.onClose}>{props.content.header}</ModalHeader>
                <ModalBody>
                    {props.content.body}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.onClose}>
                        {'Close'}
                    </Button>

                </ModalFooter>
            </Modal>
        </div>
    );
}
