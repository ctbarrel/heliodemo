import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {LoggedInConsumer} from './LoggedInContext'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default function ProtectedRoute ({component: Component, ...rest}) {

    return (
        <div>
        <LoggedInConsumer>
            {
                ({loggedIn}) => (
                    <Route
                        render={props =>
                            loggedIn ? <Component {...props} /> : <Redirect to='/' />
                        }
                        {...rest}
                    />
                )
            }
        </LoggedInConsumer>
        <Link to='/'><Button variant='outline-secondary'>Home</Button></Link>
        </div>
    )
}