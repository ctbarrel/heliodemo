import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { updateOne } from '../crud'
import { uriBase, apiVer } from '../Config'

export default function EditUserModal(props) {

    const [show, setShow] = useState(false);
    const [username, setUsername] = useState(props.user.username)
    const [password, setPassword] = useState(props.user.password)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const usernameOnChangeHandler = (event) => {
        event.preventDefault()

        setUsername(event.target.value)
    }
    const passwordOnChangeHandler = (event) => {
        event.preventDefault()

        setPassword(event.target.value)
    }

    const saveOnClickHandler = (event) => {
        event.preventDefault()

        try {
            updateOne(`${uriBase}${apiVer}users/${props.user.username}`, { username, password })
            console.log('updated')
        }
        catch (err) {
            console.log(err.message)
        }
        
        setShow(false)
        props.refresh()
    }

    return (

        <React.Fragment>
            <Button variant="outline-secondary" onClick={handleShow}>Edit</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change info for {props.user.fName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group controlId="editUserModalUsername">
                            <Form.Control type="text" placeholder="Enter Username" value={username} onChange={usernameOnChangeHandler} readOnly />
                        </Form.Group>

                        <Form.Group controlId="editUserModalPassword">
                            <Form.Control type="password" placeholder="Enter Password" onChange={passwordOnChangeHandler} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                        </Button>

                    <Button variant="outline-secondary" onClick={saveOnClickHandler}>
                        Save Changes
                        </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}