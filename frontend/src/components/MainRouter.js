import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {LoggedInProvider} from './LoggedInContext'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import Forgot from './Forgot'
import ProtectedRoute from './ProtectedRoute'
import EditUsers from './EditUsers'

export default function MainRouter () {

    return (
    <LoggedInProvider>
        <Router>
            <Switch>
                <Route path='/signup' component={SignUp}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/forgot' component={Forgot}></Route>
                <ProtectedRoute path="/admin" component={EditUsers}></ProtectedRoute>
                <Route path='/' component={Home}></Route>
            </Switch>
        </Router>
    </LoggedInProvider>
)}