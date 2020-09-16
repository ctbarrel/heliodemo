import React from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {LoggedInConsumer, LoggedInContext} from './LoggedInContext'

export default function Home (props) {
    
    let {users} = React.useContext(LoggedInContext)
    
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
            <h1>Welcome to the Home Page</h1>
            <Link to="/login"><Button variant='outline-danger'>Login</Button></Link>
            <br></br>
            <Link to="/signup"><Button variant='outline-warning'>Sign Up</Button></Link>
            <br></br>
            <Link to="/forgot"><Button variant='outline-success'>Forgot Password?</Button></Link>
            <br></br>
            <Link to="/admin"><Button variant='outline-info'>Edit Users</Button></Link>            
            {
                users.map(user => {
                    return <Card body key={props.user._id}>{props.user.username}</Card>
                })
            }
        </div>
    )
}