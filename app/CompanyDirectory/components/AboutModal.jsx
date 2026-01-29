import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function AboutModal(props) {


    return (

        <Modal isOpen={props.show} toggle={props.onClose}>
            <ModalHeader toggle={props.onClose}>Company Directory</ModalHeader>
            <ModalBody>
                <p>Company Directory is a full-stack personnel management dashboard that allows users to create, read, update, and delete employees, departments, and locations.</p>
                <p>The application features real-time search, multi-field filtering, sortable columns, and server-side pagination for efficient data handling.</p>
                <p>A responsive UI adapts between a desktop table layout and a mobile-friendly card view, with infinite scrolling on smaller devices for improved usability.</p>
                <p>Built with React, Next.js, Node.js, and PostgreSQL, this project demonstrates modern front-end architecture, API integration, and UX-driven design.</p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.onClose}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}
