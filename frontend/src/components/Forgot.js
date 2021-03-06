import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {LoggedInConsumer} from './LoggedInContext'
import {uriBase, apiVer} from '../Config'
import {patchOne} from '../crud'

export default function Forgot(props) {

    let [username,setUsername] = React.useState('')
    let [password,setPassword] = React.useState('')
    
    const usernameOnChangeHandler = (event) => {
        
        event.preventDefault()
        setUsername(event.target.value)
    }
    const passwordOnChangeHandler = (event) => {
        
        event.preventDefault()
        setPassword(event.target.value)
    }

    const submitOnClickHandler = (event) => {
        event.preventDefault()

        try {
            patchOne(`${uriBase}${apiVer}users/${username}`, {password})
            console.log('Patched')
        }
        catch (err) {
            console.log(err.message)
        }

    }

    return (
        <div>
            <LoggedInConsumer>
                {
                    value => (
                        value.loggedIn ?
                        (
                            <h3>Logged In</h3>
                        ) : (
                            <h3>Not Logged In</h3>
                        )
                    )

                }
            </LoggedInConsumer>
            <h1>Forgot Password?</h1>
            <Form>
                <Form.Group controlId="forgotUsername">
                    <Form.Control type="text" placeholder="Enter username" onChange={usernameOnChangeHandler} value={username}/>
                </Form.Group>

                <Form.Group controlId="forgotPassword">
                    <Form.Control type="password" placeholder="New Password" onChange={passwordOnChangeHandler} value={password}/>
                </Form.Group>
                
                <Button variant="outline-dark" type="submit" onClick={submitOnClickHandler}>
                    Submit
                </Button>
            </Form>
            <Link to="/"><Button variant='outline-secondary'>Home</Button></Link>
        </div>
    )
}