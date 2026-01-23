import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback, Spinner  } from "reactstrap";

export default function CreateModal(props) {

  const loadingSippner = () =>  props.isLoading && <Spinner
  
  size="sm"
>
  Loading...
</Spinner>
    return (

        <Modal isOpen={props.show} toggle={props.onClose}>
        <ModalHeader toggle={props.onClose}>{props.content.header}</ModalHeader>
        <ModalBody>
          {props.error}
          {props.content.body}
        </ModalBody>
        <ModalFooter>
          {props.isDelete ? <Button color="danger" onClick={props.onSubmit}>
            {loadingSippner()}
            Delete
          </Button> : <Button color="primary" onClick={props.onSubmit} disabled={props.disableSubmit}>
            {loadingSippner()}
            Save
          </Button>}          
          {' '}
          <Button color="secondary" onClick={props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
}
