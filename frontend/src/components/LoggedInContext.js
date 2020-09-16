import React from 'react'
import {uriBase, apiVer} from '../Config'

const LoggedInContext = React.createContext()

function LoggedInProvider (props) {

    let [users, setUsers] = React.useState([])
    let [loggedIn, setLoggedIn] = React.useState(false)
    let [token, setToken] = React.useState('')

    //function to check user
    const checkUser = (username, password) => {

        let rtnVal = false
        //if user/pass match, return true
        fetch(`${uriBase}${apiVer}login`, {
            
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username.toLowerCase(), password})
        })
        .then(httpResponse => {
            
            if (!httpResponse.ok) {
                throw new Error('Login Error')
            }
            //convert JSON from endpoint into an object
            return httpResponse.json()
        })
        .then(response => {

            console.log(response)

            if (response.hasOwnProperty('authenticated')) {
                setLoggedIn(response.authenticated)
                
                if (response.authenticated === true) {
                    setToken(response.token)
                }
                
                rtnVal = response.authenticated
            }
        })
        .catch(err => {
            console.log('failed')
        })

        return rtnVal
    }

    return (
        <LoggedInContext.Provider value={{users, loggedIn, checkUser, setUsers, token}}>
            {props.children}
        </LoggedInContext.Provider>
    )
}

const LoggedInConsumer = LoggedInContext.Consumer
export {LoggedInContext, LoggedInProvider, LoggedInConsumer}