import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import EditUserModal from './EditUserModal'
import {deleteOne} from '../crud'
import {uriBase, apiVer} from '../Config'

export default function UserCard(props) {
    
    function deleteOnClickHandler() {

        deleteOne(`${uriBase}${apiVer}users/${props.user.username}`, props.user)
        .then(result => {
            props.refresh()
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.user.username}</Card.Title>
                    <Card.Text>
                        {`${props.user.fName} ${props.user.lName}`}
                    </Card.Text>
                    <EditUserModal user={props.user} refresh={props.refresh}></EditUserModal>
                    <Button variant="outline-danger" onClick={deleteOnClickHandler}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    )
}